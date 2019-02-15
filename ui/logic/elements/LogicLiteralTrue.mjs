import Template from "../util/Template.mjs";
import DeepAbstractLogicElement from "./AbstractLogicElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            background-color: #8c8fff;
            border: 1px solid #0d00d6;
        }
    </style>
    <div class="operator-header">TRUE</div>
`);

export default class DeepLogicLiteralTrue extends DeepAbstractLogicElement {

    constructor() {
        this.shadowRoot.appendChild(TPL.generate());
    }

    toJSON() {
        return {
            type: "literal",
            el: "true",
            value: true
        };
    }

}

customElements.define('deep-logicliteraltrue', DeepLogicLiteralTrue);