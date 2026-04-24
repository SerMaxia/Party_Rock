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
      { id: "armorer", name: "Armorer", role: coreRoles.TANK, range: ranges.FLEXIBLE },
      { id: "artillerist", name: "Artillerist", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "battlesmith", name: "Battle Smith", role: coreRoles.TANK, range: ranges.MELEE }
    ]
  },
  { id: "barbarian", name: "Barbarian", role: coreRoles.TANK, range: ranges.MELEE, icon: "🪓",
    subclasses: [
      { id: "ancestral", name: "Path of the Ancestral Guardian", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "battlerager", name: "Path of the Battlerager", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "beast", name: "Path of the Beast", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "berserker", name: "Path of the Berserker", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "giant", name: "Path of the Giant", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "storm", name: "Path of the Storm Herald", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "totem", name: "Path of the Totem Warrior", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "wildmagic", name: "Path of Wild Magic", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "zealot", name: "Path of the Zealot", role: coreRoles.STRIKER, range: ranges.MELEE }
    ]
  },
  { id: "bard", name: "Bard", role: coreRoles.SUPPORT, range: ranges.RANGED, icon: "🎸",
    subclasses: [
      { id: "creation", name: "College of Creation", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "eloquence", name: "College of Eloquence", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "glamour", name: "College of Glamour", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "lore", name: "College of Lore", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "spirits", name: "College of Spirits", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "swords", name: "College of Swords", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "valor", name: "College of Valor", role: coreRoles.SUPPORT, range: ranges.FLEXIBLE },
      { id: "whispers", name: "College of Whispers", role: coreRoles.STRIKER, range: ranges.RANGED }
    ]
  },
  { id: "cleric", name: "Cleric", role: coreRoles.SUPPORT, range: ranges.FLEXIBLE, icon: "✨",
    subclasses: [
      { id: "arcana", name: "Arcana Domain", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "death", name: "Death Domain", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "forge", name: "Forge Domain", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "grave", name: "Grave Domain", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "knowledge", name: "Knowledge Domain", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "life", name: "Life Domain", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "light", name: "Light Domain", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "nature", name: "Nature Domain", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "order", name: "Order Domain", role: coreRoles.SUPPORT, range: ranges.FLEXIBLE },
      { id: "peace", name: "Peace Domain", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "tempest", name: "Tempest Domain", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "trickery", name: "Trickery Domain", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "twilight", name: "Twilight Domain", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "war", name: "War Domain", role: coreRoles.TANK, range: ranges.MELEE }
    ]
  },
  { id: "druid", name: "Druid", role: coreRoles.SUPPORT, range: ranges.RANGED, icon: "🌿",
    subclasses: [
      { id: "dreams", name: "Circle of Dreams", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "land", name: "Circle of the Land", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "moon", name: "Circle of the Moon", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "shepherd", name: "Circle of the Shepherd", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "spores", name: "Circle of Spores", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "stars", name: "Circle of Stars", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "wildfire", name: "Circle of Wildfire", role: coreRoles.STRIKER, range: ranges.RANGED }
    ]
  },
  { id: "fighter", name: "Fighter", role: coreRoles.TANK, range: ranges.FLEXIBLE, icon: "⚔️",
    subclasses: [
      { id: "arcanearcher", name: "Arcane Archer", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "battlemaster", name: "Battle Master", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "cavalier", name: "Cavalier", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "champion", name: "Champion", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "echo", name: "Echo Knight", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "eldritch", name: "Eldritch Knight", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "psiwarrior", name: "Psi Warrior", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "purpledragon", name: "Purple Dragon Knight", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "runeknight", name: "Rune Knight", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "samurai", name: "Samurai", role: coreRoles.STRIKER, range: ranges.MELEE }
    ]
  },
  { id: "monk", name: "Monk", role: coreRoles.STRIKER, range: ranges.MELEE, icon: "🥋",
    subclasses: [
      { id: "ascendantdragon", name: "Way of the Ascendant Dragon", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "astralself", name: "Way of the Astral Self", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "drunkenmaster", name: "Way of the Drunken Master", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "fourelements", name: "Way of the Four Elements", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "kensei", name: "Way of the Kensei", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "longdeath", name: "Way of the Long Death", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "mercy", name: "Way of Mercy", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "openhand", name: "Way of the Open Hand", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "shadow", name: "Way of Shadow", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "sunsoul", name: "Way of the Sun Soul", role: coreRoles.STRIKER, range: ranges.RANGED }
    ]
  },
  { id: "paladin", name: "Paladin", role: coreRoles.TANK, range: ranges.MELEE, icon: "🛡️",
    subclasses: [
      { id: "ancients", name: "Oath of the Ancients", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "conquest", name: "Oath of Conquest", role: coreRoles.UTILITY, range: ranges.MELEE },
      { id: "crown", name: "Oath of the Crown", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "devotion", name: "Oath of Devotion", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "glory", name: "Oath of Glory", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "oathbreaker", name: "Oathbreaker", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "redemption", name: "Oath of Redemption", role: coreRoles.SUPPORT, range: ranges.MELEE },
      { id: "vengeance", name: "Oath of Vengeance", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "watchers", name: "Oath of the Watchers", role: coreRoles.UTILITY, range: ranges.MELEE }
    ]
  },
  { id: "ranger", name: "Ranger", role: coreRoles.STRIKER, range: ranges.RANGED, icon: "🏹",
    subclasses: [
      { id: "beastmaster", name: "Beast Master", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "drakewarden", name: "Drakewarden", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "feywanderer", name: "Fey Wanderer", role: coreRoles.UTILITY, range: ranges.FLEXIBLE },
      { id: "gloom", name: "Gloom Stalker", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "horizonwalker", name: "Horizon Walker", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "hunter", name: "Hunter", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "monsterslayer", name: "Monster Slayer", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "swarmkeeper", name: "Swarmkeeper", role: coreRoles.UTILITY, range: ranges.RANGED }
    ]
  },
  { id: "rogue", name: "Rogue", role: coreRoles.STRIKER, range: ranges.FLEXIBLE, icon: "🗡️",
    subclasses: [
      { id: "arcanetrickster", name: "Arcane Trickster", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "assassin", name: "Assassin", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "inquisitive", name: "Inquisitive", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "mastermind", name: "Mastermind", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "phantom", name: "Phantom", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "scout", name: "Scout", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "soulknife", name: "Soulknife", role: coreRoles.STRIKER, range: ranges.FLEXIBLE },
      { id: "swashbuckler", name: "Swashbuckler", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "thief", name: "Thief", role: coreRoles.UTILITY, range: ranges.FLEXIBLE }
    ]
  },
  { id: "sorcerer", name: "Sorcerer", role: coreRoles.UTILITY, range: ranges.RANGED, icon: "🔥",
    subclasses: [
      { id: "aberrantmind", name: "Aberrant Mind", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "clockwork", name: "Clockwork Soul", role: coreRoles.TANK, range: ranges.RANGED },
      { id: "divinesoul", name: "Divine Soul", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "draconic", name: "Draconic Bloodline", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "lunar", name: "Lunar Sorcery", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "shadowmagic", name: "Shadow Magic", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "storm", name: "Storm Sorcery", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "wild", name: "Wild Magic", role: coreRoles.UTILITY, range: ranges.RANGED }
    ]
  },
  { id: "warlock", name: "Warlock", role: coreRoles.STRIKER, range: ranges.RANGED, icon: "👁️",
    subclasses: [
      { id: "archfey", name: "The Archfey", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "celestial", name: "The Celestial", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "fathomless", name: "The Fathomless", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "fiend", name: "The Fiend", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "genie", name: "The Genie", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "greatoldone", name: "The Great Old One", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "hexblade", name: "The Hexblade", role: coreRoles.TANK, range: ranges.MELEE },
      { id: "undead", name: "The Undead", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "undying", name: "The Undying", role: coreRoles.SUPPORT, range: ranges.RANGED }
    ]
  },
  { id: "wizard", name: "Wizard", role: coreRoles.UTILITY, range: ranges.RANGED, icon: "📖",
    subclasses: [
      { id: "abjuration", name: "School of Abjuration", role: coreRoles.TANK, range: ranges.RANGED },
      { id: "bladesinging", name: "Bladesinging", role: coreRoles.STRIKER, range: ranges.MELEE },
      { id: "chronurgy", name: "Chronurgy Magic", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "conjuration", name: "School of Conjuration", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "divination", name: "School of Divination", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "enchantment", name: "School of Enchantment", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "evocation", name: "School of Evocation", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "graviturgy", name: "Graviturgy Magic", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "illusion", name: "School of Illusion", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "necromancy", name: "School of Necromancy", role: coreRoles.STRIKER, range: ranges.RANGED },
      { id: "scribes", name: "Order of Scribes", role: coreRoles.UTILITY, range: ranges.RANGED },
      { id: "transmutation", name: "School of Transmutation", role: coreRoles.SUPPORT, range: ranges.RANGED },
      { id: "warmagic", name: "War Magic", role: coreRoles.TANK, range: ranges.RANGED }
    ]
  }
];
