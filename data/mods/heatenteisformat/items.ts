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
};
