export const Formats: FormatList = [
	{
		section: "Pet Mods",
	},
	{
		name: "[Gen 8] Heat Enteis Ubers",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
	},
	{
		name: "[Gen 8] Heat Enteis",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['[Gen 8] National Dex'],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
	},
];
