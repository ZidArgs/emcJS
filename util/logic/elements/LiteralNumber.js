import AbstractElement from "./AbstractElement.js";

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
        return `(val("${AbstractElement.escape(REF.get(this))}")||0)`;
    }

    getDependency(res = new Set()) {
        res.add(REF.get(this));
        return res;
    }

}

AbstractElement.registerReference("number", LiteralNumber);