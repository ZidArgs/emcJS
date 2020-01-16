import AbstractElement from "./AbstractElement.js";

function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\"');
}

let REF = new WeakMap();

export default class LiteralNumber extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            REF.set(this, logic.el);
        } else {
            REF.set(this, "");
        }
    }

    toString() {
        return `(val("${esc(REF.get(this))}")||0)`;
    }

    getDependency(res = new Set()) {
        res.add(REF.get(this));
        return res;
    }

}

AbstractElement.registerReference("number", LiteralNumber);