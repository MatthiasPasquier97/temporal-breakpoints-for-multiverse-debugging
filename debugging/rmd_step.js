const {bfs_hashset_predicate_mc_simple, bfs_hashset_predicate_mc_full, dfs_hashset_predicate_mc_full} = AnimUMLUtils.z2mc.z_hashset_predicate_mc;
const { STR2TR } = AnimUMLUtils.z2mc.str2tr;
const { KripkeBuchiAsymmetricSynchronousProductSemantics, StateEventAsymmetricSynchronousProductSemantics } = AnimUMLUtils.z2mc.synchronous_product_semantics;

import { ReplaceInitialSLI } from '../STR/replaceInitialStr.js';


function FinderBridgeTemporalStep(BreakpointiSTR, accepting, operand, evaluate, initial){
    var replacedInitialEngine = new ReplaceInitialSLI(sliEngine, configurations);
    var product = new KripkeBuchiAsymmetricSynchronousProductSemantics(replacedInitialEngine.str, iSliBreakpoint.str);
    return new STR2TR(product);
}

function FinderFnTemporalStep(){


    var trace = [];
    if (!result["verified"]){
        for (var doubleConfig of result["trace"]){
            if(doubleConfig.kc !=null){
                trace.push(doubleConfig.kc);
            }
        }
    }
    result["trace"] = trace;
    return result;
}
