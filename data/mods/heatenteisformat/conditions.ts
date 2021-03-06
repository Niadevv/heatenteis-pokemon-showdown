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
	deltastream: {
		inherit: true,
		// mareanie why
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Flying') {
				this.debug('Delta Stream flying boost');
				return this.chainModify(1.5);
			}
		},
	},
	windstorm: {
		name: 'WindStorm',
		effectType: 'Weather',
		duration: 5,
		onEffectivenessPriority: -1,
		durationCallback(source, effect) {
			if (source?.hasItem('galestone')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Flying') {
				this.debug('Delta Stream flying boost');
				return this.chainModify(1.5);
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-activate', '', 'windstorm');
				return 0;
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'WindStorm', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'WindStorm');
			}
		},
		onResidualOrder: 1,
		onResidual() {
			this.add('-weather', 'WindStorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		inherit: true,
		onModifyDefPriority: 10,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('hail')) {
				return this.modify(def, 1.5);
			}
		},
	},
	rosepetals: {
		name: "Rose Petals",
		duration: 0,
		onStart(target, source, effect) {
			this.add('-start', target, 'Rose Petals');
		},
		onResidual(target, source, effect) {
			if (target.ability !== 'magicguard') {
				this.damage(target.maxhp / 8, target);
			}
		},
		onBeforeSwitchOut(target) {
			target.removeVolatile('rosepetals');
			this.add('-end', target, 'Rose Petals');
		},
	},
	// side condition
	// hacky and bad but there's weirdness the more intuitive way
	lostgift: {
		name: "Lost Gift",
		duration: 0,
		onStart(target, source, effect) {
			this.effectData.lostgiftOrigin = source;
			// only restore the items of Pokemon who were itemless when the effect begins
			this.effectData.lostgiftToRestore = [];
			for (const teammate of source.side.pokemon) {
				if (!teammate.fainted && !teammate.item && teammate.set.item) {
					this.effectData.lostgiftToRestore.push(teammate);
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (pokemon && pokemon.side === this.effectData.lostgiftOrigin.side && !pokemon.item && pokemon.set.item &&
				this.effectData.lostgiftToRestore.includes(pokemon)) {
				this.add('-activate', this.effectData.lostgiftOrigin, 'ability: Lost Gift');
				const itemToRestore = this.dex.getItem(pokemon.set.item);
				pokemon.setItem(itemToRestore);
				this.add('-message', pokemon.name + "'s " + itemToRestore.name + " was returned!");
				this.add('-item', pokemon, itemToRestore);
				this.effectData.lostgiftToRestore = this.effectData.lostgiftToRestore.filter((mon: Pokemon) => mon !== pokemon);
			}
		},
		onUpdate(pokemon) {
			// eslint-disable-next-line max-len
			this.effectData.lostgiftToRestore = this.effectData.lostgiftToRestore.filter((mon: Pokemon) => !mon.fainted && !mon.item);
			if (this.effectData.lostgiftToRestore.length < 1) this.effectData.lostgiftOrigin.side.removeSideCondition('lostgift');
		},
	},
};
