import LogicAbstractElement from "../LogicAbstractElement.js";

let REF = new WeakMap();

export default class LogicValue extends LogicAbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            REF.set(this, logic.el);
        }
    }

    toString() {
        return `(values.get("${REF.get(this)}")||0)`;
    }

}

LogicAbstractElement.registerReference("", LogicValue);