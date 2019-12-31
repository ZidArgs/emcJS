import AbstractElement from "../AbstractElement.js";

let LIMIT = new WeakMap();

export default class LogicMax extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (DeepAbstractElement.getReference(logic.el.type));
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
        return `(${ch}<=${LIMIT.get(this)})`;
    }

}

AbstractElement.registerReference("max", LogicMax);