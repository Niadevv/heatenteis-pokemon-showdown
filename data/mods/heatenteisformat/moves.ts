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
		contestType: "Clever",
	}
};
