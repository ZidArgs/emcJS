import AbstractElement from "./AbstractElement.js";

export default class OperatorXor extends AbstractElement {

    loadLogic(logic) {
        if (!!logic) {
            if (!!logic.el0) {
                let cl = AbstractElement.getReference(logic.el0.type);
                if (!cl) return;
                let el0 = new cl;
                el0.loadLogic(logic.el0);
                this.append(el0);
            }
            if (!!logic.el1) {
                let cl = AbstractElement.getReference(logic.el1.type);
                if (!cl) return;
                let el1 = new cl;
                el1.loadLogic(logic.el1);
                this.append(el1);
            }
        }
    }

    toString() {
        let ch = this.children;
        let ch0 = !!ch[0] && ch[0].toString();
        let ch1 = !!ch[1] && ch[1].toString();
        if (!ch0 && !ch1) {
            return "";
        }
        if (!ch0) {
            return ch1;
        }
        if (!ch1) {
            return ch0;
        }
        return `(!${ch0}!=!${ch1})`;
    }

}

AbstractElement.registerReference("xor", OperatorXor);