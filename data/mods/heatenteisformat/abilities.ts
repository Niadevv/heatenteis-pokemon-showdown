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
	spacialbarrier: {
		desc: "While active, this Pokemon is immune to status and OHKO moves.",
		shortDesc: "While active, this Pokemon is immune to status and OHKO moves.",
		name: "Spacial Barrier",
		isNonstandard: "Custom",
		rating: 4,
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
		isNonstandard: "Custom",
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		// in case steel typing removed
		onDamage(damage, target, source, effect) {
			if (effect.id === 'tox') {
				// keep toxic timer at 6%, refer to conditions.ts
				this.effectData.stage = 1;
				// but still take damage
				return true;
			}
		},
		// set rollout and iceball accumlation back so it never goes up
		onDamagingHit(damage, target, source, move) {
			if (move.id === "rollout") {
				source.volatiles['rollout'].hitCount -= 1;
			} else if (move.id === "iceball") {
				source.volatiles['iceball'].hitCount -= 1;
			}
		},
		// TODO: Make able to move when asleep
	},
};
