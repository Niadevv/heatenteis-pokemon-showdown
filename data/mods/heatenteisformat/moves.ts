export const Moves: {[k: string]: ModdedMoveData} = {
	iceburn: {
		inherit: true,
		flags: {protect: 1, mirror: 1},
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
		flags: {protect: 1, mirror: 1},
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
				if (!['magicguard', 'poisonheal', 'spacialbarrier'].includes(target.ability)) {
					if (target.status === 'psn') {
						target.damage((target.baseMaxhp / 8) * 3);
					} else if (target.status === 'tox') {
						let accumulatedDamage = 0;

						for (let i = 0; i < 3; i++) {
							accumulatedDamage += (target.baseMaxhp / 16) * target.statusData.stage;
							target.statusData.stage += 1;
						}

						target.damage(this.clampIntRange(accumulatedDamage));
					} else if (target.status === 'brn') {
						target.damage((target.baseMaxhp / 16) * 3);
					}
				}
				if (target.ability === 'poisonheal') {
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
	// NEW MOVES
	curseddance: {
		num: 3000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cursed Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Ghost",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
};
