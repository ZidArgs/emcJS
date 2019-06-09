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
const SVG = new Template(`
    <div class="logic-element" data-value="1" style="--logic-color-back: #8c8fff; --logic-color-border: #0d00d6;">
        <div class="header" data-value="1">TRUE</div>
    </div>
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

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

DeepLogicAbstractElement.registerReference("true", DeepLogicTrue);
customElements.define('deep-logic-true', DeepLogicTrue);