import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicXor extends LogicAbstractElement {

    loadLogic(logic) {
        if (!!logic) {
            if (!!logic.el0) {
                let el0 = new (LogicAbstractElement.getReference(logic.el0.type));
                el0.loadLogic(logic.el0);
                this.append(el0);
            }
            if (!!logic.el1) {
                let el1 = new (LogicAbstractElement.getReference(logic.el1.type));
                el1.loadLogic(logic.el1);
                this.append(el1);
            }
        }
    }

    toString() {
        let ch = this.children;
        let ch0 = !!ch[0] && ch[0].toString();
        let ch1 = !!ch[1] && ch[1].toString();
        if (!ch0 || !ch1) {
            return "";
        }
        return `(!${ch0}!=!${ch1})`;
    }

}

LogicAbstractElement.registerReference("xor", LogicXor);