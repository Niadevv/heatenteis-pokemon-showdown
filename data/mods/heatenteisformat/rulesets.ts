export const Formats: {[k: string]: ModdedFormatData} = {
	// sigzmovesonly: {
	// 	effectType: 'ValidatorRule',
	// 	name: "Signature Z-Moves Only",
	// 	desc: "Bans all non Signature Z moves.",
	// 	onValidateSet(set, format) {
	// 		const item = this.dex.getItem(set.item);
	// 		if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'inciniumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
	// 		 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
	// 		 'solganiumz', 'tapuniumz'].includes(item.id)) {
	// 			return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
	// 		}
	// 	},
	// },
	standardnatdex: {
		inherit: true,
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', // eternamax freed :']
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.getItem(set.item);
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
	},
};
