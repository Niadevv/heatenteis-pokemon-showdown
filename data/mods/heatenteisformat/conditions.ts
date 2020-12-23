export const Conditions: {[k: string]: ModdedConditionData} = {
	tox: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
			if (source.ability === 'neurotoxin') {
				this.effectData.neurotoxin = true;
			} else {
				this.effectData.neurotoxin = false;
			}
		},
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / (!this.effectData.neurotoxin ? 16 : 8), 1) * this.effectData.stage);
		},
	},
	psn: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}

			if (source.ability === 'neurotoxin') {
				this.effectData.neurotoxin = true;
			} else {
				this.effectData.neurotoxin = false;
			}
		},
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / (!this.effectData.neurotoxin ? 8 : 4));
		},
	},
	par: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('quickfeet')) {
				return this.chainModify(0.25);
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			// No more getting parad thank you
		},
	},
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
			this.effectData.turns = 0;
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			this.effectData.turns += 1;
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5) || this.effectData.turns >= 5) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
	},
};