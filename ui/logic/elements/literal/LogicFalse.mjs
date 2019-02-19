import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: #ff5f5f;
            --logic-color-border: #650000;
        }
    </style>
    <div class="header">FALSE</div>
`);

export default class DeepLogicFalse extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
    }

    toJSON() {
        return {
            type: "false",
            value: false
        };
    }

}

customElements.define('deep-logic-false', DeepLogicFalse);