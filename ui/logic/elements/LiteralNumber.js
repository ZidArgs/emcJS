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
    <div class="header">${TPL_CAPTION}</div>
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

    toString() {
        return this.getAttribute('value') || "0";
    }

    loadLogic(logic, state = {}) {
        this.ref = logic.el;
        let bdy = this.shadowRoot.getElementById("ref");
        bdy.innerHTML = this.ref;
        if (!!logic.category) {
            this.category = logic.category;
            this.shadowRoot.querySelector('.header').innerHTML = logic.category.toUpperCase();
        }
        // value
        if (state.hasOwnProperty(logic.el)) {
            this.setAttribute('value', +!!state[logic.el]);
        } else {
            this.setAttribute('value', "0");
        }
    }

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

AbstractElement.registerReference("false", LiteralNumber);
customElements.define('deep-logic-false', LiteralNumber);