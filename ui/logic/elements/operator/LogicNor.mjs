import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: palevioletred;
            --logic-color-border: #774455;
        }
    </style>
    <div class="header">NOR</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);

export default class LogicNor extends DeepLogicAbstractElement {

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
                this.shadowRoot.querySelector(".header").dataset.value = "false";
                return false;
            }
            if (values.some(v => v === false)) {
                this.shadowRoot.querySelector(".header").dataset.value = "true";
                return true;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "nor",
                children: Array.from(this.children).map(e => e.toJSON())
            };
        }
    }

}

customElements.define('deep-logic-nor', LogicNor);