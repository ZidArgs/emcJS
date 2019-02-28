import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: lightgreen;
            --logic-color-border: green;
        }
    </style>
    <div class="header">OR</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);

export default class DeepLogicOr extends DeepLogicAbstractElement {

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
            if (values.some(v => v === true)) {
                this.shadowRoot.querySelector(".header").dataset.value = "true";
                return true;
            }
            if (values.some(v => v === false)) {
                this.shadowRoot.querySelector(".header").dataset.value = "false";
                return false;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "or",
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

DeepLogicAbstractElement.registerReference("or", DeepLogicOr);
customElements.define('deep-logic-or', DeepLogicOr);