globalThis.examples = globalThis.examples || [];
examples.push(
	{
	"name": "AEntersCrit",
	"accepting": "IS_IN_STATE(Property, Property.X)",
	"objects": [
		{
			"name": "Property",
			"behavior": `
				[*] -> A
				A -> A : [true]
				A -> X : [evaluateOnInput("(IS_IN_STATE(bob, bob.CS) && IS_IN_STATE(alice, alice.CS))")]
			`,
			"features": `
				x : int
			`,
		},
	],
	connectorByName: {
	},
	watchExpressions: {
},
	"settings": {
		"semantics": {
		"reactiveSystem": true,
		"fireInitialTransitions": true,
		},
	},
});
