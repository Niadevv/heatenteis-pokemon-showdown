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
};
