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
        this.shadowRoot.append(TPL.generate());
    }

    update() {
        this.setAttribute('value', "1");
    }

    get value() {
        return 1;
    }

    set value(val) {
        this.setAttribute('value', "1");
    }

    toJSON() {
        return {
            type: "true"
        };
    }

    loadLogic(logic) {}

}

DeepLogicAbstractElement.registerReference("true", DeepLogicTrue);
customElements.define('deep-logic-true', DeepLogicTrue);