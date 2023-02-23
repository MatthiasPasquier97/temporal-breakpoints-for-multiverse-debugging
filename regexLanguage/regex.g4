grammar regex;

model : expression;

expression
    : reference                                 #Ref
    | ATOM                                      #Atom
    | expression '*'                            #Star
    | expression '+'                            #Plus
    | expression '?'                            #Optional
    | expression '{' NUMBER (':' NUMBER)? '}'   #Interval
    | expression '.' expression                 #Sequence
    | expression '||' expression                #Alternative
    | '(' expression ')'                        #Parenthesis
    ;

reference : IDENTIFIER;

NUMBER : [0-9]+;
IDENTIFIER : [a-zA-Z_][a-zA-Z_0-9]*;
ATOM : '|' .*? '|';

LINE_COMMENT : '//' .*? '\n' -> skip ;
COMMENT : '/*' .*? '*/' -> skip ;
WS : [ \r\t\n]+ -> skip ;
