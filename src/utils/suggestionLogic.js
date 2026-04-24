import { coreRoles, ranges, dndClasses } from '../data/dndClasses';

export function analyzeParty(partyMembers) {
  const stats = {
    roles: {
      [coreRoles.TANK]: 0,
      [coreRoles.SUPPORT]: 0,
      [coreRoles.UTILITY]: 0,
      [coreRoles.STRIKER]: 0,
    },
    ranges: {
      [ranges.MELEE]: 0,
      [ranges.RANGED]: 0,
    }
  };

  partyMembers.forEach(member => {
    const classData = dndClasses.find(c => c.id === member.classId);
    if (classData) {
      let role = classData.role;
      let range = classData.range;
      
      if (member.subclassId) {
        const sub = classData.subclasses?.find(s => s.id === member.subclassId);
        if (sub) {
          role = sub.role;
          range = sub.range;
        }
      }
      
      if (member.range) {
        range = member.range;
      }
      
      stats.roles[role]++;
      if (range === ranges.MELEE) stats.ranges[ranges.MELEE]++;
      else if (range === ranges.RANGED) stats.ranges[ranges.RANGED]++;
      else {
        // Flexible adds 0.5 to both logic-wise, but for simplicity let's just ignore flexible for harsh penalties
        stats.ranges[ranges.MELEE] += 0.5;
        stats.ranges[ranges.RANGED] += 0.5;
      }
    }
  });

  return stats;
}

export function getSuggestions(partyMembers) {
  if (partyMembers.length === 0) {
    const fighter = dndClasses.find(c => c.id === "fighter");
    const cleric = dndClasses.find(c => c.id === "cleric");
    const wizard = dndClasses.find(c => c.id === "wizard");
    
    return [
      { class: fighter, subclass: null, role: fighter.role, range: fighter.range, edgeMode: 'torn', reason: "A core frontliner. Every party needs a sturdy backbone to start with." },
      { class: cleric, subclass: null, role: cleric.role, range: cleric.range, edgeMode: 'burned', reason: "A core support. Starting with a support ensures survivability." },
      { class: wizard, subclass: null, role: wizard.role, range: wizard.range, edgeMode: 'chewed', reason: "A master of control. A strong utility caster sets the stage for a creative campaign." }
    ];
  }

  const { roles, ranges: partyRanges } = analyzeParty(partyMembers);
  const currentClassIds = new Set(partyMembers.map(m => m.classId));
  
  // Find the role(s) with the minimum count
  let minCount = Infinity;
  let missingRoles = [];
  
  Object.entries(roles).forEach(([role, count]) => {
    if (count < minCount) {
      minCount = count;
      missingRoles = [role];
    } else if (count === minCount) {
      missingRoles.push(role);
    }
  });

  // Prioritize TANK and SUPPORT if they are completely missing (count 0)
  if (roles[coreRoles.TANK] === 0) missingRoles = [coreRoles.TANK];
  else if (roles[coreRoles.SUPPORT] === 0) missingRoles = [coreRoles.SUPPORT];

  // Determine what range is missing
  let rangeNeed = null;
  if (partyRanges[ranges.MELEE] === 0) rangeNeed = ranges.MELEE;
  else if (partyRanges[ranges.RANGED] === 0) rangeNeed = ranges.RANGED;

  const suggestedOptions = dndClasses.flatMap(c => {
    // Avoid recommending classes already fully present
    if (currentClassIds.has(c.id)) return [];

    const matches = [];
    if (missingRoles.includes(c.role)) {
      matches.push({ class: c, subclass: null, role: c.role, range: c.range });
    }
    if (c.subclasses) {
      c.subclasses.forEach(sub => {
        if (missingRoles.includes(sub.role)) {
          matches.push({ class: c, subclass: sub, role: sub.role, range: sub.range });
        }
      });
    }
    return matches;
  });
  
  // Apply a bonus to the score for matching the missing range
  const scoredOptions = suggestedOptions.map(option => {
    let score = 10;
    if (rangeNeed && option.range === rangeNeed) score += 5; // boost for range synergy
    if (rangeNeed && option.range === ranges.FLEXIBLE) score += 2; 
    
    // Slight randomization tie-breaker
    score += Math.random();
    
    let reason = `Fills the needed ${option.role} role.`;
    if (option.role === coreRoles.TANK) reason = "Your party lacks a designated frontline to absorb damage.";
    else if (option.role === coreRoles.SUPPORT) reason = "Your party needs a reliable support to keep everyone alive and buffed.";
    else if (option.role === coreRoles.UTILITY) reason = "Your party could use more battlefield control and utility spells.";
    else if (option.role === coreRoles.STRIKER) reason = "Your party is missing dedicated damage dealers.";

    if (rangeNeed && option.range === rangeNeed) {
      reason += ` Also perfectly provides the ${rangeNeed} presence your team is lacking.`;
    }

    return {
      class: option.class,
      subclass: option.subclass,
      role: option.role,
      range: option.range,
      reason,
      score
    };
  });

  // Sort and deduplicate classes (e.g. if we suggested both Cleric (Base) and Cleric (Life), pick the top one)
  const sorted = scoredOptions.sort((a, b) => b.score - a.score);
  
  const uniqueClassSuggestions = [];
  const seenClasses = new Set();
  
  sorted.forEach(opt => {
    if (!seenClasses.has(opt.class.id)) {
      seenClasses.add(opt.class.id);
      uniqueClassSuggestions.push(opt);
    }
  });

  return uniqueClassSuggestions; // Usually returns 4-7 elements depending on roles needed
}
