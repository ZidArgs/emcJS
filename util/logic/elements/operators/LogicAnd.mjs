import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

export default class DeepLogicAnd extends DeepLogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        for (let c in ch) {
            if (typeof c.value != "undefined") {
                newValue = !!c.value;
                if (newValue === false) {
                    break;
                }
            }
        }
        if (newValue !== this.value) {
            this.value = newValue;
            this.onupdate();
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.appendChild(el);
        }
    }

}

DeepLogicAbstractElement.registerReference("and", DeepLogicAnd);