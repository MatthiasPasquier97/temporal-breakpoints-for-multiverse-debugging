globalThis.examples = globalThis.examples || [];
examples.push(
	{
	"name": "AEntersCrit",
	"accepting": "IS_IN_STATE(Property, Property.A)",
	"objects": [
		{
			"name": "Property",
			"behavior": `
				[*] -> A
				A -> A : [evaluateOnInput("IS_IN_STATE(bob, bob.CS)")]
				A -> B : [!evaluateOnInput("IS_IN_STATE(bob, bob.CS)")]
                B -> A : [!evaluateOnInput("IS_IN_STATE(bob, bob.CS)")]
				B -> A : [evaluateOnInput("IS_IN_STATE(bob, bob.CS)")]
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
