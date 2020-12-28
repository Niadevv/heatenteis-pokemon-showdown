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
	// New abilities
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

					// check if the user's side has webs befor boosting
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
};
