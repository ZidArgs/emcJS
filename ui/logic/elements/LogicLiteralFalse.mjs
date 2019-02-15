import Template from "../util/Template.mjs";
import DeepAbstractLogicElement from "./AbstractLogicElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            background-color: #ff5f5f;
            border: 1px solid #650000;
        }
    </style>
    <div class="operator-header">FALSE</div>
`);

export default class DeepLogicLiteralFalse extends DeepAbstractLogicElement {

    constructor() {
        this.shadowRoot.appendChild(TPL.generate());
    }

    toJSON() {
        return {
            type: "literal",
            el: "false",
            value: false
        };
    }

}

customElements.define('deep-logicliteralfalse', DeepLogicLiteralFalse);