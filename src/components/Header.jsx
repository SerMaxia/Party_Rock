import { useState } from 'react';

export default function Header() {
  const [dragState, setDragState] = useState(null);
  const [isBurning, setIsBurning] = useState(false);
  const [isBurnedOut, setIsBurnedOut] = useState(false);
  const [burningTransforms, setBurningTransforms] = useState({});

  if (isBurnedOut) return null;

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setDragState({
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  const handlePointerMove = (e) => {
    if (dragState) {
      setDragState(prev => ({
        ...prev,
        currentX: e.clientX,
        currentY: e.clientY
      }));
      
      const candle = document.getElementById('candle-zone');
      if (candle) {
        const rect = candle.getBoundingClientRect();
        if (
          e.clientX > rect.left - 60 && e.clientX < rect.right + 60 &&
          e.clientY > rect.top - 60 && e.clientY < rect.bottom + 60
        ) {
          candle.classList.add('glow');
        } else {
          candle.classList.remove('glow');
        }
      }
    }
  };

  const handlePointerUp = (e) => {
    if (!dragState) return;
    try { e.target.releasePointerCapture(e.pointerId); } catch(err){}
    
    const dx = dragState.currentX - dragState.startX;
    const dy = dragState.currentY - dragState.startY;
    
    const candle = document.getElementById('candle-zone');
    let isBurned = false;
    if (candle) {
      const rect = candle.getBoundingClientRect();
      if (
        dragState.currentX > rect.left - 60 && dragState.currentX < rect.right + 60 &&
        dragState.currentY > rect.top - 60 && dragState.currentY < rect.bottom + 60
      ) {
        isBurned = true;
      }
      candle.classList.remove('glow');
    }
    
    setDragState(null);

    if (isBurned) {
      setBurningTransforms({ dx, dy, rot: dx * 0.05 });
      setIsBurning(true);
      setTimeout(() => {
        setIsBurnedOut(true);
      }, 600); // 0.6s burn animation
    }
  };

  const dx = dragState ? dragState.currentX - dragState.startX : 0;
  const dy = dragState ? dragState.currentY - dragState.startY : 0;

  let inlineStyle = {};
  if (dragState && !isBurning) {
    inlineStyle = {
      transform: `perspective(800px) translate(${dx}px, ${dy}px) rotate(${dx * 0.02}deg)`,
      transition: 'none',
      animation: 'none',
      zIndex: 100,
      boxShadow: '10px 15px 25px rgba(0,0,0,0.8)',
      cursor: 'grabbing'
    };
  } else if (isBurning) {
    inlineStyle = { 
      '--dx': `${burningTransforms.dx}px`, 
      '--dy': `${burningTransforms.dy}px`, 
      '--rot': `${burningTransforms.rot}deg`, 
      zIndex: 100 
    };
  } else {
    inlineStyle = { cursor: 'grab' };
  }

  const animClass = isBurning ? 'burning-anim' : dragState ? 'dragging' : '';

  return (
    <header 
      className={`app-header ${animClass}`}
      style={inlineStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="You can even burn the title!"
    >
      <div className="logo-container" style={{ pointerEvents: 'none' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Logan_Rock_Treen_crop.jpg" alt="A literal rock placeholder" className="rock-logo" />
      </div>
      <div className="title-container" style={{ pointerEvents: 'none' }}>
        <h1>Party Rock</h1>
        <p>Your adaptive D&D character suggester</p>
      </div>
    </header>
  );
}
