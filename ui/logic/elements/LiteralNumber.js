import Template from "../../../util/Template.js";
import AbstractElement from "./AbstractElement.js";

const TPL_CAPTION = "NUMBER";
const TPL_BACKGROUND = "#ffffff";
const TPL_BORDER = "#777777";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div id="header" class="header">${TPL_CAPTION}</div>
    <div id="ref" class="body"></div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header" data-value="0">${TPL_CAPTION}</div>
        <div id="ref" class="body"></div>
    </div>
`);

export default class LiteralNumber extends AbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
    }

    get ref() {
        return this.getAttribute('ref');
    }

    set ref(val) {
        this.setAttribute('ref', val);
    }

    get category() {
        return this.getAttribute('category');
    }

    set category(val) {
        this.setAttribute('category', val);
    }

    calculate(state = {}) {
        if (state.hasOwnProperty(this.ref)) {
            let val = +!!state[this.ref];
            this.shadowRoot.getElementById('header').setAttribute('value', val);
            return val;
        } else {
            this.shadowRoot.getElementById('header').setAttribute('value', "0");
            return 0;
        }
    }

    loadLogic(logic) {
        this.ref = logic.el;
        this.shadowRoot.getElementById("ref").innerHTML = this.ref;
        if (!!logic.category) {
            this.category = logic.category;
            this.shadowRoot.getElementById('header').innerHTML = logic.category.toUpperCase();
        }
    }

    toJSON() {
        if (!!this.category) {
            return {
                type: "number",
                el: this.ref,
                category: this.category
            };
        } else {
            return {
                type: "number",
                el: this.ref
            };
        }
    }

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

AbstractElement.registerReference("number", LiteralNumber);
customElements.define('deep-logic-number', LiteralNumber);