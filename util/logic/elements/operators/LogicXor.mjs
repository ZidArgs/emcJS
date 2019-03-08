import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

export default class DeepLogicXor extends DeepLogicAbstractElement {

    update() {
        let ch = this.children;
        let b0, b1;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            b0 = !!ch[0].value;
        }
        if (!!ch[1] && typeof ch[1].value != "undefined") {
            b1 = !!ch[1].value;
        }

        let newValue;
        if (typeof b0 == "undefined") {
            newValue = b1;
        } else if (typeof b1 == "undefined") {
            newValue = b0;
        } else {
            newValue = (b0 != b1);
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
            this.appendChild(el0);
            let el1 = new (DeepLogicAbstractElement.getReference(logic.el1.type));
            el1.loadLogic(logic.el1);
            this.appendChild(el1);
        }
    }

}

DeepLogicAbstractElement.registerReference("xor", DeepLogicXor);