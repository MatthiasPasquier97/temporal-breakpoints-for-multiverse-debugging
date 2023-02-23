import {DfaLink, Dfa} from './dfa.js'


class NfaLink {
	static counter = 0;
	constructor(action, start=null, end=null){
		this.start = (start == null) ? NfaLink.counter++ : start;
		this.end = (end == null) ? NfaLink.counter++ : end;
		this.action = action;
	}
}

class Nfa {
	constructor(start, end, links){
		this.start = start;
		this.end = end;
		this.links = links;
	}
  states(){
    var states = new Set();
    for (var link of this.links){
      states.add(link.start);
      states.add(link.end);
    }
    return states;
  }
  actions(){
    var actions = new Set();
    for (var link of this.links){
      actions.add(link.action);
    }
    actions.delete(true);
    return actions;
  }
  epsilonClosure(states){
    var closure = new Set([...states]);
    var frontier = [...states];
    while (frontier.length != 0) {
      var currentState = frontier.pop()
      for (var link of this.links){
        if (link.start == currentState && link.action == true){
          closure.add(link.end);
          frontier.push(link.end);
        }
      }
    }
    return closure
  }
  transitionFunction(states, action){
    var closure = new Set();
    for (var state of states) {
      for (var link of this.links){
        if (link.start == state && link.action == action){
          closure.add(link.end);
        }
      }
    }
    return closure;
  }
  toDfa(){
    var states = new Set();
    var initialSet = this.epsilonClosure(new Set([this.start]));
    var initialState = [...initialSet].sort().join(',');
    states.add(initialState);
    var actions = this.actions();
    var links = [];
    for (var state of states){
      var setState = new Set(state.split(','));
      for (var action of actions){
        var endState = this.epsilonClosure(this.transitionFunction(setState, action));
        if (endState.size > 0) {
          states.add([...endState].sort().join(','));
          var dfaLink = new DfaLink(action, state, [...endState].sort().join(','));
          links.push(dfaLink);
        }
      }
    }
    var endStates = new Set()
    for (var state of states){
      if (state.split(',').includes("" + this.end)){
        endStates.add(state);
      }
    }
    return new Dfa(initialState, endStates, links, states);
  }
}


export {NfaLink, Nfa}
