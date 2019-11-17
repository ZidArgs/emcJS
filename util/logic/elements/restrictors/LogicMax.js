import LogicAbstractElement from "../LogicAbstractElement.js";

let LIMIT = new WeakMap();

export default class LogicMax extends LogicAbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
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

LogicAbstractElement.registerReference("max", LogicMax);