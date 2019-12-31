import AbstractElement from "../AbstractElement.js";

let REF = new WeakMap();

export default class LogicValue extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            REF.set(this, logic.el);
        }
    }

    toString() {
        return `(values.get("${REF.get(this)}")||0)`;
    }

}

AbstractElement.registerReference("", LogicValue);