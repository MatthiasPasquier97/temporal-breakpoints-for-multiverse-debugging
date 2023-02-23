class STR2TR{
    constructor(aSTR, accepting=null) {
        this.operand = aSTR;
        this.localAccepting = accepting;
    }
    initial() {
        return this.operand.initial();
    }
    async next(source) {
        let tr_targets = [];
        let actions = await this.operand.actions(source);
        for (let action of actions) {
            let targets = await this.operand.execute(action, source);
            tr_targets.push(...targets);
        }
        return tr_targets;
    }
    accepting(c) {
        if (this.localAccepting != null){
            return this.localAccepting(c)
        }
        return this.operand.isAccepting(c);
    }
}

export { STR2TR }