import { regex2iSLI } from "../regexLanguage/regex2iSLI.js";
import { TreeNode, Tree } from "../tree.js";

class TraceEntry {
    constructor(config, debugAction, parent = null){
        this.config = config;
        this.debugAction = debugAction;
        this.parent = parent;
        this.children = [];
        if (parent != null){
            parent.children.push(this);
        }
    }

}

class DebugConfig {
    constructor(current, history, options, breakpoints, reductions){
        this.current = current;
        this.history = history;
        this.options = options;
        this.breakpoints = breakpoints;
        this.reductions = reductions;
    }
    //No Hash or equality function, as debug is only supposed to be used interactively
}

class DebugAction{

}

class InitAction extends DebugAction{
    constructor(){
        super();
    }
}

class StepAction extends DebugAction {
    constructor(action){
        super();
        this.action = action;
    }
}

class SelectAction extends DebugAction {
    constructor(configuration){
        super();
        this.configuration = configuration;
    }
}

class JumpAction extends DebugAction {
    constructor(traceEntry){
        super();
        this.traceEntry = traceEntry;
    }
}

class RTBAction extends DebugAction {
    constructor(breakpoint){
        super();
        this.breakpoint = breakpoint;
    }
}

class DebugSTR {
    constructor(parent, breakpoint){
        this.parent = parent;
        this.breakpoint = breakpoint;
    }
    operand(){
        return this.parent.operand.str;
    }
    async initial(){
        var initialOptions = await this.operand().initial();
        return [new DebugConfig(null, [], {action: new InitAction(), configs: initialOptions}, [this.breakpoint], [])]
    }
    async actions(debugConfig){
        var debugActions = [];
        if (debugConfig.current != null && debugConfig.options == null){
            var actions = await this.operand().actions(debugConfig.current.config);
            for (var action of actions) {
                debugActions.push(new StepAction(action));
            }
            //debugActions.push(new SymbolicStepAction((config, value)=>new StepAction(actions[value])));
        }
        if (debugConfig.options != null){
            for (var option of debugConfig.options.configs){
                debugActions.push(new SelectAction(option));
            }
        }
        for (var traceEntry of debugConfig.history){
            debugActions.push(new JumpAction(traceEntry));
        }
        //debugActions.push(new RTBAction(this.breakpoint));
        for (var breakpoint of debugConfig.breakpoints){
            debugActions.push(new RTBAction(breakpoint));
            //TODO
        }
        /*if (debugConfig.history.length > 0){
            debugActions.push(new SymbolicJumpAction((config, value)=>new JumpAction(config.history[value])));
        }*/
        //debugActions.push(new SymbolicAddBPAction((config, breakpoint)=>new AddBPAction(breakpoint)));
        //debugActions.push((reduction)=>(new AddReduction(reduction)))
        return debugActions;
    }
    async execute(debugAction, debugConfiguration){
        if (debugAction instanceof InitAction){
            console.log("Erreur Execution de InitAction");
        }
        if (debugAction instanceof StepAction){
            if (debugConfiguration.current == null){
                return [];
            }
            var configOptions = await this.operand().execute(debugAction.action, debugConfiguration.current.config);
            var options = {action: debugAction, configs: configOptions}
            return [new DebugConfig(debugConfiguration.current,
                debugConfiguration.history,
                options,
                debugConfiguration.breakpoints,
                debugConfiguration.reductions)];
        }
        if (debugAction instanceof SelectAction){
            var traceEntry = new TraceEntry(debugAction.configuration, debugAction, debugConfiguration.current)
            return [new DebugConfig(traceEntry,
                debugConfiguration.history.concat(traceEntry),
                null,
                debugConfiguration.breakpoints,
                debugConfiguration.reductions)];
        }
        if (debugAction instanceof JumpAction){
            return [new DebugConfig(debugAction.traceEntry,
                debugConfiguration.history,
                null,
                debugConfiguration.breakpoints,
                debugConfiguration.reductions)];
        }
        if (debugAction instanceof RTBAction){
            var reduction = null;
            if (debugConfiguration.reductions.length != 0){
                reduction = debugAction.reductions[0];
            }
            //hardcoded regex2isli breakpoint
            //var breakpointSli = regex2iSLI(debugAction.breakpoint, (e, c) => this.parent.operand.evaluate(e,c));
            //var breakpointSli = 
            var result;
            if (debugConfiguration.current == null){
                result = await this.parent.finder(this.parent.operand, debugConfiguration.options.config, debugAction.breakpoint, reduction);
            } else {
                result = await this.parent.finder(this.parent.operand, [debugConfiguration.current.config], debugAction.breakpoint, reduction);
            }
            if (!result["verified"]){
                var previousTraceEntry = new TraceEntry(result["trace"][0], debugAction, debugConfiguration.current);
                var historyPatch = [previousTraceEntry];
                for (let i = 1; i < result["trace"].length; i++) {
                    previousTraceEntry = new TraceEntry(result["trace"][i], debugAction, previousTraceEntry);
                    historyPatch.push(previousTraceEntry);
                }
                return [new DebugConfig(previousTraceEntry,
                    debugConfiguration.history.concat(historyPatch),
                    [],
                    debugConfiguration.breakpoints,
                    debugConfiguration.reductions)];
            }
            return [new DebugConfig(debugConfiguration.current,
                debugConfiguration.history,
                debugConfiguration.options,
                debugConfiguration.breakpoints,
                debugConfiguration.reductions)];
        }
        if (debugAction instanceof AddBPAction){
            return [new DebugConfig(debugConfiguration.current,
                debugConfiguration.history,
                debugConfiguration.options,
                debugConfiguration.breakpoints.concat([debugAction.breakpoint]),
                debugConfiguration.reductions)];
        }
    }
}

class DebugSLI {
    constructor(operand, finder, breakpoint){
        this.operand = operand;
        this.finder = finder;
        this.breakpoint = breakpoint;
        this.str = new DebugSTR(this, breakpoint);
    }
}

function ReducedMultiverseDebuggerBridge(operand, finder, breakpoint, reduction){
    return new DebugSLI(operand, finder, breakpoint).str;
}

function ReducedMultiverseDebugger(finder, inject, specification, breakpoint, reduction){
    return ReducedMultiverseDebuggerBridge(inject(specification), finder, breakpoint, reduction);
}

export {DebugSLI}
