export const Formats: FormatList = [
	{
		section: "Pet Mods",
	},
	{
		name: "[Gen 8] Heat Enteis OU",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arceus', 'Calyrex-Shadow', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Baton Pass',
		],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		debug: true, // TEMP, REMOVEME
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
		name: "[Gen 8] Heat Enteis AG",
		desc: "Assorted buffs and new megas in a tier where everything bar Dynamax, non signature Z moves (we removed them from the game altogether) and Endless Battle clause is freed.",
		mod: 'heatenteisformat',
		ruleset: ['[Gen 8] National Dex AG', 'Dynamax Clause'],
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