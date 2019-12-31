import AbstractElement from "../AbstractElement.js";

let REF = new WeakMap();
let WNT = new WeakMap();

export default class Value extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el && !!logic.value) {
            REF.set(this, logic.el);
            WNT.set(this, logic.value);
        }
    }

    toString() {
        return `values.get("${REF.get(this)}")=="${WNT.get(this)}"`;
    }

}

AbstractElement.registerReference("value", Value);