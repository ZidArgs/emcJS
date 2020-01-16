import AbstractElement from "./AbstractElement.js";

function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\"');
}

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
        return `(val("${AbstractElement.escape(REF.get(this))}")||"")=="${AbstractElement.escape(WNT.get(this))}"`;
    }

    getDependency(res = new Set()) {
        res.add(REF.get(this));
        return res;
    }

}

AbstractElement.registerReference("value", LiteralValue);