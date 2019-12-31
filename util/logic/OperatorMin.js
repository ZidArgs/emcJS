import AbstractElement from "./AbstractElement.js";

let LIMIT = new WeakMap();

export default class OperatorMin extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let cl = AbstractElement.getReference(logic.type);
            if (!cl) return;
            let el = new cl;
            el.loadLogic(logic.el);
            this.append(el);
            LIMIT.set(this, logic.value);
        }
    }

    toString() {
        let ch = this.children;
        ch = !!ch[0] && ch[0].toString();
        if (!ch) {
            return "";
        }
        return `(${ch}>=${LIMIT.get(this)})`;
    }

}

AbstractElement.registerReference("min", OperatorMin);