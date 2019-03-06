import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const min = new WeakMap;

export default class DeepLogicMin extends DeepLogicAbstractElement {

    minValue = Number.MIN_SAFE_INTEGER;

    update() {
        let newValue;
        if (CHILD.has(this)) {
            let buf = +CHILD.get(this).value;
            if (!isNaN(buf)) {
                newValue = buf > minValue;
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

DeepLogicAbstractElement.registerReference("min", DeepLogicMin);