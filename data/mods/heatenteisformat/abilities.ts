export const Abilities: {[k: string]: ModdedAbilityData} = {
	teravolt: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Teravolt boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Teravolt boost');
				return this.chainModify(1.3);
			}
		},
	},
	turboblaze: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Turboblaze boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Turboblaze boost');
				return this.chainModify(1.3);
			}
		},
	},
	fullmetalbody: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('FMB boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('FMB boost');
				return this.chainModify(1.3);
			}
		},
		// Magic Guard
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		// Status immunity
		onUpdate(pokemon) {
			if (pokemon.status) {
				this.add('-activate', pokemon, 'ability: Full Metal Body');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Full Metal Body');
			}
			return false;
		},
	},
	neuroforce: {
		inherit: true,
		onModifyMove(move) {
			if (move.id === "photongeyser") {
				move.basePower = 160;
			}
		},
	},
	powerconstruct: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Power Construct');
		},
		onAnyTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			move.hasAuraBreak = true;
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.flags['sound'] && !attacker.volatiles['dynamax']) {
				this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.flags['sound'] && !attacker.volatiles['dynamax']) {
				this.chainModify(1.2);
			}
		},
	},
	speedboost: {
		inherit: true,
		onStart(pokemon) {
			this.boost({spe: 1}, pokemon);
		},
		onResidual() {

		},
	},
	flowergift: {
		inherit: true,
		onStart(pokemon) {
			this.field.setWeather('sunnyday');
			delete this.effectData.forme;
		},
	},
	regenerator: {
		inherit: true,
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	plus: {
		inherit: true,
		onStart(pokemon) {
			this.boost({spa: 2}, pokemon);
		},
	},
	minus: {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Minus', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -2}, target, pokemon, null, true);
				}
			}
		},
	},
	// Get rid of max HP requirement
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
	},
	prankster: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				// From what I can tell, this only seems to serve to tell if the move is from Prankster, which is used to
				// do the immunity check in the first place. Removing this shouldn't have any consequences other than restoring
				// pre gen 7 mechanics
				// move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	forecast: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				if (pokemon.species.id !== 'castformsandy') forme = 'Castform-Sandy';
				break;
			case 'windstorm':
				if (pokemon.species.id !== 'castformwindy') forme = 'Castform-Windy';
				break;
			case 'desolateland':
				if (pokemon.species.id !== 'castformsolar') forme = 'Castform-Solar';
				break;
			case 'primordialsea':
				if (pokemon.species.id !== 'castformtyphoon') forme = 'Castform-Typhoon';
				break;
			case 'deltastream':
				if (pokemon.species.id !== 'castformtyphoon') forme = 'Castform-Typhoon';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
	},
	// More Pokemon can use Disguise now so get rid of the form exclusive stuff
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				/* ['mimikyu', 'mimikyutotem'].includes(target.species.id)*/
				!this.effectData.busted && !target.transformed
			) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectData.busted = true;
				return 0;
			}
		},
	},
	watercompaction: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
	},
	megalauncher: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] || ['electroball', 'energyball', 'gyroball', 'iceball', 'mistball',
			  'pyroball', 'shadowball', 'weatherball']) {
				return this.chainModify(1.5);
			}
		},
	},
	slowstart: {
		inherit: true,
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
	},
	// -------- New abilities --------
	spacialbarrier: {
		desc: "While active, this Pokemon is immune to status and OHKO moves.",
		shortDesc: "While active, this Pokemon is immune to status and OHKO moves.",
		name: "Spacial Barrier",
		rating: 4,
		isUnbreakable: true,
		onUpdate(pokemon) {
			if (pokemon.status) {
				this.add('-activate', pokemon, 'ability: Spacial Barrier');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Spacial Barrier');
			}
			return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Spacial Barrier');
				return null;
			}
		},
	},
	temporalbarrier: {
		desc: "This Pokemon cannot be flinched, can attack while asleep, and cumulative effects such as Toxic and Rollout base power increase will not grow,",
		shortDesc: "Cannot be flinched, can attack while asleep, cumulative effects do not gain.",
		name: "Temporal Barrier",
		// No flinches thank you
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		// in case steel typing removed
		onDamage(damage, target, source, effect) {
			if (effect.id === 'tox') {
				// keep toxic timer at 6%, refer to conditions.ts
				this.effectData.stage -= 1;
				// but still take damage
				return true;
			}
		},
		// set rollout and iceball accumlation back so it never goes up
		onDamagingHit(damage, target, source, move) {
			if (move.id === "rollout") {
				source.volatiles['rollout'].hitCount -= 1;
			}
			if (move.id === "iceball") {
				source.volatiles['iceball'].hitCount -= 1;
			}
		},
		// TODO: Make able to move when asleep
	},
	distortion: {
		desc: "Upon switchin, the user summons Gravity and disables all items that directly trigger, such as berries or transformation orbs.",
		shortDesc: "Summons Gravity and disables triggering items.",
		name: "Distortion",
		onFoeTryEatItem: false,
		onStart(pokemon) {
			// this.add('-fieldstart', 'ability: Distortion');
			this.field.addPseudoWeather('gravity');
		},

		// TODO: disable all items that trigger instead of just berries
	},
	genesis: {
		name: "Genesis",
		desc: "The user possesses Spacial Barrier, Temporal Barrier, Distortion, and Multitype, while Judgement becomes 200 BP and all of its moves gain STAB. Repent mortals.",
		shortDesc: "User has Spacial Barrier, Temporal Barrier, Distortion, Multitype. Judgement is 200 BP, all moves have STAB bonus.",
		isPermanent: true,
		// Temporal barrier
		onUpdate(pokemon) {
			if (pokemon.status) {
				this.add('-activate', pokemon, 'ability: Spacial Barrier');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Spacial Barrier');
			}
			return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Spacial Barrier');
				return null;
			}
		},
		// Temporal Barrier
		// No flinches thank you
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		// in case steel typing removed
		onDamage(damage, target, source, effect) {
			if (effect.id === 'tox') {
				// keep toxic timer at 6%, refer to conditions.ts
				this.effectData.stage -= 1;
				// but still take damage
				return true;
			}
		},
		// set rollout and iceball accumlation back so it never goes up
		onDamagingHit(damage, target, source, move) {
			if (move.id === "rollout") {
				source.volatiles['rollout'].hitCount -= 1;
			}
			if (move.id === "iceball") {
				source.volatiles['iceball'].hitCount -= 1;
			}
		},
		// TODO: Make able to move when asleep

		// Distortion
		onFoeTryEatItem: false,
		onStart(pokemon) {
			// this.add('-fieldstart', 'ability: Distortion');
			this.field.addPseudoWeather('gravity');
		},

		// Multitype
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},

		// Judgment BP change
		onModifyMove(move) {
			if (move.id === "judgment") {
				move.basePower = 200;
			}
		},

		// STAB boost for everything
		onBasePower(basePower, source, target, move) {
			if (move.type !== source.types[0]) {
				this.chainModify(1.5);
			}
		},
	},
	oneforall: {
		name: "One for All",
		desc: "Gives STAB bonus to Rock, Steel, Ice, Dragon and Electric type moves.",
		shortDesc: "STAB bonus to Rock, Steel, Ice, Dragon and Electric moves.",
		onBasePower(basePower, source, target, move) {
			if (['Rock', 'Steel', 'Ice', 'Dragon', 'Electric'].includes(move.type)) {
				this.chainModify(1.5);
			}
		},
	},
	neurotoxin: {
		desc: "Poison caused by the user does double damage to the target, including Toxic and Toxic Spikes.",
		shortDesc: "Poison caused by the user does double damage.",
		name: "Neurotoxin",
		// we redefine toxic and poison to make this work. hacky I know but there's no way to conditionally set status in a way that means it's not blocked by sheer force
	},
	psychooverload: {
		name: "Psycho Overload",
		desc: "The user's psychic moves are boosted by 1.5x.",
		shortDesc: "Psychic moves boosted by 1.5x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Psycho Overload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Psycho Overload boost');
				return this.chainModify(1.5);
			}
		},
	},
	explosive: {
		name: "Explosive",
		desc: "The user's Blast and Burn moves are powered up by 1.3x.",
		shortDesc: "Blast and Burn moves powered up by 1.3x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (['beakblast', 'blastburn', 'boomburst', 'eruption', 'explosion', 'fireblast',
			 'flameburst', 'focusblast', 'moonblast', 'rockblast', 'selfdestruct', 'technoblast'].includes(move.id)) {
				this.debug('Explosive boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (['beakblast', 'blastburn', 'boomburst', 'eruption', 'explosion', 'fireblast',
			 'flameburst', 'focusblast', 'moonblast', 'rockblast', 'selfdestruct', 'technoblast'].includes(move.id)) {
				this.debug('Explosive boost');
				return this.chainModify(1.3);
			}
		},
	},
	conjoined: {
		name: "Conjoined",
		desc: "The user's two halves attack at once. The second hit is weaker than the first.",
		shortDesc: "User attacks twice, second hit is 1.25x the first.",
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		rating: 4.5,
	},
	prosecutor: {
		name: "Prosecutor",
		desc: "The user judges the opponent at the end of every turn, with a 50% chance to Curse the opponent.",
		shortDesc: "50% chance to inflict Curse on the opponent at end of every turn.",
		onResidual(target) {
			const chance = this.random(2);
			if (chance === 0) {
				this.add('-activate', 'ability: Prosecutor');
				const opposingSide = target.side.foe.active;
				for (const foe of opposingSide) {
					if (foe) {
						foe.addVolatile('curse');
					}
				}
			}
		},
	},
	birdsofprey: {
		name: "Birds of Prey",
		desc: "The user traps opposing Bug and Flying types.",
		shortDesc: "Traps opposing Bug and Flying types.",
		onFoeTrapPokemon(pokemon) {
			if ((pokemon.hasType('Bug') || pokemon.hasType('Flying')) && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || (pokemon.hasType('Bug') || pokemon.hasType('Flying'))) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	starlight: {
		name: "Starlight",
		desc: "Upon switchin, the user summons 6 stars, each giving it a boost in attack. At the end of each turn, one fades, taking its associated boost away.",
		shortDesc: "+6 on switchin, -1 each turn for 5 turns after.",
		onStart(pokemon) {
			if (!this.field.effectiveWeather()) {
				this.add('-ability', pokemon, 'Starlight');
				this.effectData.starCount = 6;
				this.effectData.user = pokemon;
				this.boost({atk: 6}, pokemon);
			}
		},
		onAnySetWeather(target, source, weather) {
			// clear boosts on weather set
			if (this.effectData.starCount > 0) {
				this.debug("Clearing boosts from weather");
				this.boost({atk: -this.effectData.starCount}, this.effectData.user);
				this.effectData.starCount = 0;
			}
		},
		onResidual(pokemon) {
			this.debug("Starlight level of " + pokemon + ": " + this.effectData.starCount);
			// Only decrease if the user was in for a full turn
			if (pokemon.activeTurns && this.effectData.starCount > 0) {
				this.debug("Dropping Starlight count!");
				this.boost({atk: -1}, pokemon);
				this.effectData.starCount -= 1;
				this.debug("Starlight level of " + pokemon + " after drop: " + this.effectData.starCount);
			}
		},
		// Remove star power before baton pass for the sake of AG's sanity and lore
		onBeforeMove(source, target, move) {
			if (move.id === 'batonpass') {
				this.boost({atk: -this.effectData.starCount}, this.effectData.user);
			}
		},
		rating: 4.5,

		// TODO: Clear starlight boosts before baton passing
	},
	stickymadness: {
		name: "Sticky Madness",
		desc: "If hit with a contact move, the user will set webs on the opponents' side and lower their speed by 1. Additionally, if webs are set, it gains +2 attack and +1 speed. If webs are up on the user's side, it gains an additional +1 in speed.",
		shortDesc: "Sets webs on opponent's side and lowers attacker's speed by 1 on contact, +2 attack and +1 speed in webs (+2 spe if on user's side).",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (!source.side.getSideCondition('stickyweb') && !(source.side === target.side)) {
					source.side.addSideCondition('stickyweb');

					// check if the user's side has webs before boosting
					if (!target.side.getSideCondition('stickyweb')) {
						this.boost({atk: 2, spe: 1});
					}
				}
				this.boost({spe: -1}, source);
			}
		},
		onStart(pokemon) {
			if (pokemon.side.foe.getSideCondition('stickyweb')) {
				this.boost({atk: 2, spe: 1});
			}

			if (pokemon.side.getSideCondition('stickyweb') && !pokemon.side.foe.getSideCondition('stickyweb')) {
				this.boost({atk: 2, spe: 2});
			}
		},
	},
	solarenergy: {
		onModifyAtkPriority: 5,
		onModifyAtk(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		name: "Solar Energy",
		desc: "The user's attack stat receives a 1.5x boost in sunny weather. They also lose 1/8th their HP at the end of every turn while sun is active.",
		shortDesc: "User attack stat 1.5x in sun, 1/8th HP lost at end of turn while sun active.",
	},
	twisteddimension: {
		name: "Twisted Dimension",
		desc: "The user summons Trick Room while it is active, which fades once the user switches out.",
		shortDesc: "Trick Room active while user is active.",
		onStart(pokemon) {
			if (!this.field.getPseudoWeather('trickroom')) {
				this.field.addPseudoWeather('trickroom');
				this.effectData.twistedDimensionSetTR = true;
			} else {
				this.effectData.twistedDimensionSetTR = false;
			}
		},
		onEnd(pokemon) {
			// check if the user that set TR was a mon with twisted dimension and that the trick room hasn't been unset by another Pokemon using the move Trick Room
			if (this.effectData.twistedDimensionSetTR && this.field.getPseudoWeather('trickroom')) {
				// don't remove TR if another Pokemon has Twisted Dimension
				for (const target of this.getAllActive()) {
					if (target === pokemon) continue;
					if (target.hasAbility('twisteddimension')) {
						// target.abilityData.userSetTR = true;
						return;
					}
				}

				this.field.removePseudoWeather('trickroom');
			}
		},
	},
	photosynthesis: {
		name: "Photosynthesis",
		desc: "The user gains +2 to all stats in sun, and loses them when the weather ends or is changed.",
		shortDesc: "+2 to all stats while sun active.",
		onStart(pokemon) {
			if (['sunnyday', 'desolateland'].includes(this.field.getWeather().id)) {
				this.add('-activate', pokemon, 'ability: Photosynthesis');
				this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe: 2}, pokemon);
			}
		},
		// on update in case of things like cloud nine, also not sure if onanysetweather triggers if weather fades
		onUpdate(pokemon) {
			if (!pokemon.isActive || !pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				// set boosts if sun is triggered
				this.add('-activate', pokemon, 'ability: Photosynthesis');
				this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe: 2}, pokemon);
			} else {
				// unset boosts if sunny weather goes away
				this.add('-activate', pokemon, 'ability: Photosynthesis');
				this.boost({atk: -2, def: -2, spa: -2, spd: -2, spe: -2});
			}
		},
	},
	shellbreak: {
		name: "Shell Break",
		desc: "When the user uses Shell Smash, they change into their Broken form. While they are in shell form, they are immune to water.",
		shortDesc: "Transforms upon using Shell Smash, immune to water before transformation.",
		onStart(pokemon) {
			delete this.effectData.forme;
			this.effectData.shellSmashed = false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water' && !this.effectData.shellSmashed) {
				this.add('-immune', target, '[from] ability: Shell Break');
				return null;
			}
		},
		onAfterMove(source, target, move) {
			if (move.id === 'Shell Smash' && !this.effectData.shellSmashed) {
				this.add('-activate', source, 'ability: Shell Break');
				source.formeChange('Magcargo-Mega-Broken', move, false, '[msg]');
				this.effectData.shellSmashed = true;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!this.effectData.shellSmashed || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shell Break');
			}
			return false;
		},
	},
	submerge: {
		name: "Submerge",
		desc: "Upon use of a water move, the user summons an underwater terrain, doubling water moves, boosting electric moves by 1.5x, and negating fire moves. The user also has 1.2x speed while the terrain is active.",
		shortDesc: "Summons water terrain on water move use, doubles water moves, 1.5x to electric moves, fire moves fail, user has 1.2x speed.",
		onModifySpe(spe, pokemon) {
			if (this.field.getTerrain().id === 'submerge') {
				return this.chainModify(1.2);
			}
		},
		onAfterMove(source, target, move) {
			if (move.type === 'Water' && this.field.getTerrain().id !== 'submerge') {
				this.add('-activate', source, 'ability: Submerge');
				this.field.setTerrain('submerge');
			}
		},
		onEnd(pokemon) {
			if (this.field.getTerrain().id === 'submerge') {
				this.field.clearTerrain();
			}
		},
	},
	lostgift: {
		name: "Lost Gift",
		desc: "Upon switchin, the user restores its teammates lost items.",
		shortDesc: "User's team regains lost held items on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Lost Gift');
			for (const teammate of pokemon.side.pokemon) {
				if (!teammate.hasItem && teammate.set.item) {
					teammate.setItem(teammate.set.item);
					this.add('-item', teammate, teammate.item, '[from] ability: Lost Gift');
				}
			}
		},
	},
	forgedsteel: {
		name: "Forged Steel",
		desc: "The user is immune to fire type moves.",
		shortDesc: "User immune to fire moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Forged Steel');
				return null;
			}
		},
	},
	sublimeaura: {
		name: "Sublime Aura",
		desc: "Upon switchin, the user clears the stat changes of the opposing side.",
		shortDesc: "Clears opposing stat changes on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Sublime Aura');
			for (const mon of pokemon.side.foe.active) {
				this.add('-clearboosts', mon);
				mon.clearBoosts();
			}
		},
	},
	plantation: {
		name: "Plantation",
		desc: "If the user is below 50% health at the end of the turn, the user restores 25% of its max HP.",
		shortDesc: "User restores 25% max HP at end of turn if below 50%",
		onResidual(target) {
			if (target.hp < (Math.floor(target.hp / 2))) {
				this.heal(target.baseMaxhp / 4);
			}
		},
	},
	fortissimo: {
		name: "Fortissimo",
		desc: "After the target is hit by the user's attacks twice, they are forced to switch out. Soundproof Pokemon are not affected.",
		shortDesc: "Target switches out after hit twice by user. Soundproof Pokemon not affected.",
		onBeforeMove(source, target, move) {
			if (target.ability !== 'soundproof') {
				if (target === this.effectData.currentTarget) {
					if (this.effectData.hitsOnTarget >= 2) {
						move.forceSwitch = true;
						this.effectData.willSwitchTarget = false;
					} else {
						this.effectData.hitsOnTarget++;
					}
				} else {
					this.effectData.currentTarget = target;
					this.effectData.hitsOnTarget = 1;
				}
			}
		},
		onAfterMove(source, target, move) {
			this.effectData.hitsOnTarget++;

			if (this.effectData.willSwitchTarget) {
				this.add('-activate', source, 'ability: Fortissimo');
				this.effectData.hitsOnTarget = 0;
				this.effectData.currentTarget = null;
				this.effectData.willSwitchTarget = false;
			}
		},
	},
	solareclipse: {
		name: "Solar Eclipse",
		desc: "The user gains +1 in attack and special attack on switchin.",
		shortDesc: "+1 in attack and special attack on switchin.",
		onStart(pokemon) {
			this.boost({atk: 1, spa: 1}, pokemon);
		},
	},
	lunareclipse: {
		name: "Lunar Eclipse",
		desc: "The user gains +1 in defense and special defense on switchin.",
		shortDesc: "+1 in defense and special defense on switchin.",
		onStart(pokemon) {
			this.boost({def: 1, spd: 1}, pokemon);
		},
	},
	dollhouse: {
		name: "Dollhouse",
		desc: "On switchin, the user puts in a substitute.",
		shortDesc: "Substitutes on switchin",
		onStart(pokemon) {
			// check for substitute already as it may be baton passed to mega bannette
			if (pokemon.maxhp > pokemon.hp / 4 && !pokemon.volatiles['substitute']) {
				this.add('-activate', pokemon, 'ability: Dollhouse');
				this.directDamage(pokemon.maxhp / 4, pokemon);
				pokemon.addVolatile('substitute');
			} else {
				if (!pokemon.volatiles['substitute']) {
					this.add('-fail', pokemon, 'ability: Dollhouse', '[weak]');
				} else {
					this.add('-fail', pokemon, 'ability: Dollhouse');
				}
			}
		},
	},
	waterscales: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Water Scales",
	},
	prevision: {
		name: "Prevision",
		desc: "Upon switchin, the user uses Future Sight on the opposing side.",
		shortDesc: "Future Sight for opposing side on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Prevision');
			let success = false;
			for (const target of pokemon.side.foe.active) {
				if (target.side.addSlotCondition(target, 'futuremove')) {
					Object.assign(target.side.slotConditions[target.position]['futuremove'], {
						duration: 3,
						move: 'futuresight',
						source: pokemon,
						moveData: {
							id: 'futuresight',
							name: "Future Sight",
							accuracy: 100,
							basePower: 120,
							category: "Special",
							priority: 0,
							flags: {},
							ignoreImmunity: false,
							effectType: 'Move',
							isFutureMove: true,
							type: 'Psychic',
						},
					});
					success = true;
				}
			}

			if (success) {
				this.add('-start', pokemon, 'move: Future Sight');
			}
		},
	},
	crescendo: {
		name: "Crescendo",
		desc: "Power of sound based moves increases when used in a row, maxing at a 3x boost after 5 uses.",
		shortDesc: "Sound based moves increased on successive uses, maxes at 3x boost after 5",
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				return this.chainModify(1 + (this.effectData.uses * 0.4));
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				this.effectData.uses++;
			} else {
				this.effectData.uses = 0;
			}
		},
	},
	leafhurricane: {
		name: "Leaf Hurricane",
		desc: "The user traps opposing Grass types.",
		shortDesc: "Traps opposing Grass types.",
		onFoeTrapPokemon(pokemon) {
			if ((pokemon.hasType('Grass')) && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || (pokemon.hasType('Grass'))) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	toxify: {
		name: "Toxify",
		desc: "The user's attacks do twice the damage against poisoned targets.",
		shortDesc: "User's attacks do 2x against poisoned targets.",
		onBasePower(basePower, source, target) {
			if (target.status === 'psn') {
				return this.chainModify(2);
			}
		},
	},
	firstborn: {
		name: "First Born",
		desc: "The user summons an Aqua Ring for itself and is protected from status.",
		shortDesc: "User summons Aqua Ring for itself and is protected from status.",
		onStart(pokemon) {
			pokemon.addVolatile('aquaring');
		},
		onSetStatus(status, target, source, effect) {
			if (status) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: First Born');
			}
			return false;
		},
	},
	childofthesea: {
		name: "Child of the Sea",
		desc: "Opposing water type attacks will always fail.",
		shortDesc: "Opposing water type attacks always fail.",
		onBeforeMove(source, target, move) {
			if (move.type === 'Water' && source.side !== target.side) {
				this.add('cant', source, 'ability: Child of the Sea', move);
				return false;
			}
		},
	},
	riposte: {
		name: "Riposte",
		desc: "Boosts cutting and Spear moves.",
		shortDesc: "Boosts cutting and Spear moves.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (['behemothblade', 'leafblade', 'solarblade', 'sacredsword', 'secretsword',
			  'iciclespear', 'razorshell', 'cut', 'xscissor', 'megahorn', 'airslash', 'aerialace',
			  'furycutter', 'nightslash', 'slash', 'smartstrike', 'razorleaf', 'psychocut', 'glaciallance'].includes(move.id)) {
				this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (['behemothblade', 'leafblade', 'solarblade', 'sacredsword', 'secretsword',
			  'iciclespear', 'razorshell', 'cut', 'xscissor', 'megahorn', 'airslash', 'aerialace',
			  'furycutter', 'nightslash', 'slash', 'smartstrike', 'razorleaf', 'psychocut', 'glaciallance'].includes(move.id)) {
				this.chainModify(1.5);
			}
		},
	},
	dreamworld: {
		name: "Dream World",
		desc: "While user is in, has 30% chance to put an opposing Pokemon to sleep at the end of each turn. Lasts 5 turns.",
		shortDesc: "User has 30% chance to sleep adjacing opposing Pokemon at end of each turn while in.",
		onResidual(pokemon, target, effect) {
			for (const mon of target.side.active) {
				const rand = this.random(10);
				// 0, 1 and 2 = 30%
				if (rand <= 2) {
					// TODO: does this respect sleep clause?
					if (mon.trySetStatus('sleep')) {
						this.add('-activate', pokemon, 'move: Dream World');
					}
				}
			}
		},
	},
	echolocation: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('Echolocation - enhancing accuracy');
			return this.chainModify([0x14CD, 0x1000]);
		},
		name: "Echolocation",
		rating: 3,
	},
	withered: {
		name: "Withered",
		desc: "The user's attacks are boosted by 1.3x, but takes 1/10 of the user's max HP in damage after every attack.",
		shortDesc: "1.3x boost to attack but takes 1/10 max hp after every attack.",
		// basically life orb
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source);
			}
		},
	},
	upbeat: {
		name: "Upbeat",
		desc: "The user's speed is boosted one stage when they use a status move.",
		shortDesc: "+1 to speed on status move used.",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Status') {
				this.add('-activate', source, 'ability: Upbeat');
				this.boost({spe: 1}, source);
			}
		},
	},
	freegan: {
		name: "Freegan",
		desc: "The user absorbs and is healed by Poison type moves.",
		shortDesc: "Absorbs and is healed by Poison type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Freegan');
				}
				return null;
			}
		},
	},
	migration: {
		name: "Migration",
		desc: "The user's speed is doubled in Sun, Rain and Hail",
		shortDesc: "User speed doubled in Sun, Rain and Hail.",
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea', 'sunnyday', 'desolateland', 'hail'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
	},
	mindsweep: {
		name: "Mind Sweep",
		desc: "The user clears the terrain of hazards, weather, terrain, Tailwind, Trick Room, Magic Room, Wonder Room, Gravity, Screens, Aurora Veil, and Safeguard on entry.",
		shortDesc: "Clears the terrain of hazards, weather, terrain, tailwind and other conditions on entry.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Mind Sweep');
			this.field.clearWeather();
			this.field.clearTerrain();
			this.field.removePseudoWeather('tailwind');
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('gravity');
			this.field.removePseudoWeather('wonderroom');
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];

			for (const target of removeTarget) {
				pokemon.side.removeSideCondition(target);
				pokemon.side.foe.removeSideCondition(target);
			}
		},
	},
	continentaldrift: {
		name: "Continental Drift",
		desc: "The user's ground type moves are doubled in power.",
		shortDesc: "Ground moves doubled in power.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Continental Drift boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Continental Drift boost');
				return this.chainModify(2);
			}
		},
	},
	heavenlystyle: {
		name: "Heavenly Style",
		desc: "The user becomes the same type as the move it is about to use.",
		shortDesc: "Changes type to move being used before attack.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Heavenly Style');
			}
		},
	},
	lastorder: {
		name: "Last Order",
		desc: "Boosts the power and effects of Order moves (Attack Order, Defend Order and Heal Order).",
		shortDesc: "Boosts the power and effects of Order moves.",
		onBasePower(basePower, source, target, move) {
			if (move.id === 'lastorder') {
				move.basePower = 120;
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.id === 'defendorder') {
				move.boosts = {def: 2, spd: 2};
			} else if (move.id === 'healorder') {
				move.heal = [3, 4];
			}
		},
	},
	stinger: {
		name: "Stinger",
		desc: "The user's attacks attach Rose Petals to the opponent, which do 1/8th the target's max HP per turn.",
		shortDesc: "Attacks apply Rose Petals which do 1/8th max HP at end of every turn.",
		onAfterMoveSecondary(target, source, move) {
			if (move.category !== 'Status' && !target.getVolatile('rosepetals')) {
				this.add('-activate', source, 'ability: Stinger');
				target.addVolatile('rosepetals');
			}
		},
	},
	lifeguard: {
		name: "Lifeguard",
		desc: "The user's defense and special defense are doubled.",
		shortDesc: "User's def and spdef doubled.",
		onModifyDefPriority: 5,
		onModifyDef(def, target, source, move) {
			return this.chainModify(2);
		},
		onModifySpDPriority: 5,
		onModifySpD(def, target, source, move) {
			return this.chainModify(2);
		},
	},
	witchcraft: {
		name: "Witchcraft",
		desc: "Below 1/3 health, once per battle, the user will heal between 33% and 100% of their health.",
		shortDesc: "Heals between 33% and 100% below 1/3 HP once per battle.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 3) {
				this.add('-activate', pokemon, 'ability: Witchcraft');
				const heal = this.random(67);
				this.heal(((pokemon.maxhp / 100) * (heal + 33)));
			}
		},
	},
	glockenspiel: {
		name: "Glockenspiel",
		desc: "Upon switchin, the user heals its teammates of all status.",
		shortDesc: "Team healed of status on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Glockenspiel');
			const side = pokemon.side;
			for (const ally of side.pokemon) {
				if (ally !== pokemon && ally.hasAbility('soundproof')) continue;
				ally.cureStatus();
			}
		},
	},
	malicioussoul: {
		name: "Malicious Soul",
		desc: "User's move power doubled on resisted hits.",
		shortDesc: "User move power doubled on resisted hits.",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Malicious Soul boost');
				return this.chainModify(2);
			}
		},
	},
	remorseless: {
		name: "Remorseless",
		desc: "Upon fainting a Pokemon, the user sets a layer of toxic spikes. If the target is poisoned, this Pokemon's attacks will always crit.",
		shortDesc: "Sets toxic spikes on fainting target, guaranteed crit against poisoned Pokemon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				for (let i = 0; i < length; i++) {
					target.side.addSideCondition('toxicspikes');
				}
			}
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
	},
	flashpoint: {
		name: "Flash Point",
		desc: "Solar Beam and Solar Blade do not take a turn to charge.",
		shortDesc: "No charge for Solar Beam and Solar Blade.",
		// Implemented in Solar Beam and Solar Blade overrides
	},
};
