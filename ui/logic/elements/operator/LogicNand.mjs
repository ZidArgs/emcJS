import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: orange;
            --logic-color-border: #aa7700;
        }
    </style>
    <div class="header">NAND</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);

export default class DeepLogicNand extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
    }

    visualizeValue() {
        if (this.children.length > 0) {
            let values = Array.from(this.children).map(el => {
                return el.visualizeValue();
            });
            if (values.some(v => v === false)) {
                this.shadowRoot.querySelector(".header").dataset.value = "true";
                return true;
            }
            if (values.some(v => v === true)) {
                this.shadowRoot.querySelector(".header").dataset.value = "false";
                return false;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "nand",
                el: Array.from(this.children).map(e => e.toJSON())
            };
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            logic.el.forEach(ch => {
                let el = new (DeepLogicAbstractElement.getReference(ch.type));
                el.loadLogic(ch);
                this.appendChild(el);
            });
        }
    }

}

DeepLogicAbstractElement.registerReference("nand", DeepLogicNand);
customElements.define('deep-logic-nand', DeepLogicNand);