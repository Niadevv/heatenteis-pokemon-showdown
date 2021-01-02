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
	// -------- MEGA STONES --------
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
	kingdranite: {
		name: "Kingdranite",
		spritenum: 625,
		megaStone: "Kingdra-Mega",
		megaEvolves: "Kingdra",
		itemUser: ["Kingdra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
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
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -129,
		gen: 7,
		isNonstandard: "Past",
	},
};
