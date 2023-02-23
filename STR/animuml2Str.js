
class DeterministToSTR {
    constructor(parent){
        this.parent = parent;
    }
    engine(){
        return this.parent.engine;
    }
    async initial(){
        await this.engine().reset();
        return [ await this.engine().getConfiguration()];
    }
    async actions(configuration){
        await this.engine().setConfiguration(configuration);
        return await this.engine().getFireables();
    }
    async execute(action, configuration){
        await this.engine().setConfiguration(configuration);
        await this.engine().fire(action);
        return [await this.engine().getConfiguration()];
    }
    configurationHashFn (configuration){
        return hashCode(configuration);
    }
    configurationEqFn(conf1, conf2){
        return conf1 === conf2;
    }
}

class DeterministToSLI {
    constructor(engine){
        this.engine = engine;
        this.str = new DeterministToSTR(this);
        this.evaluateStep = AnimUMLUtils.evaluateStepBuilder(this.engine);
    }
    async evaluate(expression, configuration){
        await this.engine.setConfiguration(configuration);
        return await this.engine.evaluateAtom(expression, {});
    }
    evaluateStep(expression, source, action, target){
        return this.evaluateStep(expression, source, action, target);
    }
    reduce(reduction, configuration){

    }
}

function hashCode(string) {
    var hash = 0, i, chr;
    if (string == null || string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

export {DeterministToSLI}


/*
	new Determinist2iSLI(propertyEngine, engine2StepEval(systemEngine))
*/

/*
	Example property transition:
		S1 --> S2 : [propertyAttribute && sysEval('IS_TRANSITION(sysObject.sysTrans)')]/
*/


function engine2StepEval(engine) {
	return async function(expression, {s: srcConfig, a: trans, t: tgtConfig}) {
		await engine.setConfiguration(srcConfig);
		// TODO: process expression to replace each occurrence of @<beforeExp>@ with the result of evaluating <beforeExp> on srcConfig
		await engine.fire(action);
		return await engine.evaluateAtom(expression, {});
	};
}

class DeterministToiSTR {
    constructor(engine, sysEval){
        this.engine = engine;
        this.sysEval = sysEval;
    }
    async initial(){
        await this.engine.reset();
        return [ await this.engine.getConfiguration()];
    }
    async actions(input, configuration){
        await this.engine.setConfiguration(configuration);

	// making sure sysEval is used to evaluate guards in getFireables
	this.engine.extraOperations.sysEval = (expression) => {
		this.sysEval(expression, input);
	};

        return await this.engine.getFireables();
    }
    async execute(action, input, configuration){
        await this.engine.setConfiguration(configuration);

	// making sure sysEval is used to evaluate effect
	this.engine.extraOperations.sysEval = (expression) => {
		this.sysEval(expression, input);
	};

        await this.engine.fire(action);
        return [await this.engine.getConfiguration()];
    }
    configurationHashFn (configuration){
        return hashCode(configuration);
    }
    configurationEqFn(conf1, conf2){
        return conf1 === conf2;
    }
}

class DeterministToiSLI {
    constructor(engine, sysEval){
        this.engine = engine;
        this.str = new DeterministToiSTR(engine, sysEval);
    }
    async evaluate(expression, configuration){
        await this.engine.setConfiguration(configuration);
        return await this.engine.evaluateAtom(expression, {});
    }
    reduce(reduction, configuration){

    }
}
