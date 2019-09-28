import Template from "../../../../util/Template.js";
import DeepLogicAbstractElement from "../LogicAbstractElement.js";

const TPL_CAPTION = "FALSE";
const TPL_BACKGROUND = "#fb7c7c";
const TPL_BORDER = "#650000";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div class="header">${TPL_CAPTION}</div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header" data-value="0">${TPL_CAPTION}</div>
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