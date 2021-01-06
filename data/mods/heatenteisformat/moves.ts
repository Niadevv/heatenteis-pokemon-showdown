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
				const result = this.random(4);
				if (result > 0) {
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
				const result = this.random(4);
				if (result > 0) {
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
		// TODO: neurotoxin
		onHit(target) {
			if (target.status) {
				if (!['magicguard', 'poisonheal', 'spacialbarrier', 'temporalbarrier'].includes(target.ability)) {
					if (target.status === 'psn') {
						target.damage((target.baseMaxhp / 8) * 3);
						this.add('-damage', target, target.getHealth);
					} else if (target.status === 'tox') {
						let accumulatedDamage = 0;

						for (let i = 0; i < 3; i++) {
							accumulatedDamage += (target.baseMaxhp / 16) * target.statusData.stage;
							target.statusData.stage += 1;
						}

						target.damage(this.clampIntRange(accumulatedDamage));
						this.add('-damage', target, target.getHealth);
					} else if (target.status === 'brn') {
						target.damage((target.baseMaxhp / 16) * 3);
						this.add('-damage', target, target.getHealth);
					}
				}
				if (target.ability === 'poisonheal') {
					this.add('-activate', 'move: Roar of Time');
					target.heal((target.baseMaxhp / 8) * 3);
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
	judgement: {
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
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side, source) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
				this.effectData.source = source;
				// if (source.ability === 'neurotoxin') {
				// 	this.effectData.neurotoxin = true;
				// } else {
				// 	this.effectData.neurotoxin = false;
				// }
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', this.effectData.source);
				} else {
					pokemon.trySetStatus('psn', this.effectData.source);
				}
			},
		},
	},
	// Modify so Twisted Dimension works
	trickroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source?.hasAbility('twisteddimension')) {
					this.add('-activate', source, 'ability: Twisted Dimension', effect);
					// Set to obscenely long time as Twisted Dimenion trick room is permanent until the user switches out
					return 9999;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
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
	},
	morningsun: {
		inherit: true,
		pp: 10,
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
		recoil: [0, 1],
	},
	triplekick: {
		inherit: true,
		basePower: 20,
	},
	lightthatburnsthesky: {
		inherit: true,
		basePower: 250,
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
			this.add('[still]');
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
				const result = this.random(2);
				if (result === 0) {
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
				const result = this.random(2);
				if (result > 0) {
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
					this.add('cant', pokemon, 'move: Submerge');
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
