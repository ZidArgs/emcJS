import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const min = new WeakMap;

export default class DeepLogicMin extends DeepLogicAbstractElement {

    minValue = Number.MIN_SAFE_INTEGER;

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            newValue = (+ch[0].value) > minValue;
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

DeepLogicAbstractElement.registerReference("min", DeepLogicMin);