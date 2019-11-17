import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicXor extends LogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            if (!!ch[1] && typeof ch[1].value != "undefined") {
                newValue = +(!!ch[0].value != !!ch[1].value);
            } else {
                newValue = +!!ch[0].value;
            }
        }
        this.value = newValue;
    }

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
        return `(!${this.children[0]}!=!${this.children[1]})`;
    }

}

LogicAbstractElement.registerReference("xor", LogicXor);