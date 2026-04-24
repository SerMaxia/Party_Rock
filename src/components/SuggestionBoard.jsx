import { useMemo, useState } from 'react';
import { getSuggestions } from '../utils/suggestionLogic';

export default function SuggestionBoard({ party, setParty }) {
  const suggestions = useMemo(() => getSuggestions(party), [party]);
  const [showAll, setShowAll] = useState(false);
  const [rippingIds, setRippingIds] = useState(new Set());
  const [burningIds, setBurningIds] = useState(new Set());
  const [rejectedIds, setRejectedIds] = useState(new Set());
  const [nailingIds, setNailingIds] = useState(new Set());
  const [dragState, setDragState] = useState(null);
  const [burningTransforms, setBurningTransforms] = useState({});
  const [nailingTransforms, setNailingTransforms] = useState({});

  const filteredSuggestions = suggestions.filter(sug => !rejectedIds.has(sug.class.id));
  const displayedSuggestions = showAll ? filteredSuggestions : filteredSuggestions.slice(0, 3);

  const handleRipAndAdd = (sug, e) => {
    if (e) e.stopPropagation();
    
    setRippingIds(prev => new Set([...prev, sug.class.id]));
    
    setTimeout(() => {
      setParty(prevParty => [...prevParty, { 
        id: Date.now(), 
        classId: sug.class.id,
        subclassId: sug.subclass ? sug.subclass.id : null,
        range: sug.range
      }]);
      setRippingIds(prev => {
        const next = new Set(prev);
        next.delete(sug.class.id);
        return next;
      });
    }, 450); 
  };

  const handleBurn = (sug, dx, dy) => {
    setBurningTransforms(prev => ({
      ...prev,
      [sug.class.id]: { dx, dy, rot: dx * 0.05 }
    }));
    
    setBurningIds(prev => new Set([...prev, sug.class.id]));
    
    setTimeout(() => {
      setRejectedIds(prev => new Set([...prev, sug.class.id]));
      setBurningIds(prev => {
        const next = new Set(prev);
        next.delete(sug.class.id);
        return next;
      });
    }, 600); // 0.6s burn animation
  };

  const handleNail = (sug, dx, dy) => {
    setNailingTransforms(prev => ({
      ...prev,
      [sug.class.id]: { dx, dy, rot: dx * 0.05 }
    }));
    
    setNailingIds(prev => new Set([...prev, sug.class.id]));
    
    setTimeout(() => {
      setParty(prevParty => [...prevParty, { 
        id: Date.now(), 
        classId: sug.class.id,
        subclassId: sug.subclass ? sug.subclass.id : null,
        range: sug.range
      }]);
      setNailingIds(prev => {
        const next = new Set(prev);
        next.delete(sug.class.id);
        return next;
      });
    }, 450); // 0.45s nail slam animation
  };

  const handlePointerDown = (sug, e) => {
    e.target.setPointerCapture(e.pointerId);
    setDragState({
      id: sug.class.id,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  const handlePointerMove = (sug, e) => {
    if (dragState && dragState.id === sug.class.id) {
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

  const handlePointerUp = (sug, e) => {
    if (!dragState || dragState.id !== sug.class.id) return;
    try { e.target.releasePointerCapture(e.pointerId); } catch(err){}
    
    const dx = dragState.currentX - dragState.startX;
    const dy = dragState.currentY - dragState.startY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
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

    const ledger = document.getElementById('party-ledger');
    let isNailed = false;
    if (ledger) {
      const rect = ledger.getBoundingClientRect();
      if (
        dragState.currentX > rect.left - 50 && dragState.currentX < rect.right + 50 &&
        dragState.currentY > rect.top - 50 && dragState.currentY < rect.bottom + 50
      ) {
        isNailed = true;
      }
    }
    
    setDragState(null);

    // Prioritize drag drops, fallback to click, otherwise snap back
    if (isBurned) {
      handleBurn(sug, dx, dy);
    } else if (isNailed) {
      handleNail(sug, dx, dy);
    } else if (distance < 5) {
      handleRipAndAdd(sug, null);
    }
  };

  return (
    <div className="suggestion-container">
      <h2>Suggested Next Characters</h2>

      <div className="suggestions-list">
        {displayedSuggestions.length === 0 && <p className="empty-state">No more bounties fit this profile.</p>}
        {displayedSuggestions.map((sug, idx) => {
          const isRipping = rippingIds.has(sug.class.id);
          const isBurning = burningIds.has(sug.class.id);
          const isNailing = nailingIds.has(sug.class.id);
          const isDragging = dragState && dragState.id === sug.class.id;
          
          const dx = isDragging ? dragState.currentX - dragState.startX : 0;
          const dy = isDragging ? dragState.currentY - dragState.startY : 0;
          
          let inlineStyle = {};
          if (isDragging && !isRipping && !isBurning && !isNailing) {
            inlineStyle = {
              transform: `perspective(800px) translate(${dx}px, ${dy}px) rotate(${dx * 0.05}deg)`,
              transition: 'none',
              animation: 'none',
              zIndex: 100,
              boxShadow: '10px 15px 25px rgba(0,0,0,0.8)'
            };
          } else if (isBurning) {
            const t = burningTransforms[sug.class.id];
            inlineStyle = { '--dx': `${t.dx}px`, '--dy': `${t.dy}px`, '--rot': `${t.rot}deg`, zIndex: 100 };
          } else if (isNailing) {
            const t = nailingTransforms[sug.class.id];
            inlineStyle = { '--dx': `${t.dx}px`, '--dy': `${t.dy}px`, '--rot': `${t.rot}deg`, zIndex: 100 };
          }

          let animClass = '';
          if (isRipping) animClass = 'violent-ripping-anim';
          else if (isBurning) animClass = 'burning-anim';
          else if (isNailing) animClass = 'nailing-anim';
          else if (isDragging) animClass = 'dragging';

          // Assign is-dragging to the wrapper so the pin pops out while dragging. 
          // Keep it out while ripping or burning. For nailing, assign is-nailing to trigger the nail slam.
          let wrapperClass = 'paper-wrapper';
          if (isDragging || isRipping || isBurning) wrapperClass += ' is-dragging';
          if (isNailing) wrapperClass += ' is-nailing';

          return (
            <div key={`${sug.class.id}-${idx}`} className={wrapperClass}>
              <div 
                className={`suggestion-card edge-${sug.edgeMode || 'torn'} ${animClass}`} 
                style={inlineStyle}
                onPointerDown={(e) => handlePointerDown(sug, e)}
                onPointerMove={(e) => handlePointerMove(sug, e)}
                onPointerUp={(e) => handlePointerUp(sug, e)}
                onPointerCancel={(e) => handlePointerUp(sug, e)}
                title="Drag to candle to burn, drag/click to add to party!"
              >
                <div className="suggestion-header">
                  <span className="suggestion-icon">{sug.class.icon}</span>
                  <h3>{sug.class.name} {sug.subclass && <span style={{fontWeight: 'normal', fontSize: '0.85em', color: 'var(--text-secondary)'}}>({sug.subclass.name})</span>}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <p className="suggestion-role" style={{ marginBottom: 0 }}>{sug.role}</p>
                  <p className="suggestion-role" style={{ color: 'var(--accent-color)', marginBottom: 0, fontWeight: 'normal' }}>
                    {sug.range === 'Flexible' ? '🎯 Flexible Range' : sug.range === 'Melee' ? '⚔️ Melee' : '🏹 Ranged'}
                  </p>
                </div>
                <p className="suggestion-reason">{sug.reason}</p>
              </div>
              <div 
                className="board-pin" 
                style={isNailing && nailingTransforms[sug.class.id] ? { '--dx': `${nailingTransforms[sug.class.id].dx}px`, '--dy': `${nailingTransforms[sug.class.id].dy}px` } : {}} 
              />
            </div>
          );
        })}
      </div>
      
      {suggestions.length > 3 && (
        <button 
          onClick={() => setShowAll(!showAll)} 
          className="toggle-more-btn"
        >
          {showAll ? 'Hide Extras' : `View ${suggestions.length - 3} More Bounties`}
        </button>
      )}
    </div>
  );
}
