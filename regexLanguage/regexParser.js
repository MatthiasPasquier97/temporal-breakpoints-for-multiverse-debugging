// Generated from regex.g4 by ANTLR 4.9.2
// jshint ignore: start
//import antlr4 from 'antlr4';
import regexListener from './regexListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0012/\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0012\n",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003%\n\u0003\u0003\u0003\u0007\u0003(\n\u0003\f\u0003\u000e\u0003",
    "+\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0002\u0003\u0004",
    "\u0005\u0002\u0004\u0006\u0002\u0002\u00024\u0002\b\u0003\u0002\u0002",
    "\u0002\u0004\u0011\u0003\u0002\u0002\u0002\u0006,\u0003\u0002\u0002",
    "\u0002\b\t\u0005\u0004\u0003\u0002\t\u0003\u0003\u0002\u0002\u0002\n",
    "\u000b\b\u0003\u0001\u0002\u000b\u0012\u0005\u0006\u0004\u0002\f\u0012",
    "\u0007\u000f\u0002\u0002\r\u000e\u0007\u000b\u0002\u0002\u000e\u000f",
    "\u0005\u0004\u0003\u0002\u000f\u0010\u0007\f\u0002\u0002\u0010\u0012",
    "\u0003\u0002\u0002\u0002\u0011\n\u0003\u0002\u0002\u0002\u0011\f\u0003",
    "\u0002\u0002\u0002\u0011\r\u0003\u0002\u0002\u0002\u0012)\u0003\u0002",
    "\u0002\u0002\u0013\u0014\f\u0005\u0002\u0002\u0014\u0015\u0007\t\u0002",
    "\u0002\u0015(\u0005\u0004\u0003\u0006\u0016\u0017\f\u0004\u0002\u0002",
    "\u0017\u0018\u0007\n\u0002\u0002\u0018(\u0005\u0004\u0003\u0005\u0019",
    "\u001a\f\t\u0002\u0002\u001a(\u0007\u0003\u0002\u0002\u001b\u001c\f",
    "\b\u0002\u0002\u001c(\u0007\u0004\u0002\u0002\u001d\u001e\f\u0007\u0002",
    "\u0002\u001e(\u0007\u0005\u0002\u0002\u001f \f\u0006\u0002\u0002 !\u0007",
    "\u0006\u0002\u0002!$\u0007\r\u0002\u0002\"#\u0007\u0007\u0002\u0002",
    "#%\u0007\r\u0002\u0002$\"\u0003\u0002\u0002\u0002$%\u0003\u0002\u0002",
    "\u0002%&\u0003\u0002\u0002\u0002&(\u0007\b\u0002\u0002\'\u0013\u0003",
    "\u0002\u0002\u0002\'\u0016\u0003\u0002\u0002\u0002\'\u0019\u0003\u0002",
    "\u0002\u0002\'\u001b\u0003\u0002\u0002\u0002\'\u001d\u0003\u0002\u0002",
    "\u0002\'\u001f\u0003\u0002\u0002\u0002(+\u0003\u0002\u0002\u0002)\'",
    "\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002*\u0005\u0003\u0002",
    "\u0002\u0002+)\u0003\u0002\u0002\u0002,-\u0007\u000e\u0002\u0002-\u0007",
    "\u0003\u0002\u0002\u0002\u0006\u0011$\')"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class regexParser extends antlr4.Parser {

    static grammarFileName = "regex.g4";
    static literalNames = [ null, "'*'", "'+'", "'?'", "'{'", "':'", "'}'", 
                            "'.'", "'||'", "'('", "')'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, "NUMBER", "IDENTIFIER", "ATOM", 
                             "LINE_COMMENT", "COMMENT", "WS" ];
    static ruleNames = [ "model", "expression", "reference" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = regexParser.ruleNames;
        this.literalNames = regexParser.literalNames;
        this.symbolicNames = regexParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 3);
    		case 1:
    			return this.precpred(this._ctx, 2);
    		case 2:
    			return this.precpred(this._ctx, 7);
    		case 3:
    			return this.precpred(this._ctx, 6);
    		case 4:
    			return this.precpred(this._ctx, 5);
    		case 5:
    			return this.precpred(this._ctx, 4);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	model() {
	    let localctx = new ModelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, regexParser.RULE_model);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 6;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, regexParser.RULE_expression, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 15;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case regexParser.IDENTIFIER:
	            localctx = new RefContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 9;
	            this.reference();
	            break;
	        case regexParser.ATOM:
	            localctx = new AtomContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 10;
	            this.match(regexParser.ATOM);
	            break;
	        case regexParser.T__8:
	            localctx = new ParenthesisContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 11;
	            this.match(regexParser.T__8);
	            this.state = 12;
	            this.expression(0);
	            this.state = 13;
	            this.match(regexParser.T__9);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 39;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 37;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new SequenceContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 17;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 18;
	                    this.match(regexParser.T__6);
	                    this.state = 19;
	                    this.expression(4);
	                    break;

	                case 2:
	                    localctx = new AlternativeContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 20;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 21;
	                    this.match(regexParser.T__7);
	                    this.state = 22;
	                    this.expression(3);
	                    break;

	                case 3:
	                    localctx = new StarContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 23;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 24;
	                    this.match(regexParser.T__0);
	                    break;

	                case 4:
	                    localctx = new PlusContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 25;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 26;
	                    this.match(regexParser.T__1);
	                    break;

	                case 5:
	                    localctx = new OptionalContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 27;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 28;
	                    this.match(regexParser.T__2);
	                    break;

	                case 6:
	                    localctx = new IntervalContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, regexParser.RULE_expression);
	                    this.state = 29;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 30;
	                    this.match(regexParser.T__3);
	                    this.state = 31;
	                    this.match(regexParser.NUMBER);
	                    this.state = 34;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===regexParser.T__4) {
	                        this.state = 32;
	                        this.match(regexParser.T__4);
	                        this.state = 33;
	                        this.match(regexParser.NUMBER);
	                    }

	                    this.state = 36;
	                    this.match(regexParser.T__5);
	                    break;

	                } 
	            }
	            this.state = 41;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	reference() {
	    let localctx = new ReferenceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, regexParser.RULE_reference);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 42;
	        this.match(regexParser.IDENTIFIER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

regexParser.EOF = antlr4.Token.EOF;
regexParser.T__0 = 1;
regexParser.T__1 = 2;
regexParser.T__2 = 3;
regexParser.T__3 = 4;
regexParser.T__4 = 5;
regexParser.T__5 = 6;
regexParser.T__6 = 7;
regexParser.T__7 = 8;
regexParser.T__8 = 9;
regexParser.T__9 = 10;
regexParser.NUMBER = 11;
regexParser.IDENTIFIER = 12;
regexParser.ATOM = 13;
regexParser.LINE_COMMENT = 14;
regexParser.COMMENT = 15;
regexParser.WS = 16;

regexParser.RULE_model = 0;
regexParser.RULE_expression = 1;
regexParser.RULE_reference = 2;

class ModelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = regexParser.RULE_model;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterModel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitModel(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = regexParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class RefContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterRef(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitRef(this);
		}
	}


}

