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
		abilities: {0: "Pressure", H: "Distortion"},
	},
	giratinaorigin: {
		inherit: true,
		baseStats: {hp: 150, atk: 160, def: 100, spa: 160, spd: 100, spe: 90},
		abilities: {0: "Levitate", H: "Distortion"},
	},
	arceus: {
		inherit: true,
		baseStats: {hp: 140, atk: 140, def: 140, spa: 140, spd: 140, spe: 140},
	},
	groudon: {
		inherit: true,
		baseStats: {hp: 100, atk: 160, def: 150, spa: 130, spd: 100, spe: 90},
	},
	groudonprimal: {
		inherit: true,
		baseStats: {hp: 100, atk: 190, def: 170, spa: 160, spd: 120, spe: 90},
	},
	kyogre: {
		inherit: true,
		baseStats: {hp: 100, atk: 130, def: 100, spa: 160, spd: 150, spe: 90},
	},
	kyogreprimal: {
		inherit: true,
		baseStats: {hp: 100, atk: 160, def: 120, spa: 190, spd: 170, spe: 90},
	},
	rayquaza: {
		inherit: true,
		baseStats: {hp: 105, atk: 160, def: 105, spa: 160, spd: 105, spe: 105},
	},
	rayquazamega: {
		inherit: true,
		baseStats: {hp: 105, atk: 190, def: 115, spa: 190, spd: 115, spe: 125},
	},
	eternatus: {
		inherit: true,
		baseStats: {hp: 140, atk: 85, def: 115, spa: 165, spd: 115, spe: 130},
	},
	zygardecomplete: {
		inherit: true,
		baseStats: {hp: 216, atk: 110, def: 141, spa: 91, spd: 115, spe: 85},
	},
	yveltal: {
		inherit: true,
		baseStats: {hp: 126, atk: 151, def: 105, spa: 151, spd: 108, spe: 99},
	},
	xerneas: {
		inherit: true,
		baseStats: {hp: 126, atk: 151, def: 105, spa: 151, spd: 108, spe: 99},
	},
	mewtwo: {
		inherit: true,
		baseStats: {hp: 106, atk: 110, def: 100, spa: 184, spd: 100, spe: 140},
	},
	mewtwomegay: {
		inherit: true,
		baseStats: {hp: 106, atk: 150, def: 80, spa: 224, spd: 130, spe: 150},
		abilities: {0: "Limber"},
	},
	mewtwomegax: {
		inherit: true,
		baseStats: {hp: 106, atk: 220, def: 110, spa: 154, spd: 110, spe: 140},
		abilities: {0: "Inner Focus"},
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
