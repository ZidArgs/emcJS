import AbstractElement from "./AbstractElement.js";

let LIMIT = new WeakMap();

export default class OperatorMin extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            LIMIT.set(this, parseInt(logic.value) || 0);
            let ch = logic.el;
            if (!!ch) {
                let cl = AbstractElement.getReference(ch.type);
                if (!cl) return;
                let el = new cl;
                el.loadLogic(ch);
                this.append(el);
            }
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