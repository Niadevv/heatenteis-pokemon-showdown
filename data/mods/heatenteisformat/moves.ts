export const Moves: {[k: string]: ModdedMoveData} = {
	iceburn: {
		inherit: true,
		flags: {mirror: 1},
		accuracy: 100,
		onTryMove(attacker, defender, move) {
			// No charging
		},
		secondary: {
			chance: 40,
			onHit(target, source) {
				if (this.randomChance(3, 4)) {
					target.trySetStatus('brn', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		breaksProtect: true,
		desc: "10% chance to freeze, 30% chance to burn. Breaks Protect.",
		shortDesc: "10% chance to freeze, 30% chance to burn. Breaks Protect.",
	},
	freezeshock: {
		inherit: true,
		flags: {mirror: 1},
		accuracy: 100,
		onTryMove(attacker, defender, move) {
			// No charging
		},
		secondary: {
			chance: 40,
			onHit(target, source) {
				if (this.randomChance(3, 4)) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		breaksProtect: true,
		desc: "10% chance to freeze, 30% chance to paralyze. Breaks Protect.",
		shortDesc: "10% chance to freeze, 30% chance to paralyze. Breaks Protect.",
	},
	boltstrike: {
		inherit: true,
		flags: {contact: 1, mirror: 1},
		accuracy: 100,
		basePower: 140,
		breaksProtect: true,
	},
	blueflare: {
		inherit: true,
		flags: {mirror: 1},
		accuracy: 100,
		basePower: 140,
		breaksProtect: true,
	},
	sunsteelstrike: {
		inherit: true,
		flags: {contact: 1, mirror: 1},
		basePower: 140,
		breaksProtect: true,
	},
	moongeistbeam: {
		inherit: true,
		flags: {mirror: 1},
		basePower: 140,
		breaksProtect: true,
	},
	roaroftime: {
		inherit: true,
		accuracy: 100,
		flags: {mirror: 1},
		self: {
			// Make empty to ensure no recharge
		},
		// apply target's status damage 3 times - if poison heal make them heal 3 times, and do not damage with status
		onHit(target, source) {
			if (target.status) {
				if (!['magicguard', 'poisonheal', 'spacialbarrier', 'temporalbarrier'].includes(target.ability) && target.status &&
				  ['tox', 'psn', 'brn', 'slp'].includes(target.status)) {
					this.add('-activate', source, 'move: Roar of Time');
					// Darkrai gets Roar of Time for some reason so we should account for that
					if (source.ability === 'baddreams' && source.status === 'slp') {
						this.add('-message', target.name + " experienced more Bad Dreams than usual due to the time distortion!");
						target.damage((target.baseMaxhp / 8) * 3);
						this.add('-damage', target, target.getHealth);
					}

					this.add('-message', target.name + "'s status condition was accelerated by the time distortion!");

					if (target.status === 'psn') {
						const neurotoxModifier = target.statusData.neurotoxin ? 2 : 1;
						target.damage(((target.baseMaxhp / 8) * neurotoxModifier) * 3);
						this.add('-damage', target, target.getHealth);
					} else if (target.status === 'tox') {
						let accumulatedDamage = 0;
						const neurotoxModifier = target.statusData.neurotoxin ? 2 : 1;

						for (let i = 0; i < 3; i++) {
							accumulatedDamage += ((target.baseMaxhp / 16) * neurotoxModifier) * target.statusData.stage;
							target.statusData.stage += 1;
						}

						target.damage(this.clampIntRange(accumulatedDamage, 1, target.baseMaxhp));
						this.add('-damage', target, target.getHealth);
					} else if (target.status === 'brn') {
						target.damage((target.baseMaxhp / 16) * 3);
						this.add('-damage', target, target.getHealth);
					}
				}
				if (target.ability === 'poisonheal') {
					this.add('-message', target.name + "'s status condition was accelerated by the time distortion!");
					this.add('-activate', source, 'move: Roar of Time');
					target.heal((target.baseMaxhp / 8) * 3);
					this.add('-heal', target, target.getHealth);
				}
			}
		},
	},
	spacialrend: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
		ignoreAbility: true,
		flags: {mirror: 1},
		breaksProtect: true,
		onTryHit(pokemon) {
			if (pokemon.runImmunity('Dragon')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		ignorePositiveDefensive: true,
	},
	originpulse: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
	},
	precipiceblades: {
		inherit: true,
		basePower: 150,
		accuracy: 100,
	},
	oblivionwing: {
		inherit: true,
		basePower: 130,
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
				atk: -1,
			},
		},
	},
	behemothblade: {
		inherit: true,
		basePower: 120,
		flags: {contact: 1, mirror: 1},
		breaksProtect: true,
	},
	behemothbash: {
		inherit: true,
		basePower: 120,
		useSourceDefensiveAsOffensive: true,
		flags: {contact: 1, mirror: 1},
		breaksProtect: true,
	},
	shadowforce: {
		inherit: true,
		basePower: 150,
		flags: {contact: 1, mirror: 1},
		condition: {

		},
		onTryMove(attacker, defender, move) {

		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
	},
	sacredfire: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
	},
	aeroblast: {
		inherit: true,
		basePower: 130,
		accuracy: 100,
		secondary: {
			chance: 40,
			volatileStatus: 'flinch',
		},
	},
	eternabeam: {
		inherit: true,
		basePower: 170,
		accuracy: 100,
		flags: {mirror: 1},
		self: {

		},
	},
	judgment: {
		inherit: true,
		basePower: 120,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	coreenforcer: {
		inherit: true,
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	dynamaxcannon: {
		inherit: true,
		basePower: 120,
		flags: {mirror: 1},
		breaksProtect: true,
		onBasePower(basePower, pokemon, target) {
			// yes, we're including dynamax in this
			if (target.maxhp >= 450 || target.baseMaxhp >= 450) {
				return this.chainModify(2);
			}
		},
	},
	lifedew: {
		inherit: true,
		heal: null,
		onHit(pokemon) {
			// Split healing in doubles otherwise heal full
			if (this.gameType === 'doubles') {
				return !!(this.heal(this.modify(pokemon.maxhp, 0.25)));
			} else {
				return !!(this.heal(this.modify(pokemon.maxhp, 0.5)));
			}
		},
	},
	junglehealing: {
		inherit: true,
		heal: null,
		onHit(pokemon) {
			let success = !!this.heal(this.modify(pokemon.maxhp, (this.gameType === 'doubles' ? 0.25 : 0.5)));
			if (this.gameType === 'doubles') {
				success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			} else {
				success = !!this.heal(this.modify(pokemon.maxhp, 0.5));
			}
			return pokemon.cureStatus() || success;
		},
	},
	floralhealing: {
		inherit: true,
		onHit(target, source) {
			// maintain doubles behaviour in doubles, make move usable in singles
			let success = false;
			if (this.format.gameType === 'singles' || !target) {
				success = !!this.heal(source.maxhp / 2, source);
			} else {
				if (this.field.isTerrain('grassyterrain')) {
					success = !!this.heal(this.modify(target.baseMaxhp, 0.667));
				} else {
					success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
				}
				if (success && target.side !== source.side) {
					target.staleness = 'external';
				}
			}
			return success;
		},
	},
	closecombat: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
	},
	fishiousrend: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				// Nerfed from 2x
				return move.basePower * 1.5;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
	},
	boltbeak: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Beak damage boost');
				// Nerfed from 2x
				return move.basePower * 1.5;
			}
			this.debug('Bolt Beak NOT boosted');
			return move.basePower;
		},
	},
	hyperspacehole: {
		inherit: true,
		basePower: 100,
		selfSwitch: true,
	},
	fly: {
		inherit: true,
		accuracy: 100,
	},
	thunderwave: {
		inherit: true,
		accuracy: 100,
	},
	bounce: {
		inherit: true,
		accuracy: 100,
	},
	blazekick: {
		inherit: true,
		accuracy: 100,
	},
	boneclub: {
		inherit: true,
		accuracy: 100,
	},
	dragonrush: {
		inherit: true,
		accuracy: 90,
	},
	// aight lads let's make darkrai absolutely cracked again
	// AG is crying rn
	darkvoid: {
		inherit: true,
		accuracy: 90,
	},
	synthesis: {
		inherit: true,
		pp: 10,
	},
	moonlight: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'windstorm':
			case 'deltastream':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	morningsun: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'windstorm':
			case 'deltastream':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	uturn: {
		inherit: true,
		basePower: 60,
	},
	voltswitch: {
		inherit: true,
		basePower: 60,
	},
	razorshell: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
	},
	shadowclaw: {
		inherit: true,
		basePower: 90,
	},
	shadowpunch: {
		inherit: true,
		basePower: 80,
	},
	// Make Hurricane always hit in Windstorm and Delta Stream
	hurricane: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
			case 'deltastream':
			case 'windstorm':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'windstorm':
			case 'deltastream':
				move.type = 'Flying';
				break;
			case 'hail':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			// I *could* rewrite this to be more efficient but I already have and I don't care because it's not being run 50 million times a second
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'windstorm':
			case 'deltastream':
			case 'hail':
				move.basePower *= 2;
				break;
			}
		},
	},
	// woot wild charge is good now
	wildcharge: {
		inherit: true,
		recoil: undefined,
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		// what's the point in defining the basePower if it's decided here? :/
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
	},
	lightthatburnsthesky: {
		inherit: true,
		basePower: 250,
	},
	solarbeam: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.ability === 'flashpoint') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	solarblade: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.ability === 'flashpoint') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	snipeshot: {
		inherit: true,
		basePower: 120,
	},
	// Overriden hazards to implement Shield Dust hazard immunity
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.ability === 'shielddust') return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.ability === 'shielddust') return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side, source) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
				this.effectData.source = source;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					if (this.effectData.source.ability === 'corrosion') {
						if (this.effectData.layers >= 2) {
							pokemon.setStatus('tox', this.effectData.source, this.dex.getAbility('corrosion'), true);
						} else {
							pokemon.setStatus('psn', this.effectData.source, this.dex.getAbility('corrosion'), true);
						}
					}
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel')) {
					if (this.effectData.source.ability === 'corrosion') {
						if (this.effectData.layers >= 2) {
							pokemon.setStatus('tox', this.effectData.source, this.dex.getAbility('corrosion'), true);
						} else {
							pokemon.setStatus('psn', this.effectData.source, this.dex.getAbility('corrosion'), true);
						}
					} else {
						return;
					}
				} else if (pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', this.effectData.source);
				} else {
					pokemon.trySetStatus('psn', this.effectData.source);
				}
			},
		},
	},
	stickyweb: {
		inherit: true,
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.ability === 'shielddust') return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectData.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	// end hazard modification
	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
				if (move.type === 'Fairy' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					// magic bullshit numbers idk, electric terrain uses it so I'm using it. equals 5325 / 4096 = 1.300048828125
					// guessing this is what the real games use?
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	razorwind: {
		inherit: true,
		basePower: 130,
		category: "Physical",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	geargrind: {
		inherit: true,
		accuracy: 100,
	},
	// make moonblast be effected by bulletproof
	moonblast: {
		inherit: true,
		flags: {protect: 1, mirror: 1, bullet: 1},
	},
	lightofruin: {
		inherit: true,
		accuracy: 100,
	},
	// NEW MOVES
	curseddance: {
		num: 3000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cursed Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			spe: 2,
			spa: 1,
		},
		onPrepareHit(source) {
			this.add('-anim', source, '[still]');
			this.add('-anim', source, 'Quiver Dance');
		},
		secondary: null,
		target: "self",
		type: "Ghost",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	shadowfang: {
		num: 3001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Shadow Fang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1},
		drain: [1, 3],
		target: "normal",
		type: "Ghost",
	},
	ironmaw: {
		num: 3002,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Iron Maw",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1, contact: 1},
		target: "normal",
		type: "Steel",
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
	},
	recharge: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recharge",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	repair: {
		num: 3004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Repair",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	happyvalentine: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Happy Valentine",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		secondary: {
			onHit(target) {
				if (this.randomChance(1, 2)) {
					this.boost({def: 4, spd: 4, spe: 4});
				} else {
					this.boost({atk: 4, spa: 4, spe: 4});
				}
			},
		},
		// secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	numbingviolin: {
		num: 3006,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Numbing Violin",
		pp: 15,
		priority: 0,
		flags: {sound: 1, protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	purgingflame: {
		num: 3007,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Purging Flame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 20,
			onHit(target, source) {
				if (this.randomChance(1, 2)) {
					target.addVolatile('flinch', source);
				} else {
					target.trySetStatus('brn', source);
				}
			},
		},
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			default:
				move.type = 'Dark';
			}
		},
		target: "any",
		type: "Dark",
		contestType: "Cool",
	},
	claysmack: {
		num: 3008,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Clay Smack",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Smart",
	},
	keychain: {
		num: 3009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Key Chain",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'gmaxsteelsurge',
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	caltrops: {
		num: 3010,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Caltrops",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'gmaxsteelsurge',
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	phalanxstrike: {
		num: 3011,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Phalanx Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	typhoon: {
		num: 3012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Typhoon",
		pp: 5,
		priority: 0,
		flags: {},
		weather: 'windstorm',
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Cool",
	},
	// New Sig Z Moves
	endlesssilentforest: {
		accuracy: true,
		basePower: 190,
		category: "Physical",
		isNonstandard: "Past",
		name: "Endless Silent Forest",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "simisagiumz",
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	deafeningfirestorm: {
		accuracy: true,
		basePower: 190,
		category: "Special",
		isNonstandard: "Past",
		name: "Deafening Firestorm",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "simiseariumz",
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	blindingwaterfall: {
		accuracy: true,
		basePower: 190,
		category: "Special",
		isNonstandard: "Past",
		name: "Blinding Waterfall",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "simipouriumz",
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	// -------- Internal Moves to set Terrains and such -------
	// internal inaccessible move that is used to set Submerge
	submerge: {
		num: 4000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Submerge",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'submerge',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					if (move.type === 'Water') {
						this.debug('Submerge boost');
						return this.chainModify(2);
					}
					if (move.type === 'Electric') {
						this.debug('Submerge boost');
						return this.chainModify(1.5);
					}
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Submerge', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Submerge');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Submerge');
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && !move.status && move.type === 'Fire') {
					this.add('-fail', pokemon, target, '[from] Submerge');
					return false;
				}
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
};