regexParser.RefContext = RefContext;

class ParenthesisContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterParenthesis(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitParenthesis(this);
		}
	}


}

regexParser.ParenthesisContext = ParenthesisContext;

class AlternativeContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterAlternative(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitAlternative(this);
		}
	}


}

regexParser.AlternativeContext = AlternativeContext;

class OptionalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterOptional(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitOptional(this);
		}
	}


}

regexParser.OptionalContext = OptionalContext;

class StarContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterStar(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitStar(this);
		}
	}


}

regexParser.StarContext = StarContext;

class SequenceContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterSequence(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitSequence(this);
		}
	}


}

regexParser.SequenceContext = SequenceContext;

class PlusContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterPlus(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitPlus(this);
		}
	}


}

regexParser.PlusContext = PlusContext;

class AtomContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	ATOM() {
	    return this.getToken(regexParser.ATOM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterAtom(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitAtom(this);
		}
	}


}

regexParser.AtomContext = AtomContext;

class IntervalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	NUMBER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(regexParser.NUMBER);
	    } else {
	        return this.getToken(regexParser.NUMBER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterInterval(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitInterval(this);
		}
	}


}

regexParser.IntervalContext = IntervalContext;

class ReferenceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = regexParser.RULE_reference;
    }

	IDENTIFIER() {
	    return this.getToken(regexParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.enterReference(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof regexListener ) {
	        listener.exitReference(this);
		}
	}


}




regexParser.ModelContext = ModelContext; 
regexParser.ExpressionContext = ExpressionContext; 
regexParser.ReferenceContext = ReferenceContext; 
