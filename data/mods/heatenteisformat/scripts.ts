export const Scripts: ModdedBattleScriptsData = {
	init() {
		// Making move combos available
		this.modData('Learnsets', 'blissey').learnset.teleport = ['5L1'];
		this.modData('Learnsets', 'blissey').learnset.wish = ['5L1'];
		this.modData('Learnsets', 'blissey').learnset.softboiled = ['5L1'];
		this.modData('Learnsets', 'blissey').learnset.psywave = ['5L1'];
		// Uber buffs
		this.modData('Learnsets', 'kyurem').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'kyurem').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'kyuremblack').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'kyuremblack').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'kyuremwhite').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'kyuremwhite').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'zekrom').learnset.earthquake = ['5L1'];
		// this was a mistake
		// this.modData('Learnsets', 'zamazentacrowned').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'zamazentacrowned').learnset.bodypress = ['5L1'];
		this.modData('Learnsets', 'zamazentacrowned').learnset.playrough = ['5L1'];
		this.modData('Learnsets', 'solgaleo').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'solgaleo').learnset.shiftgear = ['5L1'];
		this.modData('Learnsets', 'lunala').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'lunala').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'necrozma').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'necrozma').learnset.dragonclaw = ['5L1'];
		// Necrozma's forms should all inherit the learned moves
		this.modData('Learnsets', 'palkia').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'palkia').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'dialga').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'dialga').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'giratina').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'giratina').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'giratina').learnset.dragondance = ['5L1'];
		this.modData('Learnsets', 'giratina').learnset.roost = ['5L1'];
		this.modData('Learnsets', 'mewtwo').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'mewtwo').learnset.closecombat = ['5L1'];

		// Mega Base forms new learned moves:
		this.modData('Learnsets', 'butterfree').learnset.psyshock = ['5L1'];
		this.modData('Learnsets', 'butterfree').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'arbok').learnset.shadowsneak = ['5L1'];
		this.modData('Learnsets', 'arbok').learnset.shadowfang = ['5L1'];
		this.modData('Learnsets', 'arbok').learnset.knockoff = ['5L1'];
		this.modData('Learnsets', 'arbok').learnset.taunt = ['5L1'];
		this.modData('Learnsets', 'raichu').learnset.highjumpkick = ['5L1'];
		this.modData('Learnsets', 'raichu').learnset.bulkup = ['5L1'];
		this.modData('Learnsets', 'vileplume').learnset.leafstorm = ['5L1'];
		this.modData('Learnsets', 'vileplume').learnset.earthpower = ['5L1'];
		this.modData('Learnsets', 'vileplume').learnset.clearsmog = ['5L1'];
		this.modData('Learnsets', 'weezing').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.energyball = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.futuresight = ['5L1'];
		this.modData('Learnsets', 'starmie').learnset.mysticalfire = ['5L1'];
		this.modData('Learnsets', 'lapras').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'lapras').learnset.drainingkiss = ['5L1'];
		this.modData('Learnsets', 'lapras').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'meganium').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'meganium').learnset.drainingkiss = ['5L1'];
		this.modData('Learnsets', 'meganium').learnset.earthpower = ['5L1'];
		this.modData('Learnsets', 'typhlosion').learnset.earthpower = ['5L1'];
		this.modData('Learnsets', 'feraligatr').learnset.psychicfangs = ['5L1'];
		// Learns Iron Maw further down
		this.modData('Learnsets', 'sudowoodo').learnset.accelerock = ['5L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.bulkup = ['5L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.seedbomb = ['5L1'];
		// Girafarig learns Iron Maw further down
		this.modData('Learnsets', 'girafarig').learnset.extremespeed = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.hyperbeam = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.expandingforce = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.storedpower = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.icefang = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.firefang = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.thunderfang = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.jumpkick = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.hornleech = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.playrough = ['5L1'];
		this.modData('Learnsets', 'granbull').learnset.knockoff = ['5L1'];
		this.modData('Learnsets', 'granbull').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'granbull').learnset.psychicfangs = ['5L1'];
		this.modData('Learnsets', 'octillery').learnset.flashcannon = ['5L1'];
		this.modData('Learnsets', 'octillery').learnset.ironhead = ['5L1'];
		this.modData('Learnsets', 'octillery').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'octillery').learnset.darkpulse = ['5L1'];
		this.modData('Learnsets', 'octillery').learnset.fishiousrend = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.bulkup = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.knockoff = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.iciclecrash = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.pursuit = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.suckerpunch = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'delibird').learnset.tripleaxel = ['5L1'];
		this.modData('Learnsets', 'noctowl').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'noctowl').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'noctowl').learnset.uturn = ['5L1'];
		this.modData('Learnsets', 'ledian').learnset.playrough = ['5L1'];
		this.modData('Learnsets', 'ledian').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'bellossom').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'bellossom').learnset.drainingkiss = ['5L1'];
		this.modData('Learnsets', 'bellossom').learnset.earthpower = ['5L1'];
		this.modData('Learnsets', 'bellossom').learnset.weatherball = ['5L1'];

		// Cursed Dance learners
		this.modData('Learnsets', 'blacephalon').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'hoopa').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'spectrier').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'chandelure').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'lampent').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'polteageist').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'gengar').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'haunter').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'mismagius').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'oricorio').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'drifblim').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'misdreavus').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'froslass').learnset.curseddance = ['5L1'];
		this.modData('Learnsets', 'sinistea').learnset.curseddance = ['5L1'];

		// Iron Maw learners
		this.modData('Learnsets', 'feraligatr').learnset.ironmaw = ['5L1'];
		this.modData('Learnsets', 'girafarig').learnset.ironmaw = ['5L1'];

		// Other buffs
		this.modData('Learnsets', 'venusaur').learnset.sludgewave = ['5L1'];
		this.modData('Learnsets', 'venusaur').learnset.strengthsap = ['5L1'];
		this.modData('Learnsets', 'venusaur').learnset.stunspore = ['5L1'];
		this.modData('Learnsets', 'charizard').learnset.earthpower = ['5L1'];
		this.modData('Learnsets', 'blastoise').learnset.zapcannon = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.gunkshot = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.megahorn = ['5L1'];
		this.modData('Learnsets', 'pidgeot').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.hypervoice = ['5L1'];
		this.modData('Learnsets', 'beedrill').learnset.sing = ['5L1'];
		this.modData('Learnsets', 'dragapult').learnset.poltergeist = ['5L1'];
		this.modData('Learnsets', 'raticate').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'raticate').learnset.extremespeed = ['5L1'];
		this.modData('Learnsets', 'raticate').learnset.flareblitz = ['5L1'];
		this.modData('Learnsets', 'raticate').learnset.slackoff = ['5L1'];
		this.modData('Learnsets', 'raticatealola').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'raticatealola').learnset.extremespeed = ['5L1'];
		this.modData('Learnsets', 'raticatealola').learnset.slackoff = ['5L1'];
		this.modData('Learnsets', 'fearow').learnset.bravebird = ['5L1'];
		this.modData('Learnsets', 'fearow').learnset.superpower = ['5L1'];
		this.modData('Learnsets', 'fearow').learnset.bravebird = ['5L1'];
		this.modData('Learnsets', 'raichualola').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'sandslash').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'sandslash').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'nidoking').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'nidoqueen').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'ninetales').learnset.lavaplume = ['5L1'];
		this.modData('Learnsets', 'ninetales').learnset.morningsun = ['5L1'];
		this.modData('Learnsets', 'ninetalesalola').learnset.mysticalfires = ['5L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.boomburst = ['5L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.softboiled = ['5L1'];
		this.modData('Learnsets', 'parasect').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'parasect').learnset.leafblade = ['5L1'];
		this.modData('Learnsets', 'parasect').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'parasect').learnset.uturn = ['5L1'];
		this.modData('Learnsets', 'dugtrio').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'dugtrioalola').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'persian').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'persian').learnset.pursuit = ['5L1'];
		this.modData('Learnsets', 'persianalola').learnset.pursuit = ['5L1'];
		this.modData('Learnsets', 'golduck').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'golduck').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'golduck').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'golduck').learnset.storedpower = ['5L1'];
		this.modData('Learnsets', 'golduck').learnset.teleport = ['5L1'];
		this.modData('Learnsets', 'primeape').learnset.machpunch = ['5L1'];
		this.modData('Learnsets', 'poliwrath').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'poliwrath').learnset.flipturn = ['5L1'];
		this.modData('Learnsets', 'alakazam').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'machamp').learnset.machpunch = ['5L1'];
		this.modData('Learnsets', 'victreebel').learnset.gunkshot = ['5L1'];
		this.modData('Learnsets', 'victreebel').learnset.sludgewave = ['5L1'];
		this.modData('Learnsets', 'victreebel').learnset.solarblade = ['5L1'];
		this.modData('Learnsets', 'tentacruel').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'tentacruel').learnset.flipturn = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.accelerock = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.firepunch = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.quickattack = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'golem').learnset.headsmash = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.accelerock = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.firepunch = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.quickattack = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'golemalola').learnset.headsmash = ['5L1'];
		this.modData('Learnsets', 'rapidash').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'rapidash').learnset.hornleech = ['5L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.hornleech = ['5L1'];
		this.modData('Learnsets', 'rapidashgalar').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'slowbrogalar').learnset.teleport = ['5L1'];
		this.modData('Learnsets', 'farfetchd').learnset.brickbreak = ['5L1'];
		this.modData('Learnsets', 'farfetchd').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'farfetchd').learnset.fakeout = ['5L1'];
		this.modData('Learnsets', 'farfetchd').learnset.poweruppunch = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.flipturn = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.freezedry = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.iciclecrash = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.scald = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'dewgong').learnset.tripleaxel = ['5L1'];
		this.modData('Learnsets', 'muk').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'muk').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'mukalola').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'mukalola').learnset.earthquake = ['5L1'];
		this.modData('Learnsets', 'gengar').learnset.aurasphere = ['5L1'];
		// Gengar gets Cursed Dance further up
		this.modData('Learnsets', 'hypno').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'hypno').learnset.drainingkiss = ['5L1'];
		this.modData('Learnsets', 'hypno').learnset.moonlight = ['5L1'];
		this.modData('Learnsets', 'hypno').learnset.mysticalfire = ['5L1'];
		this.modData('Learnsets', 'kingler').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'kingler').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'kingler').learnset.machpunch = ['5L1'];
		this.modData('Learnsets', 'kingler').learnset.poweruppunch = ['5L1'];
		this.modData('Learnsets', 'kingler').learnset.thunderpunch = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.boomburst = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.energyball = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.risingvoltage = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.shadowball = ['5L1'];
		this.modData('Learnsets', 'electrode').learnset.weatherball = ['5L1'];
		this.modData('Learnsets', 'exeggutor').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'exeggutor').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'exeggutor').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'exeggutor').learnset.mysticalfire = ['5L1'];
		this.modData('Learnsets', 'exeggutoralola').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'exeggutoralola').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'exeggutoralola').learnset.nastyplot = ['5L1'];
		this.modData('Learnsets', 'exeggutoralola').learnset.mysticalfire = ['5L1'];
		this.modData('Learnsets', 'marowak').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'marowak').learnset.headsmash = ['5L1'];
		this.modData('Learnsets', 'marowak').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'marowak').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'marowak').learnset.sandtomb = ['5L1'];
		this.modData('Learnsets', 'marowakalola').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'marowakalola').learnset.headsmash = ['5L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.gunkshot = ['5L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.tropkick = ['5L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.uturn = ['5L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.suckerpunch = ['5L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.uturn = ['5L1'];
		// Kanto Weezing gets Recover further up
		this.modData('Learnsets', 'weezinggalar').learnset.recover = ['5L1'];
		this.modData('Learnsets', 'seaking').learnset.aquajet = ['5L1'];
		this.modData('Learnsets', 'seaking').learnset.fishiousrend = ['5L1'];
		this.modData('Learnsets', 'mrmime').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'mrmime').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'jynx').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'pinsir').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'pinsir').learnset.hornleech = ['5L1'];
		this.modData('Learnsets', 'pinsir').learnset.megahorn = ['5L1'];
		this.modData('Learnsets', 'gyarados').learnset.fishiousrend = ['5L1'];
		this.modData('Learnsets', 'vaporeon').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'vaporeon').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'jolteon').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'jolteon').learnset.recharge = ['5L1'];
		this.modData('Learnsets', 'flareon').learnset.bulkup = ['5L1'];
		this.modData('Learnsets', 'flareon').learnset.morningsun = ['5L1'];
		this.modData('Learnsets', 'kabutops').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'kabutops').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'kabutops').learnset.uturn = ['5L1'];
		this.modData('Learnsets', 'aerodactyl').learnset.bravebird = ['5L1'];
		this.modData('Learnsets', 'aerodactyl').learnset.headsmash = ['5L1'];
		this.modData('Learnsets', 'snorlax').learnset.slackoff = ['5L1'];
		this.modData('Learnsets', 'articuno').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'articuno').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'articunogalar').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'articunogalar').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'articunogalar').learnset.roost = ['5L1'];
		this.modData('Learnsets', 'zapdos').learnset.boltbeak = ['5L1'];
		this.modData('Learnsets', 'zapdos').learnset.recharge = ['5L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.roost = ['5L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.roost = ['5L1'];
		this.modData('Learnsets', 'dragonite').learnset.dragonenergy = ['5L1'];
		this.modData('Learnsets', 'mew').learnset.recharge = ['5L1'];
		// --------- END KANTO BUFFS ---------
		// Starter moves are further up
		this.modData('Learnsets', 'furret').learnset.bulletseed = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.claysmack = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.closecombat = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.extremespeed = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.suckerpunch = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'furret').learnset.tailslap = ['5L1'];
		// Noctowl, Ledian and Ariados moves are further up
		this.modData('Learnsets', 'lanturn').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'xatu').learnset.hurricane = ['5L1'];
		this.modData('Learnsets', 'ampharos').learnset.dracometeor = ['5L1'];
		this.modData('Learnsets', 'ampharos').learnset.recharge = ['5L1'];
		this.modData('Learnsets', 'ampharos').learnset.tailglow = ['5L1'];
		this.modData('Learnsets', 'azumarill').learnset.highhorsepower = ['5L1'];
		this.modData('Learnsets', 'politoed').learnset.flipturn = ['5L1'];
		this.modData('Learnsets', 'politoed').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'jumpluff').learnset.airslash = ['5L1'];
		this.modData('Learnsets', 'jumpluff').learnset.defog = ['5L1'];
		this.modData('Learnsets', 'jumpluff').learnset.leafstorm = ['5L1'];
		this.modData('Learnsets', 'jumpluff').learnset.hurricane = ['5L1'];
		this.modData('Learnsets', 'sunflora').learnset.weatherball = ['5L1'];
		this.modData('Learnsets', 'quagsire').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'espeon').learnset.aurasphere = ['5L1'];
		this.modData('Learnsets', 'espeon').learnset.mysticalfire = ['5L1'];
		this.modData('Learnsets', 'umbreon').learnset.calmmind = ['5L1'];
		this.modData('Learnsets', 'umbreon').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'slowkinggalar').learnset.teleport = ['5L1'];
		this.modData('Learnsets', 'forretress').learnset.bodypress = ['5L1'];
		this.modData('Learnsets', 'forretress').learnset.repair = ['5L1'];
		this.modData('Learnsets', 'steelix').learnset.ironmaw = ['5L1'];
		this.modData('Learnsets', 'steelix').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'qwilfish').learnset.fishiousrend = ['5L1'];
		this.modData('Learnsets', 'qwilfish').learnset.gunkshot = ['5L1'];
		this.modData('Learnsets', 'qwilfish').learnset.lifedew = ['5L1'];
		this.modData('Learnsets', 'scizor').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'heracross').learnset.firstimpression = ['5L1'];
		this.modData('Learnsets', 'ursaring').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'ursaring').learnset.knockoff = ['5L1'];
		this.modData('Learnsets', 'ursaring').learnset.suckerpunch = ['5L1'];
		this.modData('Learnsets', 'magcargo').learnset.eruption = ['5L1'];
		this.modData('Learnsets', 'magcargo').learnset.meteorbeam = ['5L1'];
		this.modData('Learnsets', 'magcargo').learnset.powergem = ['5L1'];
		this.modData('Learnsets', 'houndoom').learnset.scorchingsands = ['5L1'];
		this.modData('Learnsets', 'kingdra').learnset.dragonenergy = ['5L1'];
		this.modData('Learnsets', 'donphan').learnset.bodypress = ['5L1'];
		this.modData('Learnsets', 'donphan').learnset.powerwhip = ['5L1'];
		this.modData('Learnsets', 'donphan').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'stantler').learnset.highjumpkick = ['5L1'];
		this.modData('Learnsets', 'stantler').learnset.hornleech = ['5L1'];
		this.modData('Learnsets', 'stantler').learnset.iciclecrash = ['5L1'];
		this.modData('Learnsets', 'stantler').learnset.swordsdance = ['5L1'];
		this.modData('Learnsets', 'stantler').learnset.tripleaxel = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.blazekick = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.drainpunch = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.firepunch = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.gunkshot = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.icepunch = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.poweruppunch = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.thunderpunch = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.tropkick = ['5L1'];
		this.modData('Learnsets', 'hitmontop').learnset.uturn = ['5L1'];
		this.modData('Learnsets', 'raikou').learnset.recharge = ['5L1'];
		this.modData('Learnsets', 'tyranitar').learnset.knockoff = ['5L1'];
		this.modData('Learnsets', 'tyranitar').learnset.shoreup = ['5L1'];
		this.modData('Learnsets', 'celebi').learnset.focusblast = ['5L1'];
		this.modData('Learnsets', 'celebi').learnset.moonblast = ['5L1'];
		this.modData('Learnsets', 'celebi').learnset.mysticalfire = ['5L1'];
	},
};
