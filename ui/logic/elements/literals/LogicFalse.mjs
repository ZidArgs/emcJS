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
const SVG = new Template(`
    <div class="logic-element" data-value="0" style="--logic-color-back: #ff5f5f; --logic-color-border: #650000;">
        <div class="header" data-value="0">FALSE</div>
    </div>
`);

export default class DeepLogicFalse extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
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

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

DeepLogicAbstractElement.registerReference("false", DeepLogicFalse);
customElements.define('deep-logic-false', DeepLogicFalse);