//import antlr4 from 'antlr4';
import regexLexer from './regexLexer.js';
import regexParser from './regexParser.js';
import CustomRegexListener from './CustomRegexListener.js';

import {DFAiSLI} from './dfa.js';

function regex2iSLI(regexString, evaluate) {

    const chars = new antlr4.InputStream(regexString);
    const lexer = new regexLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new regexParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.model();

    const listener = new CustomRegexListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

    const map = listener.returnMap();

    var nfa = map['[]'].toNfa();

    var dfa = nfa.toDfa();

    var sli = new DFAiSLI(dfa.toExecutableDfa(), evaluate);

    return sli;

}


export {regex2iSLI}
