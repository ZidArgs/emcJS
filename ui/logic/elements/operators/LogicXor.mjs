import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: aqua;
            --logic-color-border: #009999;
        }
    </style>
    <div class="header">XOR</div>
    <div class="body">
        <slot id="child0" name="slot0">
            <span id="droptarget0" class="placeholder">...</span>
        </slot>
        <slot id="child1" name="slot1">
            <span id="droptarget1" class="placeholder">...</span>
        </slot>
    </div>
`);

export default class DeepLogicXor extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target0 = this.shadowRoot.getElementById("droptarget0");
        let target1 = this.shadowRoot.getElementById("droptarget1");
        target0.ondragover = DeepLogicAbstractElement.allowDrop;
        target1.ondragover = DeepLogicAbstractElement.allowDrop;
        target0.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
        target1.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
    }

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            if (!!ch[1] && typeof ch[1].value != "undefined") {
                newValue = !!ch[0].value != !!ch[1].value;
            } else {
                newValue = !!ch[0].value;
            }
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            let el0 = this.children[0];
            if (!!el0) {
                el0 = el0.toJSON();
            }
            let el1 = this.children[1];
            if (!!el1) {
                el1 = el1.toJSON();
            }
            return {
                type: "xor",
                el0: el0,
                el1: el1
            };
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            if (!!logic.el0) {
                let el0 = new (DeepLogicAbstractElement.getReference(logic.el0.type));
                el0.loadLogic(logic.el0);
                this.appendChild(el0);
            }
            if (!!logic.el1) {
                let el1 = new (DeepLogicAbstractElement.getReference(logic.el1.type));
                el1.loadLogic(logic.el1);
                this.appendChild(el1);
            }
        }
    }

}

DeepLogicAbstractElement.registerReference("xor", DeepLogicXor);
customElements.define('deep-logic-xor', DeepLogicXor);