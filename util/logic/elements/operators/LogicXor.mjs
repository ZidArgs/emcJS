import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILD0 = new WeakMap;
const CHILD1 = new WeakMap;

export default class DeepLogicXor extends DeepLogicAbstractElement {

    update() {
        let newValue;
        if (CHILD0.has(this)) {
            newValue = !!CHILD0.get(this).value;
        }
        if (CHILD1.has(this)) {
            newValue = !!CHILD1.get(this).value;
        }
        if (newValue !== this.value) {
            this.value = newValue;
            this.onupdate();
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            let el0 = new (DeepLogicAbstractElement.getReference(logic.el0.type));
            el0.loadLogic(logic.el0);
            this.setChild0(el0);
            let el1 = new (DeepLogicAbstractElement.getReference(logic.el1.type));
            el1.loadLogic(logic.el1);
            this.setChild1(el1);
        }
    }
    
    setChild0(el) {
        if (el instanceof DeepLogicAbstractElement) {
            CHILD0.set(this, el);
            el.onupdate = () => this.update();
        }
    }
    
    setChild1(el) {
        if (el instanceof DeepLogicAbstractElement) {
            CHILD1.set(this, el);
            el.onupdate = () => this.update();
        }
    }

}

DeepLogicAbstractElement.registerReference("xor", DeepLogicXor);