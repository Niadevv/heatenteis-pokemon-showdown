export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	kyuremblack: {
		inherit: true,
		baseStats: {hp: 125, atk: 190, def: 110, spa: 140, spd: 100, spe: 95},
	},
	kyuremwhite: {
		inherit: true,
		baseStats: {hp: 125, atk: 140, def: 100, spa: 190, spd: 110, spe: 95},
	},
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
