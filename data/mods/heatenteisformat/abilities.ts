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
			// if (status) return;
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
			// onStart is triggered again upon mega evolving into Mega Blaziken, so we add a volatile to track when the speed boost is applied
			if (pokemon && !pokemon.volatiles['speedboost']) {
				this.boost({spe: 1}, pokemon);
				pokemon.addVolatile('speedboost');
			}
		},
		onSwitchOut(pokemon) {
			// delete the volatile on switchout so that speed boost triggers when mega blaziken comes back in
			delete pokemon.volatiles['speedboost'];
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
		onBasePower(basePower, source, target, move) {
			if ((move.type === 'Fire' && source.effectiveWeather() === 'desolateland') ||
			  (move.type === 'Water' && source.effectiveWeather() === 'primordialsea') ||
			  (move.type === 'Flying' && source.effectiveWeather() === 'deltastream')) {
				return this.chainModify(1.8);
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
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (this.effectData.busted || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.transformed || this.effectData.busted) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectData.busted && !this.effectData.hasTakenDisguiseBustDamage) {
				if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectData.busted) {
					const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
					pokemon.formeChange(speciesid, this.effect, true);
				}
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(pokemon.species.name));
				this.effectData.hasTakenDisguiseBustDamage = true;
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
	// reimplement slow start purely as an ability
	slowstart: {
		inherit: true,
		onStart(pokemon) {
			if (!this.effectData.slowstartBegun) {
				this.effectData.slowstartTurnsLeft = 3;
				this.effectData.slowstartBegun = true;
			}
			if (this.effectData.slowstartTurnsLeft > 0) {
				// keep adding the volatile as while it's useless now, it is important to preserve the visual effect
				pokemon.addVolatile('slowstart');
				this.add('-start', pokemon, 'ability: Slow Start');
			} else {
				this.add('-end', pokemon, 'Slow Start');
			}
			// onUpdate triggers before onStart for some reason, so we don't enable it until after the volatile is added.
			this.effectData.initialisedSlowstart = true;
		},
		onUpdate(pokemon) {
			// eliminate slow start effect if a neutralising gas mon is present
			if (!pokemon.volatiles['slowstart'] && this.effectData.initialisedSlowstart && this.effectData.slowstartTurnsLeft > 0) {
				this.effectData.slowstartTurnsLeft = 0;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (this.effectData.slowstartTurnsLeft > 0) return this.chainModify(0.5);
		},
		onModifySpe(spe, pokemon) {
			if (this.effectData.slowstartTurnsLeft > 0) return this.chainModify(0.5);
		},
		onResidual(target, source, effect) {
			if (target.activeTurns && this.effectData.slowstartTurnsLeft > 0) {
				this.effectData.slowstartTurnsLeft--;
				if (this.effectData.slowstartTurnsLeft <= 0) {
					this.add('-end', target, 'Slow Start');
					target.removeVolatile('slowstart');
				}
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Slow Start', '[silent]');
			// de initialise this so that onUpdate doesn't reset the counter to 0 when we switch back in (ie. before the volatile is added)
			this.effectData.initialisedSlowstart = false;
		},
		condition: {},
	},
	// Shield Dust is implemented in the overriden hazard moves
	wonderguard: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-activate', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
	},
	rivalry: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
	},
	steamengine: {
		inherit: true,
		// merge logic with onTryHit, remove onDamagingHit behaviour
		onDamagingHit(damage, target, source, move) {
		},
		onTryHit(target, source, move) {
			if (target !== source && ['Water', 'Fire'].includes(move.type)) {
				this.add('-immune', target, '[from] ability: Steam Engine');
				this.boost({spe: 6});
				return null;
			}
		},
	},
	symbiosis: {
		inherit: true,
		onResidual(pokemon, source, effect) {
			const item = this.dex.getItem(pokemon.lastItem);
			// mfw no item.consumable value
			if (pokemon.hp && !pokemon.item && (item.isBerry || item.isGem || ['focussash', 'mentalherb', 'whiteherb',
			  'absorbbulb', 'adrenalineorb', 'berryjuice', 'blunderpolicy', 'cellbattery', 'ejectbutton', 'ejectpack',
			  'electricseed', 'grassyseed', 'mistyseed', 'psychicseed', 'luminousmoss', 'redcard', 'roomservice',
			  'snowball', 'throatspray', 'weaknesspolicy'].includes(item.id))) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Symbiosis');
			}
		},
	},
	receiver: {
		inherit: true,
		onSourceAfterFaint(fainted, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.setAbility(target.ability, target);
				this.add('-ability', source, this.dex.getAbility(target.ability), '[from]ability: Receiver');
			}
		},
	},
	shieldsdown: {
		inherit: true,
		onAfterMove(source, target, move) {
			if (move.id === 'shellsmash' && !this.effectData.shellSmashed) {
				this.add('-activate', source, 'ability: Shields Down');
				source.formeChange('Minior', move, false, '[msg]');
				this.effectData.shellSmashed = true;
			}
		},
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2 && !this.effectData.shellSmashed) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
	},
	powerspot: {
		inherit: true,
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker !== defender) {
				this.debug('Power Spot boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	parentalbond: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit || move.damage) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
	},
	victorystar: {
		inherit: true,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (source.side === this.effectData.target.side && typeof accuracy === 'number') {
				return this.chainModify(1.2);
			}
		},
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id) && source.ability !== 'bulletproof') {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
			} else {
				this.add('-immune', source, '[from] ability: Bulletproof');
			}
			target.formeChange('cramorant', move);
		},
	},
	// make sleep and freeze trigger synchro
	synchronize: {
		inherit: true,
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, {status: status.id, id: 'synchronize'} as Effect);
		},
	},
	imposter: {
		inherit: true,
		onStart(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectData.switchingIn) return;
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, this.dex.getAbility('imposter'));
				if (['distortion', 'origin'].includes(target.ability) && !target.volatiles['substitute'] &&
				  !target.illusion && !target.fainted) {
					const boosts = target.boosts;
					this.add('-activate', target, 'ability: Distortion');
					// invert the ditto's boosts
					// +1 + (-1 * 2) = -1, 0 + (0 * 2) = 0, -1 + (+1 * 2) = 1, +2 + (-2 * 2) = -2, etc.
					this.boost({atk: -boosts.atk * 2, def: -boosts.def * 2, spa: -boosts.spa * 2, spd: -boosts.spd * 2,
						spe: -boosts.spe * 2, evasion: -boosts.evasion * 2, accuracy: -boosts.accuracy * 2}, pokemon);
				}
			}
			this.effectData.switchingIn = false;
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
			// if (status) return;
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
			this.add('-activate', pokemon, 'ability: Distortion');
			this.field.addPseudoWeather('gravity');
		},
		onUpdate(pokemon) {
			for (const mon of pokemon.side.foe.active) {
				if (['focussash', 'mentalherb', 'whiteherb',
				  'absorbbulb', 'adrenalineorb', 'berryjuice', 'blunderpolicy', 'cellbattery', 'ejectbutton', 'ejectpack',
				  'electricseed', 'grassyseed', 'mistyseed', 'psychicseed', 'luminousmoss', 'redcard', 'roomservice',
				  'snowball', 'throatspray', 'weaknesspolicy', 'leftovers'].includes(mon.item) || mon.getItem().isGem) {
					mon.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			for (const mon of pokemon.side.foe.active) {
				if (mon.volatiles['embargo']) {
					delete mon.volatiles['embargo'];
					this.add('-end', mon, 'Embargo');
				}
			}
		},
	},
	origin: {
		name: "Origin",
		desc: "The user possesses Spacial Barrier, Temporal Barrier, Distortion, and Multitype, while Judgement becomes 200 BP and all of its moves gain STAB. Repent mortals.",
		shortDesc: "User has Spacial Barrier, Temporal Barrier, Distortion, Multitype. Judgement is 200 BP, all moves have STAB bonus.",
		isPermanent: true,
		// Temporal barrier
		onUpdate(pokemon) {
			if (pokemon.status) {
				this.add('-activate', pokemon, 'ability: Spacial Barrier');
				pokemon.cureStatus();
			}
			for (const mon of pokemon.side.foe.active) {
				if (['focussash', 'mentalherb', 'whiteherb',
				  'absorbbulb', 'adrenalineorb', 'berryjuice', 'blunderpolicy', 'cellbattery', 'ejectbutton', 'ejectpack',
				  'electricseed', 'grassyseed', 'mistyseed', 'psychicseed', 'luminousmoss', 'redcard', 'roomservice',
				  'snowball', 'throatspray', 'weaknesspolicy', 'leftovers'].includes(mon.item) || mon.getItem().isGem) {
					mon.addVolatile('embargo');
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			// if (status) return;
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
			this.add('-activate', pokemon, 'ability: Distortion');
			this.field.addPseudoWeather('gravity');
		},
		// onUpdate in the Spacial Barrier section

		// Multitype
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'origin') return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'origin') {
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
			if (!source.getTypes().includes(move.type)) {
				this.chainModify(1.5);
			}
		},

		onEnd(pokemon) {
			for (const mon of pokemon.side.foe.active) {
				if (mon.volatiles['embargo']) {
					delete mon.volatiles['embargo'];
					this.add('-end', mon, 'Embargo');
				}
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
		// we redefine toxic and poison to make this work. hacky I know but there's no way to conditionally set status in a way that means it's not blocked by sheer force FUTUREDEV: tf you mean by it'd be blocked by sheer force bro you can't have two abilities at once
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
			if (move.category === 'Status' || move.selfdestruct || move.multihit || move.damage) return;
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
				this.add('-anim', pokemon, 'Wish');
				this.effectData.starCount = 6;
				this.effectData.user = pokemon;
				this.boost({atk: 6}, pokemon);
			} else {
				this.add('-message', pokemon.name + '\'s Starlight is blocked by the weather!');
			}
		},
		onAnySetWeather(target, source, weather) {
			// clear boosts on weather set
			if (this.effectData.starCount > 0) {
				this.debug("Clearing boosts from weather");
				this.add('-message', "The stars are blocked by the weather! The stars are no longer shining!");
				this.boost({atk: -this.effectData.starCount}, this.effectData.user);
				this.effectData.starCount = 0;
			}
		},
		onResidual(pokemon) {
			// Only decrease if the user was in for a full turn
			if (pokemon.activeTurns && this.effectData.starCount > 0) {
				this.add('-message', "One of " + pokemon.name + "'s stars faded!");
				this.boost({atk: -1}, pokemon);
				this.effectData.starCount -= 1;
			}
		},
		// Remove star power before baton pass for the sake of AG's sanity and lore
		onBeforeMove(source, target, move) {
			if (move.id === 'batonpass') {
				this.boost({atk: -this.effectData.starCount}, this.effectData.user);
			}
		},
		rating: 4.5,
	},
	stickymadness: {
		name: "Sticky Madness",
		desc: "If hit with a contact move, the user will set webs on the opponents' side and lower their speed by 1. Additionally, if webs are set, it gains +2 attack and +1 speed. If webs are up on the user's side, it gains an additional +1 in speed.",
		shortDesc: "Sets webs on opponent's side and lowers attacker's speed by 1 on contact, +2 attack and +1 speed in webs (+2 spe if on user's side).",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-activate', target, 'ability: Sticky Madness');
				if (!source.side.getSideCondition('stickyweb') && !(source.side === target.side)) {
					source.side.addSideCondition('stickyweb');
					// check if the user's side has webs before boosting
					if (!target.side.getSideCondition('stickyweb') && !target.volatiles['stickymadness']) {
						this.boost({atk: 2, spe: 1}, target);
					}
				}
				this.add('-ability', target, 'ability: Sticky Madness');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		onStart(pokemon) {
			if (!pokemon.volatiles['stickymadness']) {
				let boost = undefined;
				if (pokemon.side.foe.getSideCondition('stickyweb')) {
					boost = {atk: 2, spe: 1};
				}
				if (pokemon.side.getSideCondition('stickyweb')) {
					boost = {atk: 2, spe: 2};
				}

				if (boost) {
					this.add('-activate', pokemon, 'ability: Sticky Madness');
					this.boost(boost, pokemon);
					pokemon.addVolatile('stickymadness');
				}
			}
		},
		onSwitchOut(pokemon) {
			delete pokemon.volatiles['stickymadness'];
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
				this.add('-activate', pokemon, 'ability: Twisted Dimension');
				this.field.addPseudoWeather('trickroom');
			}
		},
	},
	photosynthesis: {
		name: "Photosynthesis",
		desc: "The user gains +2 to all stats in sun, and loses them when the weather ends or is changed.",
		shortDesc: "+2 to all stats while sun active.",
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				this.chainModify(2);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spa, source, target, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				this.chainModify(2);
			}
		},
		onModifySpe(spe, source) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				this.chainModify(2);
			}
		},
	},
	shellbreak: {
		name: "Shell Break",
		desc: "When the user uses Shell Smash, they change into their Broken form. While they are in shell form, they are immune to water.",
		shortDesc: "Transforms upon using Shell Smash, immune to water before transformation.",
		isPermanent: true,
		isUnbreakable: true,
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
			if (move.id === 'shellsmash' && !this.effectData.shellSmashed) {
				this.add('-activate', source, 'ability: Shell Break');
				source.formeChange('Magcargo-Mega-Shellless', move, false, '[msg]');
				this.effectData.shellSmashed = true;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (this.effectData.shellSmashed || target.transformed) return;
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
			if (pokemon.side.active.length > 1) {
				for (const partner of pokemon.side.active) {
					if (partner !== pokemon && !partner.fainted && !partner.item && partner.set.item) {
						const itemToRestore = this.dex.getItem(partner.set.item);
						partner.setItem(itemToRestore);
						this.add('-item', partner, itemToRestore, '[from] ability: Lost Gift');
					}
				}
			}
			if (pokemon.side.sideConditions['lostgift']) pokemon.side.removeSideCondition('lostgift');
			pokemon.side.addSideCondition('lostgift');
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
				mon.clearBoosts();
				this.add('-clearboost', mon);
			}
		},
	},
	plantation: {
		name: "Plantation",
		desc: "If the user is below 50% health at the end of the turn, the user restores 25% of its max HP.",
		shortDesc: "User restores 25% max HP at end of turn if below 50%",
		onResidual(target) {
			if (target.hp < (Math.floor(target.maxhp / 2))) {
				this.add('-activate', target, 'ability: Plantation');
				this.heal(target.baseMaxhp / 4);
			}
		},
	},
	fortissimo: {
		name: "Fortissimo",
		desc: "After the target is hit by the user's attacks twice, they are forced to switch out. Soundproof Pokemon are not affected.",
		shortDesc: "Target switches out after hit twice by user. Soundproof Pokemon not affected.",
		onBeforeMove(source, target, move) {
			if (target.ability !== 'soundproof' && target.volatiles['fortissimo'] && move.category !== 'Status') {
				move.forceSwitch = true;
				delete target.volatiles['fortissimo'];
			}
		},
		onAfterMove(source, target, move) {
			if (move.forceSwitch && move.category !== 'Status') {
				this.add('-message', target.name + " couldn't stand the noise and switched out!");
			}
			if (target && target.ability !== 'soundproof') target.addVolatile('fortissimo');
		},
	},
	solareclipse: {
		name: "Solar Eclipse",
		desc: "The user gains +1 in attack and special attack on switchin.",
		shortDesc: "+1 in attack and special attack on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Solar Eclipse');
			this.boost({atk: 1, spa: 1}, pokemon);
		},
	},
	lunareclipse: {
		name: "Lunar Eclipse",
		desc: "The user gains +1 in defense and special defense on switchin.",
		shortDesc: "+1 in defense and special defense on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Lunar Eclipse');
			this.boost({def: 1, spd: 1}, pokemon);
		},
	},
	dollhouse: {
		name: "Dollhouse",
		desc: "On switchin, the user puts in a substitute. If the Substitute is unbroken, it will reuse the same Substitute net time.",
		shortDesc: "Substitutes on switchin. Reuses unbroken Substitutes.",
		onStart(pokemon) {
			// check for substitute already as it may be baton passed to mega bannette
			if (pokemon.hp > pokemon.maxhp / 4 && !pokemon.volatiles['substitute']) {
				this.add('-activate', pokemon, 'ability: Dollhouse');
				// if the user didn't use up their last sub or had another sub setup, don't cut the HP.
				if (!this.effectData.dollhouseSubstituteIntact) this.directDamage(pokemon.maxhp / 4, pokemon);
				pokemon.addVolatile('substitute');
				if (this.effectData.dollhouseSubstituteIntact) {
					// set the new sub's HP to be equal to the old sub's HP
					pokemon.volatiles['substitute'].hp = this.effectData.dollhouseSubstituteHP;
				}
			} else {
				if (!pokemon.volatiles['substitute']) {
					this.add('-fail', pokemon, 'ability: Dollhouse', '[weak]');
				} else {
					this.add('-fail', pokemon, 'ability: Dollhouse');
				}
			}
		},
		onSwitchOut(pokemon) {
			this.effectData.dollhouseSubstituteIntact = !!pokemon.volatiles['substitute'];
			if (this.effectData.dollhouseSubstituteIntact) {
				this.effectData.dollhouseSubstituteHP = pokemon.volatiles['substitute'].hp as number;
			} else {
				this.effectData.dollhouseSubstituteHP = 0;
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
		desc: "Upon switchin, the user uses Doom Desire on the opposing side.",
		shortDesc: "Doom Desire for opposing side on switchin.",
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Prevision');
			let success = false;
			for (const target of pokemon.side.foe.active) {
				if (target.side.addSlotCondition(target, 'futuremove')) {
					Object.assign(target.side.slotConditions[target.position]['futuremove'], {
						duration: 3,
						move: 'doomdesire',
						source: pokemon,
						moveData: {
							id: 'doomdesire',
							name: "Doom Desire",
							accuracy: 100,
							basePower: 140,
							category: "Special",
							priority: 0,
							flags: {},
							effectType: 'Move',
							isFutureMove: true,
							type: 'Steel',
						},
					});
					success = true;
				}
			}

			if (success) {
				this.add('-anim', pokemon, 'Doom Desire');
				this.add('-start', pokemon, 'Doom Desire');
			}
		},
	},
	crescendo: {
		name: "Crescendo",
		desc: "Power of sound based moves increases when used in a row, maxing at a 3x boost after 5 uses.",
		shortDesc: "Sound based moves increased on successive uses, maxes at 3x boost after 5",
		onStart(pokemon) {
			this.effectData.uses = 0;
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				const modifier = parseFloat(this.effectData.uses) * 0.4;
				return this.chainModify(1.0 + modifier);
			}
		},
		onAfterMove(target, source, move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				if (this.effectData.uses < 5) {
					this.effectData.uses++;
				}
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
		onFoeTryMove(source, target, move) {
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
		desc: "While user is in, has 30% chance to put an opposing Pokemon to sleep at the end of each turn. Only one Pokemon can be in the dream world at a time.",
		shortDesc: "User has 30% chance to sleep adjacing opposing Pokemon at end of each turn while in. Only one Pokemon can be asleep at a time.",
		onResidual(pokemon, target, effect) {
			// Check to see if a Pokemon is asleep already because violating sleep clause is cringe
			for (const mon of pokemon.side.foe.pokemon) {
				if (mon.status === 'slp') {
					this.debug("Detected slept mon for Dream World");
					return;
				}
			}
			for (const mon of pokemon.side.foe.active) {
				if (this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Dream World');
					// if the mon is immune to sleep (comatose, etc.) then skip this one
					if (!mon.runStatusImmunity('slp')) {
						continue;
					}
					if (!mon.setStatus('slp')) {
						this.add('-fail', pokemon, 'ability: Dream World');
					} else {
						return;
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
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',
			];

			const hazards = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];

			for (const target of removeTarget) {
				if (pokemon.side.removeSideCondition(target) && hazards.includes(target)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(target).name, '[from] ability: Mind Sweep', '[of] ' + pokemon);
				}
				if (pokemon.side.foe.removeSideCondition(target) && hazards.includes(target)) {
					this.add('-sideend', pokemon.side.foe, this.dex.getEffect(target).name, '[from] ability: Mind Sweep', '[of] ' + pokemon);
				}
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
		onModifyMove(move, pokemon, target) {
			if (move.id === 'defendorder') {
				move.boosts = {def: 2, spd: 2};
			} else if (move.id === 'healorder') {
				move.heal = [3, 4];
			} else if (move.id === 'attackorder') {
				move.basePower = 120;
			}
		},
	},
	stinger: {
		name: "Stinger",
		desc: "The user's attacks attach Rose Petals to the opponent, which do 1/8th the target's max HP per turn.",
		shortDesc: "Attacks apply Rose Petals which do 1/8th max HP at end of every turn.",
		onFoeAfterMoveSecondary(target, source, move) {
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
			if (pokemon.hp <= pokemon.maxhp / 3 && !this.effectData.witchcraftTriggered) {
				this.add('-activate', pokemon, 'ability: Witchcraft');
				const heal = this.random(67);
				this.heal(((pokemon.maxhp / 100) * (heal + 33)));
				this.effectData.witchcraftTriggered = true;
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
		desc: "Upon fainting a Pokemon, the user sets a layer of toxic spikes. If the target is poisoned, this Pokemon's attacks will gain a heightened crit ratio.",
		shortDesc: "Sets toxic spikes on fainting target, +2 crit chance against poisoned foe.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				for (let i = 0; i < length; i++) {
					this.add('-anim', source, 'Toxic Spikes');
					target.side.addSideCondition('toxicspikes');
				}
			}
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return critRatio + 2;
		},
	},
	flashpoint: {
		name: "Flash Point",
		desc: "Solar Beam and Solar Blade do not take a turn to charge.",
		shortDesc: "No charge for Solar Beam and Solar Blade.",
		// Implemented in Solar Beam and Solar Blade overrides
	},
	chemicalreaction: {
		name: "Chemical Reaction",
		desc: "The user's attacks have a 30% chance to badly poison the target. The user also gains a Poison resistance.",
		shortDesc: "30% chance to badly poison target, gains Poison resistance.",
		onModifyMove(move) {
			if (!move || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('chemicalreaction'),
			});
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Chemical Reaction weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Chemical Reaction weaken');
				return this.chainModify(0.5);
			}
		},
	},
	armyofone: {
		name: "Army of One",
		desc: "The user starts with +2 in Defense, until their HP drops below half, at which point they lose the +2 in Defense and gain +2 in Attack instead.",
		shortDesc: "User starts with +2 Defense until HP goes below half, then loses Defense boost and gain +2 Attack instead.",
		onStart(pokemon) {
			this.effectData.armyofoneAttackBoosts = false;
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.boost({atk: 2}, pokemon);
				this.effectData.armyofoneAttackBoosts = true;
			} else {
				this.boost({def: 2}, pokemon);
			}
			this.effectData.startedArmyofone = true;
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && !this.effectData.armyofoneAttackBoosts && this.effectData.startedArmyofone) {
				this.boost({atk: 2, def: -2}, pokemon);
				this.effectData.armyofoneAttackBoosts = true;
			}
		},
		onEnd(pokemon) {
			this.effectData.startedArmyofone = false;
		},
	},
	fatalnock: {
		name: "Fatal Nock",
		desc: "Spirit Shackle and Sinister Shadow Raid become priority moves and gain a 1.4x boost in power.",
		shortDesc: "Spirit Shackle and Sinister Shadow Raid are priority, gain 1.4x boost in power.",
		onBasePower(basePower, source, target, move) {
			if (['spiritshackle', 'sinisterarrowraid'].includes(move.id)) {
				this.chainModify(1.4);
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move.type === 'Ghost') return priority + 1;
		},
	},
	windstorm: {
		name: "Windstorm",
		desc: "User summons Windstorm on switch in.",
		shortDesc: "User summons Windstorm on switch in.",
		onStart(pokemon) {
			this.field.setWeather('windstorm');
		},
	},
};
