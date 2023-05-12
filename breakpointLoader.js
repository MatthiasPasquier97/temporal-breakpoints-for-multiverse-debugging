import { regex2iSLI } from "./regexLanguage/regex2iSLI.js";
import * as fs from 'fs';
//import {ndfs_gs09_cdlp05} from "/home/matthias-pasquier/Documents/Logiciels/z2mc-javascript/src/model-checkers/buchi/mc_buchi_ndfs_gs09_cdlp05.js";
//import {nbfs_naive} from "/home/matthias-pasquier/Documents/Logiciels/z2mc-javascript/src/model-checkers/buchi/mc_buchi_nbfs_naive.js";
const {bfs_hashset_predicate_mc_simple, bfs_hashset_predicate_mc_full, dfs_hashset_predicate_mc_full} = AnimUMLUtils.z2mc.z_hashset_predicate_mc;
const mc_buchi_ndfs_gs09_cdlp05 = AnimUMLUtils.mc_buchi_ndfs_gs09_cdlp05;

import {DictionnaryiSLI} from "./dictionnaryLanguage/dictionnaryiSLI.js"

async function buchiModelChecking(tr, canonize = (n)=> n, acceptingPredicate, hashFn, eqFn) {
    let initial = await tr.initial();
    let next    = (c) => tr.next(c);

    return ndfs_gs09_cdlp05(initial, next, canonize, acceptingPredicate, hashFn, eqFn);
}


function breakpointTypeSelect(breakpointType){
    switch (breakpointType) {
        case "RegexLanguage":
            var regexInject = (spec, evaluate) => {return regex2iSLI(fs.readFileSync(spec, "utf8"), evaluate)};
            return {breakpointConstructor: regexInject, emptinessChecker: bfs_hashset_predicate_mc_full}            
            break;
        case "AnimUML":
            var animumlInject = async (spec, evaluate) => {return AnimUMLUtils.engineToiSLI(await AnimUMLUtils.getAnimUMLEngine(spec), evaluate)};
        return {breakpointConstructor: animumlInject, emptinessChecker: bfs_hashset_predicate_mc_full}   
            break;
        case "AnimUMLLiveness":
            var animumlInject = async (spec, evaluate) => {return AnimUMLUtils.engineToiSLI(await AnimUMLUtils.getAnimUMLEngine(spec), evaluate)};
            return {breakpointConstructor: animumlInject, emptinessChecker: buchiModelChecking}   
            break;
        case "Dictionnary":
            return {breakpointConstructor: dictionnaryLoader, emptinessChecker: buchiModelChecking}  
        default:
            break;
    }
}

export {breakpointTypeSelect}