import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILD = new WeakMap;

export default class DeepLogicNot extends DeepLogicAbstractElement {

    update() {
        let newValue;
        if (CHILD.has(this)) {
            newValue = !CHILD.get(this).value;
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
        }
    }
    
    setChild(el) {
        if (el instanceof DeepLogicAbstractElement) {
            CHILD.set(this, el);
            el.onupdate = () => this.update();
        }
    }

}

DeepLogicAbstractElement.registerReference("not", DeepLogicNot);