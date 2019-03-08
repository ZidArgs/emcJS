import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILD = new WeakMap;

export default class DeepLogicNot extends DeepLogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0]) {
            newValue = !ch[0].value;
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

DeepLogicAbstractElement.registerReference("not", DeepLogicNot);