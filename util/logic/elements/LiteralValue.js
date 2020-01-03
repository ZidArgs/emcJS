import AbstractElement from "./AbstractElement.js";

let REF = new WeakMap();
let WNT = new WeakMap();

export default class LiteralValue extends AbstractElement {

    loadLogic(logic) {
        if (!!logic) {
            if (!!logic.el) {
                REF.set(this, logic.el);
            } else {
                REF.set(this, "");
            }
            if (!!logic.value) {
                WNT.set(this, logic.value);
            } else {
                WNT.set(this, "");
            }
        } else {
            REF.set(this, "");
            WNT.set(this, "");
        }
    }

    toString() {
        return `(values.get("${REF.get(this)}")||"")=="${WNT.get(this)}"`;
    }

}

AbstractElement.registerReference("value", LiteralValue);