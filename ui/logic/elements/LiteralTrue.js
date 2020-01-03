import Template from "../../../util/Template.js";
import AbstractElement from "./AbstractElement.js";

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

export default class LiteralTrue extends AbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
    }

    toJSON() {
        return {
            type: "true"
        };
    }

    toString() {
        return "1";
    }

    loadLogic(logic) {
        this.setAttribute('value', "1");
    }

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

AbstractElement.registerReference("true", LiteralTrue);
customElements.define('deep-logic-true', LiteralTrue);