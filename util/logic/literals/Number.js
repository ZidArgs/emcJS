import AbstractElement from "../AbstractElement.js";

let REF = new WeakMap();

export default class Number extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            REF.set(this, logic.el);
        }
    }

    toString() {
        return `(values.get("${REF.get(this)}")||0)`;
    }

}

AbstractElement.registerReference("number", Number);