import AbstractElement from "./AbstractElement.js";

let REF = new WeakMap();

export default class LiteralPointer extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            REF.set(this, logic.el);
        } else {
            REF.set(this, "");
        }
    }

    toString() {
        return `(values.get(values.get("${REF.get(this)}")||"")||0)`;
    }

}

AbstractElement.registerReference("pointer", LiteralPointer);