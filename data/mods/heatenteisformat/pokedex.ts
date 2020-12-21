export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	kyuremblack: {
		inherit: true,
		baseStats: {hp: 125, atk: 190, def: 110, spa: 140, spd: 100, spe: 95},
	},
	kyuremwhite: {
		inherit: true,
		baseStats: {hp: 125, atk: 140, def: 100, spa: 190, spd: 110, spe: 95},
	},
	hooh: {
		inherit: true,
		baseStats: {hp: 106, atk: 150, def: 90, spa: 110, spd: 174, spe: 110},
		abilities: {0: "Pressure", 1: "Regenerator", H: "Drought"},
	},
	lugia: {
		inherit: true,
		baseStats: {hp: 106, atk: 90, def: 150, spa: 110, spd: 174, spe: 110},
		abilities: {0: "Pressure", 1: "Multiscale", H: "Drizzle"},
	},
	zekrom: {
		inherit: true,
		baseStats: {hp: 100, atk: 170, def: 130, spa: 140, spd: 100, spe: 90},
	},
	reshiram: {
		inherit: true,
		baseStats: {hp: 100, atk: 140, def: 100, spa: 170, spd: 130, spe: 90},
	},
	zacian: {
		inherit: true,
		types: ["Fighting"],
	},
	zamazenta: {
		inherit: true,
		types: ["Fairy"],
	},
	zaciancrowned: {
		inherit: true,
		types: ["Fighting", "Steel"],
		baseStats: {hp: 92, atk: 170, def: 125, spa: 120, spd: 125, spe: 148},
	},
	zamazentacrowned: {
		inherit: true,
		types: ["Fairy", "Steel"],
		baseStats: {hp: 92, atk: 130, def: 175, spa: 80, spd: 175, spe: 128},
	},
	solgaleo: {
		inherit: true,
		baseStats: {hp: 139, atk: 179, def: 107, spa: 113, spd: 89, spe: 113},
	},
	lunala: {
		inherit: true,
		baseStats: {hp: 139, atk: 113, def: 89, spa: 179, spd: 107, spe: 113},
	},
	necrozmaduskmane: {
		inherit: true,
		baseStats: {hp: 97, atk: 157, def: 163, spa: 113, spd: 127, spe: 83},
	},
	necrozmadawnwings: {
		inherit: true,
		baseStats: {hp: 97, atk: 113, def: 127, spa: 157, spd: 163, spe: 83},
	},
	necrozmaultra: {
		inherit: true,
		baseStats: {hp: 97, atk: 197, def: 97, spa: 197, spd: 97, spe: 157},
	},
	palkia: {
		inherit: true,
		baseStats: {hp: 90, atk: 120, def: 100, spa: 180, spd: 140, spe: 130},
		abilities: {0: "Pressure", H: "Spacial Barrier"},
	},
	dialga: {
		inherit: true,
		baseStats: {hp: 100, atk: 120, def: 120, spa: 150, spd: 100, spe: 90},
		abilities: {0: "Pressure", H: "Temporal Barrier"},
	},
	giratina: {
		inherit: true,
		baseStats: {hp: 150, atk: 100, def: 160, spa: 100, spd: 160, spe: 90},
		abilities: {0: "Pressure", H: "Telepathy"}, // TODO: Distortion for HA
	},
	giratinaorigin: {
		inherit: true,
		baseStats: {hp: 150, atk: 160, def: 100, spa: 160, spd: 100, spe: 90},
		abilities: {0: "Levitate"},
	},
	// MEGA STUFF
	butterfree: {
		inherit: true,
		otherFormes: ["Butterfree-Mega"],
		formeOrder: ["Butterfree", "Butterfree-Mega"],
	},
	butterfreemega: {
		num: 12,
		name: "Butterfree-Mega",
		baseSpecies: "Butterfree",
		forme: "Mega",
		types: ["Bug", "Psychic"],
		baseStats: {hp: 60, atk: 15, def: 50, spa: 150, spd: 100, spe: 120},
		abilities: {0: "Magic Guard"},
		heightm: 1.1,
		weightkg: 32,
		color: "White",
		eggGroups: ["Bug"],
		requiredItem: "Butterfreenite",
	},
};
