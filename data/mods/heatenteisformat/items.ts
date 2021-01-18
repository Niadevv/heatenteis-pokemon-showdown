/* -100 to -349 - Mega Stones
-350 onwards - custom items
Numbers are negative 100 and below as CAP items appear to take -1 to -99
*/
export const Items: {[k: string]: ModdedItemData} = {
	galestone: {
		name: "Gale Stone",
		spritenum: 88,
		fling: {
			basePower: 60,
		},
		num: -350,
		gen: 8,
	},
	simisagiumz: {
		name: "Simisagium Z",
		spritenum: 635,
		onTakeItem: false,
		zMove: "Endless Silent Forest",
		zMoveFrom: "Power Whip",
		itemUser: ["Simisage"],
		num: -351,
		gen: 7,
		isNonstandard: "Past",
	},
	simipouriumz: {
		name: "Simipourium Z",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Blinding Waterfall",
		zMoveFrom: "Hydro Pump",
		itemUser: ["Simipour"],
		num: -352,
		gen: 7,
		isNonstandard: "Past",
	},
	simiseariumz: {
		name: "Simisearium Z",
		spritenum: 632,
		onTakeItem: false,
		zMove: "Deafening Firestorm",
		zMoveFrom: "Fire Blast",
		itemUser: ["Simisear"],
		num: -353,
		gen: 7,
		isNonstandard: "Past",
	},
	// Legalising gems
	buggem: {
		inherit: true,
		isNonstandard: null,
	},
	firegem: {
		inherit: true,
		isNonstandard: null,
	},
	watergem: {
		inherit: true,
		isNonstandard: null,
	},
	electricgem: {
		inherit: true,
		isNonstandard: null,
	},
	grassgem: {
		inherit: true,
		isNonstandard: null,
	},
	icegem: {
		inherit: true,
		isNonstandard: null,
	},
	fightinggem: {
		inherit: true,
		isNonstandard: null,
	},
	poisongem: {
		inherit: true,
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		isNonstandard: null,
	},
	flyinggem: {
		inherit: true,
		isNonstandard: null,
	},
	psychicgem: {
		inherit: true,
		isNonstandard: null,
	},
	rockgem: {
		inherit: true,
		isNonstandard: null,
	},
	ghostgem: {
		inherit: true,
		isNonstandard: null,
	},
	dragongem: {
		inherit: true,
		isNonstandard: null,
	},
	darkgem: {
		inherit: true,
		isNonstandard: null,
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	fairygem: {
		inherit: true,
		isNonstandard: null,
	},
	// Normal Gem is already legal
	// Modify Life orb so it doesn't inflict recoil when the opponent has Distortion
	lifeorb: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' &&
			  !['distortion', 'origin'].includes(target.ability)) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getItem('lifeorb'));
			}
		},
	},
	// disable transform enabling items with Distortion
	redorb: {
		inherit: true,
		onSwitchIn(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];

			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon' && !['distortion', 'origin'].includes(target.ability) &&
			  !this.effectData.primalReversionComplete) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
				this.effectData.primalReversionComplete = true;
			}
		},
		// transform once distortion is gone
		onUpdate(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];

			if (pokemon.isActive && pokemon.baseSpecies.name === 'Groudon' && !['distortion', 'origin'].includes(target.ability) &&
			  !this.effectData.primalReversionComplete) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
				this.effectData.primalReversionComplete = true;
			}
		},
	},
	blueorb: {
		inherit: true,
		onSwitchIn(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];

			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre' && !['distortion', 'origin'].includes(target.ability) &&
			  !this.effectData.primalReversionComplete) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
				this.effectData.primalReversionComplete = true;
			}
		},
		// transform once distortion is gone
		onUpdate(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];

			if (pokemon.isActive && pokemon.baseSpecies.name === 'Kyogre' && !['distortion', 'origin'].includes(target.ability) &&
			  !this.effectData.primalReversionComplete) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
				this.effectData.primalReversionComplete = true;
			}
		},
	},
	// -------- MEGA STONES --------
	butterfreenite: {
		name: "Butterfreenite",
		spritenum: 625,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -100,
		gen: 7,
		isNonstandard: "Past",
	},
	arbokite: {
		name: "Arbokite",
		spritenum: 625,
		megaStone: "Arbok-Mega",
		megaEvolves: "Arbok",
		itemUser: ["Arbok"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -101,
		gen: 7,
		isNonstandard: "Past",
	},
	raichunite: {
		name: "Raichunite",
		spritenum: 625,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -102,
		gen: 7,
		isNonstandard: "Past",
	},
	vilepluminite: {
		name: "Vilepluminite",
		spritenum: 625,
		megaStone: "Vileplume-Mega",
		megaEvolves: "Vileplume",
		itemUser: ["Vileplume"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -103,
		gen: 7,
		isNonstandard: "Past",
	},
	arcanite: {
		name: "Arcanite",
		spritenum: 625,
		megaStone: "Arcanine-Mega",
		megaEvolves: "Arcanine",
		itemUser: ["Arcanine"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -104,
		gen: 7,
		isNonstandard: "Past",
	},
	weezinite: {
		name: "Weezinite",
		spritenum: 625,
		megaStone: "Weezing-Mega",
		megaEvolves: "Weezing",
		itemUser: ["Weezing"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -105,
		gen: 7,
		isNonstandard: "Past",
	},
	starmite: {
		name: "Starmite",
		spritenum: 625,
		megaStone: "Starmie-Mega",
		megaEvolves: "Starmie",
		itemUser: ["Starmie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -106,
		gen: 7,
		isNonstandard: "Past",
	},
	laprasite: {
		name: "Laprasite",
		spritenum: 625,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -107,
		gen: 7,
		isNonstandard: "Past",
	},
	draconite: {
		name: "Draconite",
		spritenum: 625,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -108,
		gen: 7,
		isNonstandard: "Past",
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: 625,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -149,
		gen: 7,
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 625,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -109,
		gen: 7,
		isNonstandard: "Past",
	},
	feraliganite: {
		name: "Feraliganite",
		spritenum: 625,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -110,
		gen: 7,
		isNonstandard: "Past",
	},
	sudowoodite: {
		name: "Sudowoodite",
		spritenum: 625,
		megaStone: "Sudowoodo-Mega",
		megaEvolves: "Sudowoodo",
		itemUser: ["Sudowoodo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -111,
		gen: 7,
		isNonstandard: "Past",
	},
	girafarinite: {
		name: "Girafarinite",
		spritenum: 625,
		megaStone: "Girafarig-Mega",
		megaEvolves: "Girafarig",
		itemUser: ["Girafarig"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -112,
		gen: 7,
		isNonstandard: "Past",
	},
	granbullinite: {
		name: "Granbullinite",
		spritenum: 625,
		megaStone: "Granbull-Mega",
		megaEvolves: "Granbull",
		itemUser: ["Granbull"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -113,
		gen: 7,
		isNonstandard: "Past",
	},
	octillerite: {
		name: "Octillerite",
		spritenum: 625,
		megaStone: "Octillery-Mega",
		megaEvolves: "Octillery",
		itemUser: ["Octillery"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -114,
		gen: 7,
		isNonstandard: "Past",
	},
	delibirdite: {
		name: "Delibirdite",
		spritenum: 625,
		megaStone: "Delibird-Mega",
		megaEvolves: "Delibird",
		itemUser: ["Delibird"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -115,
		gen: 7,
		isNonstandard: "Past",
	},
	noctowlite: {
		name: "Noctowlite",
		spritenum: 625,
		megaStone: "Noctowl-Mega",
		megaEvolves: "Noctowl",
		itemUser: ["Noctowl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -116,
		gen: 7,
		isNonstandard: "Past",
	},
	ledianite: {
		name: "Ledianite",
		spritenum: 625,
		megaStone: "Ledian-Mega",
		megaEvolves: "Ledian",
		itemUser: ["Ledian"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -117,
		gen: 7,
		isNonstandard: "Past",
	},
	ariadosite: {
		name: "Ariadosite",
		spritenum: 625,
		megaStone: "Ariados-Mega",
		megaEvolves: "Ariados",
		itemUser: ["Ariados"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -118,
		gen: 7,
		isNonstandard: "Past",
	},
	bellossomite: {
		name: "Bellossomite",
		spritenum: 625,
		megaStone: "Bellossom-Mega",
		megaEvolves: "Bellossom",
		itemUser: ["Bellossom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -119,
		gen: 7,
		isNonstandard: "Past",
	},
	sunflorite: {
		name: "Sunflorite",
		spritenum: 625,
		megaStone: "Sunflora-Mega",
		megaEvolves: "Sunflora",
		itemUser: ["Sunflora"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -120,
		gen: 7,
		isNonstandard: "Past",
	},
	slowkingite: {
		name: "Slowkingite",
		spritenum: 625,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -121,
		gen: 7,
		isNonstandard: "Past",
	},
	magcargonite: {
		name: "Magcargonite",
		spritenum: 625,
		megaStone: "Magcargo-Mega",
		megaEvolves: "Magcargo",
		itemUser: ["Magcargo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -122,
		gen: 7,
		isNonstandard: "Past",
	},
	kingdranite: {
		name: "Kingdranite",
		spritenum: 625,
		megaStone: "Kingdra-Mega",
		megaEvolves: "Kingdra",
		itemUser: ["Kingdra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -123,
		gen: 7,
		isNonstandard: "Past",
	},
	stantlerite: {
		name: "Stantlerite",
		spritenum: 625,
		megaStone: "Stantler-Mega",
		megaEvolves: "Stantler",
		itemUser: ["Stantler"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -124,
		gen: 7,
		isNonstandard: "Past",
	},
	miltankite: {
		name: "Miltankite",
		spritenum: 625,
		megaStone: "Miltank-Mega",
		megaEvolves: "Miltank",
		itemUser: ["Miltank"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -125,
		gen: 7,
		isNonstandard: "Past",
	},
	flygonite: {
		name: "Flygonite",
		spritenum: 625,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -126,
		gen: 7,
		isNonstandard: "Past",
	},
	milotite: {
		name: "Milotite",
		spritenum: 625,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -127,
		gen: 7,
		isNonstandard: "Past",
	},
	tropiusite: {
		name: "Tropiusite",
		spritenum: 625,
		megaStone: "Tropius-Mega",
		megaEvolves: "Tropius",
		itemUser: ["Tropius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -128,
		gen: 7,
		isNonstandard: "Past",
	},
	chimechonite: {
		name: "Chimechonite",
		spritenum: 625,
		megaStone: "Chimecho-Mega",
		megaEvolves: "Chimecho",
		itemUser: ["Chimecho"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -129,
		gen: 7,
		isNonstandard: "Past",
	},
	torterrite: {
		name: "Torterrite",
		spritenum: 625,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		itemUser: ["Torterra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -130,
		gen: 7,
		isNonstandard: "Past",
	},
	infernite: {
		name: "Infernite",
		spritenum: 625,
		megaStone: "Infernape-Mega",
		megaEvolves: "Infernape",
		itemUser: ["Infernape"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -131,
		gen: 7,
		isNonstandard: "Past",
	},
	empoleonite: {
		name: "Empoleonite",
		spritenum: 625,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		itemUser: ["Empoleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -132,
		gen: 7,
		isNonstandard: "Past",
	},
	rampardite: {
		name: "Rampardite",
		spritenum: 625,
		megaStone: "Rampardos-Mega",
		megaEvolves: "Rampardos",
		itemUser: ["Rampardos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -133,
		gen: 7,
		isNonstandard: "Past",
	},
	bastionite: {
		name: "Bastionite",
		spritenum: 625,
		megaStone: "Bastiodon-Mega",
		megaEvolves: "Bastiodon",
		itemUser: ["Bastiodon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -134,
		gen: 7,
		isNonstandard: "Past",
	},
	vespiquenite: {
		name: "Vespiquenite",
		spritenum: 625,
		megaStone: "Vespiquen-Mega",
		megaEvolves: "Vespiquen",
		itemUser: ["Vespiquen"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -135,
		gen: 7,
		isNonstandard: "Past",
	},
	luxrite: {
		name: "Luxrite",
		spritenum: 625,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -136,
		gen: 7,
		isNonstandard: "Past",
	},
	roseradite: {
		name: "Roseradite",
		spritenum: 625,
		megaStone: "Roserade-Mega",
		megaEvolves: "Roserade",
		itemUser: ["Roserade"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -137,
		gen: 7,
		isNonstandard: "Past",
	},
	floatzelite: {
		name: "Floatzelite",
		spritenum: 625,
		megaStone: "Floatzel-Mega",
		megaEvolves: "Floatzel",
		itemUser: ["Floatzel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -138,
		gen: 7,
		isNonstandard: "Past",
	},
	mismagiusite: {
		name: "Mismagiusite",
		spritenum: 625,
		megaStone: "Mismagius-Mega",
		megaEvolves: "Mismagius",
		itemUser: ["Mismagius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -139,
		gen: 7,
		isNonstandard: "Past",
	},
	puruglite: {
		name: "Puruglite",
		spritenum: 625,
		megaStone: "Purugly-Mega",
		megaEvolves: "Purugly",
		itemUser: ["Purugly"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -140,
		gen: 7,
		isNonstandard: "Past",
	},
	bronzonite: {
		name: "Bronzonite",
		spritenum: 625,
		megaStone: "Bronzong-Mega",
		megaEvolves: "Bronzong",
		itemUser: ["Bronzong"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -141,
		gen: 7,
		isNonstandard: "Past",
	},
	spiritombite: {
		name: "Spiritombite",
		spritenum: 625,
		megaStone: "Spiritomb-Mega",
		megaEvolves: "Spiritomb",
		itemUser: ["Spiritomb"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -142,
		gen: 7,
		isNonstandard: "Past",
	},
	drapionite: {
		name: "Drapionite",
		spritenum: 625,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -143,
		gen: 7,
		isNonstandard: "Past",
	},
	lumineonite: {
		name: "Lumineonite",
		spritenum: 625,
		megaStone: "Lumineon-Mega",
		megaEvolves: "Lumineon",
		itemUser: ["Lumineon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -144,
		gen: 7,
		isNonstandard: "Past",
	},
	weavilite: {
		name: "Weavilite",
		spritenum: 625,
		megaStone: "Weavile-Mega",
		megaEvolves: "Weavile",
		itemUser: ["Weavile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -145,
		gen: 7,
		isNonstandard: "Past",
	},
	electivirite: {
		name: "Electivirite",
		spritenum: 625,
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		itemUser: ["Electivire"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -146,
		gen: 7,
		isNonstandard: "Past",
	},
	magmortite: {
		name: "Magmortite",
		spritenum: 625,
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		itemUser: ["Magmortar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -147,
		gen: 7,
		isNonstandard: "Past",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 625,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
		num: -148,
		gen: 7,
		isNonstandard: "Past",
	},

	// Fix Knock Off behaviour with regional variants of Pokemon who can mega:
	abomasite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	absolite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	aerodactylite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	aggronite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	alakazite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	altarianite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	ampharosite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	audinite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	banettite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	beedrillite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	blastoisinite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	blazikenite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	cameruptite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	diancite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	galladite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	garchompite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	gardevoirite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	gengarite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	glalitite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	gyaradosite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	heracronite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	houndoominite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	kangaskhanite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	latiasite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	latiosite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	lopunnite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	lucarionite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	manectite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	mawilite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	medichamite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	metagrossite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	pidgeotite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	pinsirite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	sablenite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	salamencite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	sceptilite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	scizorite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	sharpedonite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	slowbronite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	steelixite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	swampertite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	tyranitarite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
	venusaurite: {
		inherit: true,
		onTakeItem(item, source) {
			if (item.megaEvolves === source.species.name || item.megaStone === source.species.name) return false;
			return true;
		},
	},
};
