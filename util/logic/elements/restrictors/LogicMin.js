import LogicAbstractElement from "../LogicAbstractElement.js";

let LIMIT = new WeakMap();

export default class LogicMin extends LogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            newValue = +((+ch[0].value) >= this.shadowRoot.getElementById("input").value);
        }
        this.value = newValue;
    }

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (LogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.append(el);
            LIMIT.set(this, logic.value);
        }
    }

    toString() {
        return `(${this.children[0]}>=${LIMIT.get(this)})`;
    }

}

LogicAbstractElement.registerReference("min", LogicMin);