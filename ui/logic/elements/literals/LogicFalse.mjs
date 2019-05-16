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

    update() {
        this.setAttribute('value', "0");
    }

    get value() {
        return 0;
    }

    set value(val) {
        this.setAttribute('value', "0");
    }

    toJSON() {
        return {
            type: "false"
        };
    }

    loadLogic(logic) {}

}

DeepLogicAbstractElement.registerReference("false", DeepLogicFalse);
customElements.define('deep-logic-false', DeepLogicFalse);