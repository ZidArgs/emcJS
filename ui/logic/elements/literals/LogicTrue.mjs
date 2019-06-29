import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL_CAPTION = "TRUE";
const TPL_BACKGROUND = "lightgreen";
const TPL_BORDER = "green";

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
        <div class="header" data-value="1">${TPL_CAPTION}</div>
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