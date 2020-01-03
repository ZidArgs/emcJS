import Template from "../../../util/Template.js";
import AbstractElement from "./AbstractElement.js";

const TPL_CAPTION = "VALUE";
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
    <div id="ref" class="body"></div>
    <div id="value" class="body"></div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header" data-value="0">${TPL_CAPTION}</div>
    </div>
`);

export default class LiteralValue extends AbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let select = this.shadowRoot.getElementById('select');
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
        let value;
        if (SELECTOR_VALUE.has(this)) {
            value = SELECTOR_VALUE.get(this);
        }
        if (!!this.category) {
            return {
                type: "number",
                el: this.ref,
                value: value,
                category: this.category
            };
        } else {
            return {
                type: "number",
                el: this.ref,
                value: value
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
        this.shadowRoot.getElementById('value').value = logic.value;
        // value
        if (state.hasOwnProperty(logic.el)) {
            this.setAttribute('value', +(state[logic.el] == logic.value));
        } else {
            this.setAttribute('value', "0");
        }
    }

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

AbstractElement.registerReference("false", LiteralValue);
customElements.define('deep-logic-false', LiteralValue);