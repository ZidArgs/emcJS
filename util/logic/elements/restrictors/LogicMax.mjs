import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILD = new WeakMap;

export default class DeepLogicMax extends DeepLogicAbstractElement {

    maxValue = Number.MAX_SAFE_INTEGER;

    update() {
        let newValue;
        if (CHILD.has(this)) {
            let buf = +CHILD.get(this).value;
            if (!isNaN(buf)) {
                newValue = buf < maxValue;
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
            this.setChild(el);
            this.minValue = logic.value;
        }
    }
    
    setChild(el) {
        if (el instanceof DeepLogicAbstractElement) {
            CHILD.set(this, el);
            el.onupdate = () => this.update();
        }
    }

}

DeepLogicAbstractElement.registerReference("max", DeepLogicMax);