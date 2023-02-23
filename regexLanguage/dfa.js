class DfaLink {
	constructor(action, start, end){
		this.start = start;
		this.end = end;
		this.action = action;
	}
}

class Dfa {
  constructor(start, ends, links, states){
    this.start = start;
    this.ends = ends;
    this.links = links;
    this.states = states;
  }
  toAnimUML(){
    var stateCounter = 0;
    var animumlStates = {};
    for (var state of this.states){
      animumlStates[state] = stateCounter;
      stateCounter++
    }
    var animumlModel = "";
    animumlModel = animumlModel + "[*] --> " + animumlStates[this.start] + "\n"
    for (var link of this.links){
      animumlModel = animumlModel + animumlStates[link.start] + " --> " + animumlStates[link.end] + ": [" + link.action + "]\n"
    }
    var acceptingExpression = "";
    for (var endState of this.ends){
      acceptingExpression = acceptingExpression + "IS_IN_STATE(" + animumlStates[endState] + ") || "
    }
    acceptingExpression = acceptingExpression.slice(0, -4);
    return {"animumlModel": animumlModel, "acceptingExpression": acceptingExpression}
  }
  toExecutableDfa(){
    var stateCounter = 0;
    var dfaStates = {};
    for (var state of this.states){
      dfaStates[state] = "S" + stateCounter;
      stateCounter++
    }
    var actions = {}
    for (var dfaState of Object.values(dfaStates)) {
      actions[dfaState] = [];
    }
    for (var link of this.links){
      actions[dfaStates[link.start]].push([link.action, dfaStates[link.end]]);
    }
    var initial = [dfaStates[this.start]];
    var accepting = [];
    for (var endConfig of this.ends){
      accepting.push(dfaStates[endConfig]);
    }
    return {"initial": initial, "actions": actions, "accepting": accepting}
  }
}

class DFAiSTR {
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
  configurationHashFn(configuration){
      return hashCode(configuration);
  }
  configurationEqFn(conf1, conf2){
      return conf1 === conf2;
  }

}

class DFAiSLI {
  constructor(dfa, evaluate){
    this.model = dfa;
    this.str = new DFAiSTR(this, evaluate);
  }
  async evaluate(expression, configuration){
      //TODO
  }
  isAccepting(configuration){
    return this.model["accepting"].includes(configuration);
  }
  reduce(reduction, configuration){
    return reduction(configuration);
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


export {DfaLink, Dfa, DFAiSLI}
