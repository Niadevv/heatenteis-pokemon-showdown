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
	sudowoodite: {
		name: "Sudowoodite",
		spritenum: 625,
		megaStone: "Sudowoodo-Mega",
		megaEvolves: "Sudowoodo",
		itemUser: ["Sudowoodo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -122,
		gen: 7,
		isNonstandard: "Past",
	},
};
