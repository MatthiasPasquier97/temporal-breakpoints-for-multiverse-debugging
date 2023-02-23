import STR2TR from "../STR/STR2TR"
const { KripkeBuchiAsymmetricSynchronousProductSemantics, StateEventAsymmetricSynchronousProductSemantics } = AnimUMLUtils.z2mc.synchronous_product_semantics;


function modelCheckingStateBridge(lhs, acceptingL, rhs, acceptingR){
    var accepting = ({kc: c1, bc: c2}) => (kc!=null) ?  acceptingR(c2) : acceptingL(c1) && acceptingR(c2) ;
    return STR2TR(KripkeBuchiAsymmetricSynchronousProductSemantics(lhs, rhs));
}

function modelCheckingStepBridge(lhs, acceptingL, rhs, acceptingR){
    var accepting = ({kc: c1, bc: c2}) => (kc!=null) ?  acceptingR(c2) : acceptingL(c1) && acceptingR(c2) ;
    return STR2TR(KripkeBuchiAsymmetricSynchronousProductSemantics(lhs, rhs));
}