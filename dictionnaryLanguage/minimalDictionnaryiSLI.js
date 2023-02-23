var jsonEx = {
    "initial": [1],  
    "actions": {
        1: [ ["IS_IN_STATE(alice, alice.CS) && IS_IN_STATE(bob, bob.CS)", 2], ["true", 1] ],
        2: [],
    },
    "accepting": [2, 3]
}

//addProperty {"initial": ["1"],  "actions": {"1": [ ["IS_IN_STATE(alice, alice.CS) && IS_IN_STATE(bob, bob.CS)", "2"], ["true", "1"] ],"2": []},"accepting": ["2", "3"]}
//addProperty {"initial": ["1"],  "actions": {"1": [ ["!IS_IN_STATE(alice, alice.CS) && IS_IN_STATE(bob, bob.CS)", "2"], ["true", "1"] ],"2": []},"accepting": ["2", "3"]}
//runToBreakpoint {"initial": ["1"],  "actions": {"1": [ ["!IS_IN_STATE(alice, alice.CS) && IS_IN_STATE(bob, bob.CS)", "2"], ["true", "1"] ],"2": []},"accepting": ["2", "3"]}


class SemanticsSTR{
    constructor(model, evaluate){
        this.model = model;
        this.evaluate = evaluate;
    }
    initial(){ return this.model["initial"]}
    async actions(){ return this.model["actions"][configuration].filter(await this.evaluate(a[0], input))}
    execute(){ return [action[1]]}
}

class DictionnaryiSTR {
    constructor(parent, evaluate){
        this.parent = parent;
        this.evaluate = evaluate;
    }
    model(){
        return this.parent.model;
    }
    initial(){
        return this.model()["initial"];
    }
    async actions(input, configuration){
        var allActions = this.model()["actions"][configuration];
        var retActions = []; 
        for (var a of allActions){
            var res = await this.evaluate(a[0], input);
            //console.log(input, res);
            if (res) {
                retActions.push(a);
            }
        }
        return retActions;
    }
    async execute(action, input, configuration){
        return [action[1]];
    }
    configurationHashFn (configuration){
        return hashCode(configuration);
    }
    configurationEqFn(conf1, conf2){
        return conf1 === conf2;
    }

}

class DictionnaryiSLI {
    constructor(stringJson, evaluate){
        this.model = JSON.parse(stringJson);
        this.str = new DictionnaryiSTR(this, evaluate);
    }
    async evaluate(expression, configuration){
        //TODO
    }
    isAccepting(configuration){
        return this.model["accepting"].includes(configuration);
    }
    reduce(reduction, configuration){

    }
}

function hashCode(string) {
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


export {DictionnaryiSLI}