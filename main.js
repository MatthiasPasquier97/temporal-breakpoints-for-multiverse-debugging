// vi: expandtab:tabstop=4:shiftwidth=4

import {} from './importANTLR4.js';
import * as repl from 'repl';
import * as fs from 'fs';

// AnimUMLUtils dependencies
import {} from "./ContextualEval.cjs";
import {} from "./peg-0.10.0.min.js";
import {} from "./importFS.js";
import {} from "./AnimUMLUtils.min.js";

import { DeterministToSLI } from "./STR/animuml2Str.js";
import { DebugSLI } from './STR/debugSTR.js';
import { finderTemporalStep } from './finder.js';
import { breakpointTypeSelect } from './breakpointLoader.js';



var engine;//; = new AnimUMLEngine(model, model.settings?.semantics ?? {});
var sliEngine; // = new DeterministToSLI(engine);
var debuggerEngine;

var options;
var actions;
var current;

var replInstance;

async function main() {

    var arg = process.argv.slice(2)[0];
    var  parameters = JSON.parse(fs.readFileSync("./samples/configuration.json", "utf8"))[arg]
    console.log(parameters);

    const modelPath = parameters.modelPath;
    const breakpointType = parameters.breakpointType;
    const breakpointPath = parameters.breakpointPath;

    var {breakpointConstructor, emptinessChecker} = breakpointTypeSelect(breakpointType);


    var finder = async (sliEngine, configurations, breakpoint, reduction) => {
        return finderTemporalStep(sliEngine, configurations, await breakpointConstructor(breakpoint, sliEngine.evaluateStep), reduction, emptinessChecker)
    }


    engine = await AnimUMLUtils.getAnimUMLEngine(modelPath);
    sliEngine = new DeterministToSLI(engine);
    debuggerEngine = new DebugSLI(sliEngine, finder, breakpointPath);

    replInstance = repl.start({prompt: "debug => ", eval: debugCb});

	//engine.close();
}


async function debugCb(uInput, context, filename, callback){
        var command = uInput.trim().split(" ");
        switch(command[0]){
            case 'q':
                engine.close();
                process.exit(0);
                break;
            case 'initial': 
            case 'i':
                options = await debuggerEngine.str.initial();
                if (options.length > 1){
                    callback(null, options);
                } else {
                    current = options[0];
                    options = [];
                    callback(null, current);
                }
                break;
            case 'actions':
            case 'a':
                if (options.length > 1){
                    callback(null, "Multiple configuration possible, choose one with \"select\" first");
                } else {
                    actions = await debuggerEngine.str.actions(current);
                    callback(null, actions);      
                }
                break;
            case 'execute':
            case 'e':
                actions = await debuggerEngine.str.actions(current);
                if (command.length == 1){
                    if (actions.length > 1){
                        callback(null, "Choose an action from this list: " + actions );
                        break;
                    }
                    options = await debuggerEngine.str.execute(actions[0], current);
                } else {
                    options = await debuggerEngine.str.execute(actions[command[1]], current);
                }
                //auto select if there is only one configuration
                if (options.length > 1){
                    callback(null, options);
                    break;
                }
                current = options[0];
                options = [];
                callback(null, current);
                break;
            // case 'execute1':
            //     var secondParameter = command.slice(2).join(' ');
            //     actions = await sliEngine.str.actions(current);
            //     options = await sliEngine.str.execute(actions[command[1]].callback(current, secondParameter), current);
            //     //auto select if there is only one configuration
            //     if (options.length > 1){
            //         callback(null, options);
            //         break;
            //     }
            //     current = options[0];
            //     options = [];
            //     callback(null, current);
            //     break;
            // case 'saveConfig':
            //     fs.writeFile('./saves.json', JSON.stringify({"save": current}), 'utf8', function(err){
            //         if (err){
            //             callback(null, "Error writing file");
            //         }
            //     });
            //     callback(null, "Success");
            //     break;
            // case 'loadConfig':
            //     fs.readFile('./saves.json', 'utf8', function(err, data) {
            //         if (err){
            //             callback(null, "Error reading file");
            //         }
            //         current = JSON.parse(data).save;
            //         options = [];
            //     });
            //     callback(null, "Success");
            //     break;

        }
    }
    

// function hashCode(string) {
//     var hash = 0, i, chr;
//     if (string.length === 0) return hash;
//     for (i = 0; i < string.length; i++) {
//       chr   = string.charCodeAt(i);
//       hash  = ((hash << 5) - hash) + chr;
//       hash |= 0; // Convert to 32bit integer
//     }
//     return hash;
//   };


main();
