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

export default class LogicXor extends DeepLogicAbstractElement {

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

    visualizeValue() {
        if (this.children.length > 0) {
            let v1 = this.children[0].visualizeValue();
            let v2 = this.children[1].visualizeValue();
            if (typeof v1 != "undefined" && typeof v2 != "undefined") {
                this.shadowRoot.querySelector(".header").dataset.value = v1 != v2;
                return v1 != v2;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
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
                child0: el0,
                child1: el1
            };
        }
    }

}

customElements.define('deep-logic-xor', LogicXor);