//import {bfs_hashset_predicate_mc_simple, bfs_hashset_predicate_mc_full, dfs_hashset_predicate_mc_full} from "../animuml/src/z2mc-javascript/src/model-checkers/z_hashset_predicate_mc.js";
//import { STR2TR } from "../animuml/src/z2mc-javascript/src/operators/str/str2tr.js";
//import { KripkeBuchiAsymmetricSynchronousProductSemantics, StateEventAsymmetricSynchronousProductSemantics } from "../animuml/src/z2mc-javascript/src/operators/str/synchronous_product_semantics.js";

// AnimUMLUtils must have been loaded beforehand from the importing module, or a parent
import {StepSynchronousProductSemantics} from "/home/matthias-pasquier/Documents/Logiciels/z2mc-javascript/src/operators/str/synchronous_product_semantics.js";
const {bfs_hashset_predicate_mc_simple, bfs_hashset_predicate_mc_full, dfs_hashset_predicate_mc_full} = AnimUMLUtils.z2mc.z_hashset_predicate_mc;
const { STR2TR } = AnimUMLUtils.z2mc.str2tr;
//const { StateSynchronousProductSemantics, StepSynchronousProductSemantics } = AnimUMLUtils.z2mc.synchronous_product_semantics;



import { ReplaceInitialSLI } from './STR/replaceInitialStr.js';





async function finderTemporalStep(sliEngine, configurations, iSliBreakpoint, reduction, emptinessChecker){
    var replacedInitialEngine = new ReplaceInitialSLI(sliEngine, configurations);
    var product = new StepSynchronousProductSemantics(replacedInitialEngine.str, iSliBreakpoint.str??iSliBreakpoint.semantics);
    var productTR = new STR2TR(product);
    //Is the reduction only applied to model, propoerty, both? For now, the reduction is applied by calling the model evalute function, similar to AnimUML
    //var reductionFunction = (reduction == null) ? (c) => c : (c) => ({"kc": sliEngine.evaluate(reduction, c.kc), "bc": c.bc});
    //var reductionFunction = async (c) => ({"kc": c.kc == null ? null : await sliEngine.evaluate("__builtin__.JSON.stringify(__builtin__.config.currentState) +  __builtin__.config.objectState.User.value + EP_IS_EMPTY(System) + (p_CtrlvalueIs0 ? 0 : __builtin__.config.objectState.System.value) > 200", c.kc), "bc": c.bc});
    //var reductionFunction = async (c) => ({"kc": hashCode(c.kc), "bc": c.bc});

    var reductionFunction = (c) => {var hash = product.configurationHashFn(c)%1000;
        //console.log(hash);
        return c};
    var result =  await emptinessChecker(productTR, reductionFunction, async (c) => {
        const res = await iSliBreakpoint.isAccepting(c.rc);
        //console.log(c);
        return res;
    }, (c) => product.configurationHashFn(c), (c1, c2) => product.configurationEqFn(c1, c2));
    var trace = [];
    console.log("Count: " + result.configuration_count);
    if (!result["verified"]){
        for (var doubleConfig of result["trace"]){
            if(doubleConfig.lc !=null){
                trace.push(doubleConfig.lc);
                console.log(doubleConfig.lc);
                console.log(doubleConfig.rc);
            }
        }
    }
    result["trace"] = trace;
    return result;
}

function hashCode(string) {
    if (string == null){
        return null;
    }
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


export {finderTemporalStep};

