//import antlr4 from 'antlr4';
import {} from '../importANTLR4.js';
import regexLexer from './regexLexer.js';
import regexParser from './regexParser.js';
import CustomRegexListener from './CustomRegexListener.js';

var input = "|true|* |IS_IN_STATE(bob, bob.CS)|"
input = "(|IS_TRANSITION(ProcessA.AEnteringCritical)||||IS_TRANSITION(ProcessB.BEnteringCritical)|.|true|*)"
const chars = new antlr4.InputStream(input);
const lexer = new regexLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new regexParser(tokens);
parser.buildParseTrees = true;
const tree = parser.model();

const listener = new CustomRegexListener();
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

const map = listener.returnMap();
console.log(map);
var nfa = map['[]'].toNfa();

console.log("Initial input: ");
console.log(input);

console.log("\nNFA: ");
console.log(nfa);

console.log("\nDFA: ");
var dfa = nfa.toDfa();
console.log(dfa);

console.log("\nAnimuml automata: ");
var animuml = dfa.toAnimUML();
console.log(animuml.animumlModel);

console.log("Animuml accepting expression: ");
console.log(animuml.acceptingExpression);

var eDfa = dfa.toExecutableDfa();
console.log(eDfa);
