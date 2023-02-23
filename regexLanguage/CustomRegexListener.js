import regexListener from './regexListener.js';
import {NfaLink, Nfa} from './nfa.js'

class Reference{
	constructor(id){
		this.id = id;
	}
	toNfa(){
		var linkA = new NfaLink(this.id);
		return new Nfa(linkA.start, linkA.end, [linkA])
	}
}

class Star {
	constructor(expression){
		this.expression = expression;
	}
	toNfa(){
		var subNfa = this.expression.toNfa();
		var retLink = new NfaLink(true, subNfa.end, subNfa.start);
		var linkA = new NfaLink(true, null, subNfa.start);
		var linkB = new NfaLink(true, subNfa.end, null);
		var linkC = new NfaLink(true, linkA.start, linkB.end)
		return new Nfa(linkA.start, linkB.end, subNfa.links.concat([retLink, linkA, linkB, linkC]))
	}
}

class Plus {
	constructor(expression){
		this.expression = expression;
	}
	toNfa(){
		var subNfa = this.expression.toNfa();
		var retLink = new NfaLink(true, subNfa.end, subNfa.start);
		return new Nfa(subNfa.start, subNfa.end, subNfa.links.concat([retLink]))
	}
}
class Optional {
	constructor(expression){
		this.expression = expression;
	}
	toNfa(){
		var subNfa = this.expression.toNfa();
		var passLink = new NfaLink(true, subNfa.start, subNfa.end);
		return new Nfa(subNfa.start, subNfa.end, subNfa.links.concat([passLink]))
	}
}

class Interval {
	constructor(expression, low_bound, high_bound=null){
		this.expression = expression;
		this.low_bound = low_bound;
		this.high_bound = (high_bound == null) ? low_bound : high_bound;
	}
	toNfa(){
		var subNfa = this.expression.toNfa();
		for (let index = 0; index < this.low_bound; index++) {
			var addedExp = this.expression.toNfa();
			for (var link of addedExp.links){
				if (link.start == addedExp.start){
					link.start = subNfa.end;
				}
				if (link.end == addedExp.start){
					link.end = subNfa.end;
				}
			}
			subNfa = new Nfa(subNfa.start, addedExp.end, subNfa.links.concat(addedExp.links));
		}
		return subNfa;
	}
}

class Sequence {
	constructor(expression1, expression2){
		this.expression1 = expression1;
		this.expression2 = expression2;
	}
	toNfa(){
		var subNfa1 = this.expression1.toNfa();
		var subNfa2 = this.expression2.toNfa();
		for (var link of subNfa2.links){
			if (link.start == subNfa2.start){
				link.start = subNfa1.end;
			}
			if (link.end == subNfa2.start){
				link.end = subNfa1.end;
			}
		}
		return new Nfa(subNfa1.start, subNfa2.end, subNfa1.links.concat(subNfa2.links))
	}
}

class Alternative {
	constructor(expression1, expression2){
		this.expression1 = expression1;
		this.expression2 = expression2;
	}
	toNfa(){
		var subNfa1 = this.expression1.toNfa();
		var subNfa2 = this.expression2.toNfa();
		var linkA = new NfaLink(true, null, subNfa1.start);
		var linkB = new NfaLink(true, linkA.start, subNfa2.start);
		var linkC = new NfaLink(true, subNfa1.end, null);
		var linkD = new NfaLink(true, subNfa2.end, linkC.end);
		return new Nfa(linkA.start, linkC.end, subNfa1.links.concat(subNfa2.links).concat([linkA, linkB, linkC, linkD]))
	}
}

class Declaration {
	constructor(identifier, expression) {
		this.identifier = identifier;
		this.expression = expression;
	}
}

class Atom {
	constructor(expression){
		this.expression = expression.slice(1, -1);
	}
	toNfa(){
		var linkA = new NfaLink(this.expression);
		return new Nfa(linkA.start, linkA.end, [linkA])
	}
}



var map = {};

// This class defines a complete listener for a parse tree produced by regexParser.
export default class CustomRegexListener extends regexListener {

	returnMap(){
		return map;
	}

	// Enter a parse tree produced by regexParser#model.
	enterModel(ctx) {
	}

	// Exit a parse tree produced by regexParser#model.
	exitModel(ctx) {
		map[ctx] = map[ctx.children[0]]
	}


	// Enter a parse tree produced by regexParser#declaration.
	enterDeclaration(ctx) {
	}

	// Exit a parse tree produced by regexParser#declaration.
	exitDeclaration(ctx) {
		map[ctx] = new Declaration(ctx.children[0].getText(), map[ctx.children[2]])
	}


	// Enter a parse tree produced by regexParser#Ref.
	enterRef(ctx) {
	}

	// Exit a parse tree produced by regexParser#Ref.
	exitRef(ctx) {
		map[ctx] = map[ctx.children[0]]
	}


	// Enter a parse tree produced by regexParser#Parenthesis.
	enterParenthesis(ctx) {
	}

	// Exit a parse tree produced by regexParser#Parenthesis.
	exitParenthesis(ctx) {

		map[ctx] = map[ctx.children[1]]
	}


	// Enter a parse tree produced by regexParser#Alternative.
	enterAlternative(ctx) {
	}

	// Exit a parse tree produced by regexParser#Alternative.
	exitAlternative(ctx) {
		map[ctx] = new Alternative(map[ctx.children[0]], map[ctx.children[2]])
	}


	// Enter a parse tree produced by regexParser#Optional.
	enterOptional(ctx) {
	}

	// Exit a parse tree produced by regexParser#Optional.
	exitOptional(ctx) {
		map[ctx] = new Optional(map[ctx.children[0]])

	}

	// Enter a parse tree produced by regexParser#Star.
	enterStar(ctx) {
	}

	// Exit a parse tree produced by regexParser#Star.
	exitStar(ctx) {
		map[ctx] = new Star(map[ctx.children[0]])
	}


	// Enter a parse tree produced by regexParser#Sequence.
	enterSequence(ctx) {
	}

	// Exit a parse tree produced by regexParser#Sequence.
	exitSequence(ctx) {
		map[ctx] = new Sequence(map[ctx.children[0]], map[ctx.children[2]]);
	}


	// Enter a parse tree produced by regexParser#Plus.
	enterPlus(ctx) {
	}

	// Exit a parse tree produced by regexParser#Plus.
	exitPlus(ctx) {
		map[ctx] = new Plus(map[ctx.children[0]])
	}


	// Enter a parse tree produced by regexParser#Interval.
	enterInterval(ctx) {
	}

	// Exit a parse tree produced by regexParser#Interval.
	exitInterval(ctx) {
		map[ctx] = new Interval(map[ctx.children[0]], (ctx.children[2]).symbol.text)
	}

	// Enter a parse tree produced by regexParser#Atom.
	enterAtom(ctx) {
	}
	
	// Exit a parse tree produced by regexParser#Atom.
	exitAtom(ctx) {
		map[ctx] = new Atom(ctx.ATOM().getText());
	}


	// Enter a parse tree produced by regexParser#reference.
	enterReference(ctx) {
		
	}

	// Exit a parse tree produced by regexParser#reference.
	exitReference(ctx) {
		map[ctx] = new Reference(ctx.IDENTIFIER().getText());
		//console.log(ctx.IDENTIFIER().getText());
	}
}
