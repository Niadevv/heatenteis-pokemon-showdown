export const Items: {[k: string]: ModdedItemData} = {
	butterfreenite: {
		name: "Butterfreenite",
		spritenum: 625,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -108,
		gen: 7,
		isNonstandard: "Past",
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 625,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -110,
		gen: 7,
		isNonstandard: "Past",
	},
};
