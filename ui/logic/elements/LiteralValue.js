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
    <div id="header" class="header">${TPL_CAPTION}</div>
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
    }

    get ref() {
        return this.getAttribute('ref');
    }

    set ref(val) {
        this.setAttribute('ref', val);
    }

    get expects() {
        return this.getAttribute('expects');
    }

    set expects(val) {
        this.setAttribute('expects', val);
    }

    get category() {
        return this.getAttribute('category');
    }

    set category(val) {
        this.setAttribute('category', val);
    }

    calculate(state = {}) {
        if (state.hasOwnProperty(this.ref)) {
            let val = +(state[this.ref] == this.expects);
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
        this.expects = logic.el;
        this.shadowRoot.getElementById('value').innerHTML = this.expects;
        if (!!logic.category) {
            this.category = logic.category;
            //this.shadowRoot.getElementById('header').innerHTML = logic.category.toUpperCase();
        }
    }

    toJSON() {
        if (!!this.category) {
            return {
                type: "value",
                el: this.ref,
                value: this.expects,
                category: this.category
            };
        } else {
            return {
                type: "value",
                el: this.ref,
                value: this.expects
            };
        }
    }

    static getSVG(logic) {
        return SVG.generate().children[0];
    }

}

AbstractElement.registerReference("value", LiteralValue);
customElements.define('deep-logic-value', LiteralValue);