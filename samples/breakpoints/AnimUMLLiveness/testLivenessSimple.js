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
				A -> X : [evaluateOnInput("IS_IN_STATE(processB, processB.Critical)")]
                X -> X : [evaluateOnInput("IS_IN_STATE(processB, processB.Critical)")]
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
