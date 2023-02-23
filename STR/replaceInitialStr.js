class ReplaceInitialSTR {
    constructor(parent, initialConfigurations){
        this.parent = parent;
        this.initialConfigurations = initialConfigurations;
    }
    operand(){
        return this.parent.operand.str;
    }
    async initial(){
        return this.initialConfigurations;
    }
    async actions (configuration){
        return await this.operand().actions(configuration);
    }
    async execute(action, configuration){
        return await this.operand().execute(action, configuration);
    }
    configurationHashFn(configuration){
        return this.operand().configurationHashFn(configuration);
    }
    configurationEqFn(conf1, conf2){
        return this.operand().configurationEqFn(conf1, conf2);
    }
}

class ReplaceInitialSLI {
    constructor(sli, initialConfigurations){
        this.operand = sli;
        this.str = new ReplaceInitialSTR(this, initialConfigurations);
    }
    async evaluate(expression, configuration){
        return await this.sli.evaluate(expression, configuration);
    }
    async reduce(reduction, configuration){
        return await this.sli.reduce(reduction, configuration);
    }
}

export {ReplaceInitialSLI, ReplaceInitialSTR};