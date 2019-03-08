import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILD = new WeakMap;

export default class DeepLogicMax extends DeepLogicAbstractElement {

    maxValue = Number.MAX_SAFE_INTEGER;

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            newValue = (+ch[0].value) < maxValue;
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
            this.minValue = logic.value;
        }
    }

}

DeepLogicAbstractElement.registerReference("max", DeepLogicMax);