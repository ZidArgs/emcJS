import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: #8c8fff;
            --logic-color-border: #0d00d6;
        }
    </style>
    <div class="header">TRUE</div>
`);

export default class DeepLogicTrue extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
    }

    visualizeValue() {
        this.shadowRoot.querySelector(".header").dataset.value = "true";
        return true;
    }

    toJSON() {
        return {
            type: "true",
            value: true
        };
    }

    loadLogic(logic) {}

}

DeepLogicAbstractElement.registerReference("true", DeepLogicTrue);
customElements.define('deep-logic-true', DeepLogicTrue);