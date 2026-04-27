import { useState, useMemo } from 'react';
import { dndClasses } from '../data/dndClasses';

export default function PartyList({ party, setParty }) {
  const [selectedClass, setSelectedClass] = useState(dndClasses[0].id);
  const [selectedSubclass, setSelectedSubclass] = useState("");
  const [expandedSliderId, setExpandedSliderId] = useState(null);
  const [dragState, setDragState] = useState(null);
  const [burningIds, setBurningIds] = useState(new Set());
  const [burningTransforms, setBurningTransforms] = useState({});

  const currentClassData = useMemo(() => dndClasses.find(c => c.id === selectedClass), [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSubclass(""); 
  };

  const handleAdd = () => {
    let initialRange = currentClassData.range;
    if (selectedSubclass) {
      const sub = currentClassData.subclasses?.find(s => s.id === selectedSubclass);
      if (sub) initialRange = sub.range;
    }

    setParty([...party, { 
      id: Date.now(), 
      classId: selectedClass,
      subclassId: selectedSubclass || null,
      range: initialRange
    }]);
  };

  const handleRemove = (id) => {
    setParty(party.filter(member => member.id !== id));
  };

  const handleEditMember = (id, field, value) => {
    setParty(party.map(member => {
      if (member.id === id) {
        if (field === 'subclassId') {
           return { ...member, subclassId: value || null, range: undefined }; 
        }
        return { ...member, [field]: value };
      }
      return member;
    }));
  };

  const handlePointerDown = (id, e) => {
    // Only capture if clicking the card generally, but avoid blocking inputs
    if (e.target.tagName.toLowerCase() === 'select' || e.target.tagName.toLowerCase() === 'button') {
      return;
    }
    e.target.setPointerCapture(e.pointerId);
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  const handlePointerMove = (id, e) => {
    if (dragState && dragState.id === id) {
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

  const handlePointerUp = (id, e) => {
    if (!dragState || dragState.id !== id) return;
    try { e.target.releasePointerCapture(e.pointerId); } catch(err){}
    
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
    
    const dx = dragState.currentX - dragState.startX;
    const dy = dragState.currentY - dragState.startY;
    setDragState(null);

    // If dragged to candle, visually burn and remove
    if (isBurned) {
      handleBurn(id, dx, dy);
    }
  };

  const handleBurn = (id, dx, dy) => {
    setBurningTransforms(prev => ({
      ...prev,
      [id]: { dx, dy, rot: dx * 0.05 }
    }));
    
    setBurningIds(prev => new Set([...prev, id]));
    
    setTimeout(() => {
      handleRemove(id);
      setBurningIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 600); // Wait for the burn sequence
  };

  return (
    <div id="party-ledger" className="party-container ledger-book" title="Your trusted Adventure Log">
      <h2>Adventure Log</h2>
      <div className="party-members">
        {party.length === 0 && <p className="empty-state">The ledger is empty. Drag a bounty poster here to log party members!</p>}
        {party.map(member => {
          const cls = dndClasses.find(c => c.id === member.classId);
          const sub = cls.subclasses?.find(s => s.id === member.subclassId);
          const activeRole = sub ? sub.role : cls.role;
          const activeRange = member.range || (sub ? sub.range : cls.range);
          
          const isBurning = burningIds.has(member.id);
          const isDragging = dragState && dragState.id === member.id;
          
          const dx = isDragging ? dragState.currentX - dragState.startX : 0;
          const dy = isDragging ? dragState.currentY - dragState.startY : 0;
          
          let inlineStyle = {};
          if (isDragging && !isBurning) {
            inlineStyle = {
              transform: `perspective(800px) translate(${dx}px, ${dy}px) rotate(${dx * 0.05}deg)`,
              transition: 'none',
              animation: 'none',
              zIndex: 100,
              boxShadow: '10px 15px 25px rgba(0,0,0,0.8)'
            };
          } else if (isBurning) {
            const t = burningTransforms[member.id];
            inlineStyle = {
              '--dx': `${t.dx}px`,
              '--dy': `${t.dy}px`,
              '--rot': `${t.rot}deg`,
              zIndex: 100
            };
          }

          return (
            <div key={member.id} className={`paper-wrapper ${isDragging || isBurning ? 'is-dragging' : ''}`}>
              <div 
                className={`party-member-card ${isBurning ? 'burning-anim' : ''} ${isDragging ? 'dragging' : ''}`}
                style={inlineStyle}
                onPointerDown={(e) => handlePointerDown(member.id, e)}
                onPointerMove={(e) => handlePointerMove(member.id, e)}
                onPointerUp={(e) => handlePointerUp(member.id, e)}
                onPointerCancel={(e) => handlePointerUp(member.id, e)}
                title="Drag paper to candle to delete!"
              >
                <span className="member-icon">{cls.icon}</span>
                <div className="member-details" style={{ width: '100%', paddingRight: '0.5rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', gap: '0.5rem' }}>
                    <span>
                      <span className="member-class">{cls.name}</span>
                      <span className="member-role" style={{ display: 'block', marginTop: '2px' }}>
                        {activeRole}
                        <span 
                          className="range-edit-toggle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedSliderId(expandedSliderId === member.id ? null : member.id);
                          }}
                          title="Click to edit range"
                        >
                          • {activeRange === 'Melee' ? '⚔️ Melee' : activeRange === 'Flexible' ? '🎯 Flexible' : '🏹 Ranged'}
                          <span className="edit-icon">✏️</span>
                        </span>
                      </span>
                    </span>
                    
                    {cls.subclasses && (
                      <select 
                        value={member.subclassId || ""} 
                        onChange={(e) => handleEditMember(member.id, 'subclassId', e.target.value)}
                        className="inline-subclass-select"
                        title="Change the subclass for this party member"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="">-- Base Class --</option>
                        {cls.subclasses.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  
                  {expandedSliderId === member.id && (
                    <div className="segmented-control-container">
                      <div className="segmented-control">
                        <div className="segmented-track">
                          <div 
                            className="segmented-thumb" 
                            style={{ left: activeRange === 'Melee' ? '0%' : activeRange === 'Flexible' ? '33.333%' : '66.666%' }} 
                          />
                          <button 
                            className={`segment-btn ${activeRange === 'Melee' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleEditMember(member.id, 'range', 'Melee'); }}
                          >
                            ⚔️ Melee
                          </button>
                          <button 
                            className={`segment-btn ${activeRange === 'Flexible' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleEditMember(member.id, 'range', 'Flexible'); }}
                          >
                            🎯 Flex
                          </button>
                          <button 
                            className={`segment-btn ${activeRange === 'Ranged' ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleEditMember(member.id, 'range', 'Ranged'); }}
                          >
                            🏹 Ranged
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemove(member.id); }} title="Remove member" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>✕</button>
              </div>
              <div className="board-pin" />
            </div>
          );
        })}
      </div>
      <div className="add-controls" style={{ flexWrap: 'wrap' }}>
        <select value={selectedClass} onChange={handleClassChange}>
          {dndClasses.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        {currentClassData?.subclasses && (
          <select value={selectedSubclass} onChange={(e) => setSelectedSubclass(e.target.value)}>
            <option value="">-- Base Role [{currentClassData.role}] --</option>
            {currentClassData.subclasses.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name} [{sub.role}]</option>
            ))}
          </select>
        )}
        <button onClick={handleAdd} className="add-btn">+ Add Member</button>
      </div>
    </div>
  );
}
