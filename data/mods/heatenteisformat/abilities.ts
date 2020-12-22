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
};
