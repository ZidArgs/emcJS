import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicNot extends LogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        if (ch.length > 0) {
            let value = ch[0].value;
            if (typeof value != "undefined") {
                newValue = +!value;
            }
        }
        this.value = newValue;
    }

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (LogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.append(el);
        }
    }

    toString() {
        return `!${this.children[0]}`;
    }

}

LogicAbstractElement.registerReference("not", LogicNot);