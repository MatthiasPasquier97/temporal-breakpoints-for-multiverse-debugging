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
				A -> A : [evaluateOnInput("IS_IN_STATE(processB, processB.Critical)") && x < 5] / x++;
				A -> A : [!evaluateOnInput("IS_IN_STATE(processB, processB.Critical)")]
				A -> X : [evaluateOnInput("IS_IN_STATE(processB, processB.Critical)") && x >= 5]
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
