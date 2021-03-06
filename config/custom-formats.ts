export const Formats: FormatList = [
	{
		section: "Sw/Sh Singles",
	},
	{
		name: "[Gen 8] Heat Enteis OU",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Overflow Stat Mod'],
		banlist: [
			'Arceus', 'Arceus-Origin', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Attack', 'Dialga', 'Eternatus', 'Eternatus-Eternamax', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Rayquaza', 'Regigigas-Origin', 'Reshiram', 'Slowking-Mega', 'Solgaleo', 'Xerneas', 'Yveltal',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Complete', 'Power Construct', 'Baton Pass',
			// no clue why I need to ban the mega stones because natdex format doesn't have to but apparently I do now so /shrug
			'Gengarite', 'Slowkingite', 'Metagrossite',
		],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
		// debug: true, // TEMP, REMOVEME
	},
	{
		name: "[Gen 8] Heat Enteis Ubers",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Overflow Stat Mod'],
		banlist: ["Arceus-Origin", "Eternatus-Eternamax", "Baton Pass"],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
	},
	{
		name: "[Gen 8] Heat Enteis UU",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Overflow Stat Mod'],
		banlist: [
			'Arceus', 'Arceus-Origin', 'Calyrex-Shadow', 'Dialga', 'Eternatus', 'Eternatus-Eternamax', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Rayquaza', 'Regigigas-Origin', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Complete', 'Power Construct', 'Baton Pass',
			// OU
			'Alakazam-Mega', 'Blastoise-Mega', 'Blissey', 'Blaziken', 'Blaziken-Mega', 'Calyrex-Ice', 'Chansey', 'Charizard-Mega-X', 'Charizard-Mega-Y',
			'Cinderace', 'Clefable', 'Corviknight', 'Darkrai', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dracovish',
			'Dragapult', 'Excadrill', 'Ferrothorn', 'Floette-Eternal', 'Garchomp', 'Genesect', 'Genesect-Burn', 'Genesect-Douse', 'Genesect-Chill', 'Genesect-Shock',
			'Gliscor', 'Greninja', 'Greninja-Ash', 'Heatran', 'Kartana', 'Kangaskhan-Mega', 'Kommo-o', 'Landorus-Base', 'Landorus-Therian', 'Lopunny-Mega',
			'Lucario-Mega', 'Magearna', 'Magnezone', 'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Naganadel', 'Pelipper', 'Pheromosa', 'Rillaboom',
			'Salamence-Mega', 'Scizor-Mega', 'Serperior', 'Shaymin-Sky', 'Slowbro', 'Slowking-Mega', 'Spectrier', 'Swampert-Mega', 'Tangrowth', 'Tapu Fini', 'Tapu Koko', 'Tapu Lele',
			'Tornadus-Therian', 'Toxapex', 'Tyranitar', 'Urshifu-Single-Strike', 'Volcarona', 'Zapdos', 'Zygarde',
			// OU by technicality
			'Garchomp-Mega', 'Slowbro-Mega', 'Tyranitar-Mega',
			// no clue why I need to ban the mega stones because natdex format doesn't have to but apparently I do now so /shrug
			'Gengarite', 'Alakazite', 'Blastoisinite', 'Blazikenite', 'Charizardite X', 'Charizardite Y', 'Garchompite', 'Kangaskhanite', 'Lopunnite',
			'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Swampertite', 'Tyranitarite', 'Slowbronite', 'Slowkingite',
		],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
		// debug: true, // TEMP, REMOVEME
	},
	{
		name: "[Gen 8] Heat Enteis OUBL",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Overflow Stat Mod'],
		banlist: [
			'Arceus', 'Arceus-Origin', 'Calyrex-Shadow', 'Dialga', 'Eternatus', 'Eternatus-Eternamax', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal',
			'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Baton Pass',
		],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
		// debug: true, // TEMP, REMOVEME
	},
	{
		name: "[Gen 8] Heat Enteis Anything Goes",
		desc: "Assorted buffs and new megas in a tier where everything bar Dynamax, non signature Z moves (we removed them from the game altogether) and Endless Battle clause is freed.",
		mod: 'heatenteisformat',
		ruleset: ['[Gen 8] National Dex AG', 'Dynamax Clause', 'Overflow Stat Mod'],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
	},
	{
		name: "[Gen 8] Heat Enteis Almost Anything Goes",
		desc: "Assorted buffs and new megas",
		mod: 'heatenteisformat',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Overflow Stat Mod'],
		banlist: ["Arceus-Origin", "Eternatus-Eternamax"],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.zMove && !['ultranecroziumz', 'aloraichiumz', 'decidiumz', 'eeviumz', 'kommoniumz', 'lunaliumz',
			 'lycaniumz', 'marshadiumz', 'mewniumz', 'mimikiumz', 'pikaniumz', 'pikashuniumz', 'primariumz', 'snorliumz',
			 'solganiumz', 'tapuniumz', 'simisagiumz', 'simipouriumz', 'simiseariumz'].includes(item.id)) {
				return [`${set.name || set.species}'s item ${item.name} is banned by Signature Z-Moves Only Clause.`];
			}
		},
		onValidateTeam(team) {
			let originceus = 0;
			let origigas = 0;
			let eternamax = 0;
			for (const set of team) {
				if (set.species === 'Arceus-Origin') originceus++;
				if (set.species === 'Regigigas-Origin') origigas++;
				if (set.species === 'Eternatus-Eternamax') eternamax++;
				if (originceus > 1) return ["You can only use one Arceus-Origin."];
				if (origigas > 1) return ["You can only use one Regigigas-Origin."];
				if (eternamax > 1) return ["You can only use one Eternatus-Eternamax."];
			}
		},
	},
];
