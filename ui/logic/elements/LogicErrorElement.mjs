import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: #ff0000;
            --logic-color-border: #770000;
            --logic-color-text: #ffffff;
        }
    </style>
    <div class="header">ERROR: REFERENCE NOT FOUND</div>
`);

export default class DeepLogicTrue extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
    }

    getElement() {
        return this;
    }

    visualizeValue() {}

    toJSON() {}

}

customElements.define('deep-logic-true', DeepLogicTrue);