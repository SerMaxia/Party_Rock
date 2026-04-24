export const coreRoles = {
  TANK: "Frontline / Tank",
  SUPPORT: "Support",
  UTILITY: "Control / Utility",
  STRIKER: "Damage / Striker"
};

export const ranges = {
  MELEE: "Melee",
  RANGED: "Ranged",
  FLEXIBLE: "Flexible"
};

export const dndClasses = [
  { id: "artificer", name: "Artificer", role: coreRoles.SUPPORT, range: ranges.FLEXIBLE, icon: "🛠️",
    subclasses: [
      { id: "alchemist", name: "Alchemist", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "artillerist", name: "Artillerist", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "battlesmith", name: "Battle Smith", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "armorer", name: "Armorer", role: coreRoles.TANK, range: ranges.FLEXIBLE }
    ]
  },
  { id: "barbarian", name: "Barbarian", role: coreRoles.TANK, range: ranges.MELEE, icon: "🪓",
    subclasses: [
      { id: "berserker", name: "Path of the Berserker", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "totem", name: "Path of the Totem Warrior", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "ancestral", name: "Path of the Ancestral Guardian", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "samurai", name: "Samurai", role: coreRoles.STRIKER, range: ranges.MELEE }
    ]
  },
  { id: "bard", name: "Bard", role: coreRoles.SUPPORT, range: ranges.RANGED, icon: "🎸",
    subclasses: [
      { id: "lore", name: "College of Lore", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "valor", name: "College of Valor", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "swords", name: "College of Swords", role: coreRoles.STRIKER, range: ranges.MELEE }
    ]
  },
  { id: "cleric", name: "Cleric", role: coreRoles.SUPPORT, range: ranges.FLEXIBLE, icon: "✨",
    subclasses: [
      { id: "life", name: "Life Domain", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "light", name: "Light Domain", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "forge", name: "Forge Domain", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "trickery", name: "Trickery Domain", role: coreRoles.UTILITY, range: ranges.FLEXIBLE }
    ]
  },
  { id: "druid", name: "Druid", role: coreRoles.SUPPORT, range: ranges.RANGED, icon: "🌿",
    subclasses: [
      { id: "moon", name: "Circle of the Moon", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "land", name: "Circle of the Land", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "stars", name: "Circle of Stars", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "dreams", name: "Circle of Dreams", role: coreRoles.SUPPORT, range: ranges.RANGED }
    ]
  },
  { id: "fighter", name: "Fighter", role: coreRoles.TANK, range: ranges.FLEXIBLE, icon: "⚔️",
    subclasses: [
      { id: "champion", name: "Champion", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "battlemaster", name: "Battle Master", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "eldritch", name: "Eldritch Knight", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "echo", name: "Echo Knight", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "arcanearcher", name: "Arcane Archer", role: coreRoles.STRIKER, range: ranges.RANGED }
    ]
  },
  { id: "monk", name: "Monk", role: coreRoles.STRIKER, range: ranges.MELEE, icon: "🥋",
    subclasses: [
      { id: "openhand", name: "Way of the Open Hand", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "shadow", name: "Way of Shadow", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "mercy", name: "Way of Mercy", role: coreRoles.SUPPORT, range: ranges.MELEE }
    ]
  },
  { id: "paladin", name: "Paladin", role: coreRoles.TANK, range: ranges.MELEE, icon: "🛡️",
    subclasses: [
      { id: "devotion", name: "Oath of Devotion", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "vengeance", name: "Oath of Vengeance", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "ancients", name: "Oath of the Ancients", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "conquest", name: "Oath of Conquest", role: coreRoles.UTILITY, range: ranges.MELEE }
    ]
  },
  { id: "ranger", name: "Ranger", role: coreRoles.STRIKER, range: ranges.RANGED, icon: "🏹",
    subclasses: [
      { id: "hunter", name: "Hunter", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "beastmaster", name: "Beast Master", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "gloom", name: "Gloom Stalker", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "swarmkeeper", name: "Swarmkeeper", role: coreRoles.UTILITY, range: ranges.RANGED }
    ]
  },
  { id: "rogue", name: "Rogue", role: coreRoles.STRIKER, range: ranges.FLEXIBLE, icon: "🗡️",
    subclasses: [
      { id: "thief", name: "Thief", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "assassin", name: "Assassin", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "arcanetrickster", name: "Arcane Trickster", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "swashbuckler", name: "Swashbuckler", role: coreRoles.STRIKER, range: ranges.MELEE }
    ]
  },
  { id: "sorcerer", name: "Sorcerer", role: coreRoles.UTILITY, range: ranges.RANGED, icon: "🔥",
    subclasses: [
      { id: "draconic", name: "Draconic Bloodline", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "wild", name: "Wild Magic", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "divinesoul", name: "Divine Soul", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "clockwork", name: "Clockwork Soul", role: coreRoles.TANK, range: ranges.RANGED }
    ]
  },
  { id: "warlock", name: "Warlock", role: coreRoles.STRIKER, range: ranges.RANGED, icon: "👁️",
    subclasses: [
      { id: "fiend", name: "The Fiend", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "hexblade", name: "Hexblade / Pact of the Blade", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "celestial", name: "The Celestial", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "tome", name: "Pact of the Tome", role: coreRoles.UTILITY, range: ranges.RANGED }
    ]
  },
  { id: "wizard", name: "Wizard", role: coreRoles.UTILITY, range: ranges.RANGED, icon: "📖",
    subclasses: [
      { id: "evocation", name: "School of Evocation", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "abjuration", name: "School of Abjuration", role: coreRoles.TANK, range: ranges.RANGED },
      { id: "divination", name: "School of Divination", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "necromancy", name: "School of Necromancy", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "conjuration", name: "School of Conjuration", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "enchantment", name: "School of Enchantment", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "illusion", name: "School of Illusion", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "transmutation", name: "School of Transmutation", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "bladesinging", name: "Bladesinging", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "warmagic", name: "War Magic", role: coreRoles.TANK, range: ranges.RANGED },
      { id: "scribes", name: "Order of Scribes", role: coreRoles.UTILITY, range: ranges.RANGED }
    ]
  }
];
