import Template from "../../../util/Template.js";
import AbstractElement from "./AbstractElement.js";

const TPL_CAPTION = "OR";
const TPL_BACKGROUND = "#bcdefb";
const TPL_BORDER = "#37a3ff";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div id="header" class="header">${TPL_CAPTION}</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div id="header" class="header">${TPL_CAPTION}</div>
        <div class="body"></div>
    </div>
`);

export default class OperatorOr extends AbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = AbstractElement.allowDrop;
        target.ondrop = AbstractElement.dropOnPlaceholder;
        target.onclick = function(event) {
            let e = new Event('placeholderclicked');
            e.name = event.target.name;
            this.dispatchEvent(e);
            event.stopPropagation();
        }.bind(this);
    }

    calculate(state = {}) {
        let value;
        let ch = Array.from(this.children).map(el => el.calculate(state));
        for (let val of ch) {
            if (typeof val != "undefined") {
                value = +!!val;
                if (!!value) {
                    break;
                }
            }
        }
        this.shadowRoot.getElementById('header').setAttribute('value', value);
        return value;
    }

    toJSON() {
        return {
            type: "or",
            el: Array.from(this.children).map(e => e.toJSON())
        };
    }

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            logic.el.forEach(ch => {
                if (!!ch) {
                    let el = new (AbstractElement.getReference(ch.type));
                    el.loadLogic(ch);
                    this.append(el);
                }
            });
        }
    }

    static getSVG(logic) {
        let el = SVG.generate().children[0];
        let cnt = el.querySelector(".body");
        let hdr = el.querySelector(".header");
        let newValue;
        if (!!logic && Array.isArray(logic.el)) {
            logic.el.forEach(ch => {
                if (!!ch) {
                    let el = AbstractElement.getReference(ch.type).getSVG(ch);
                    if (typeof el.dataset.value != "undefined") {
                        if (typeof newValue != "undefined") {
                            newValue = newValue || !!parseInt(el.dataset.value);
                        } else {
                            newValue = !!parseInt(el.dataset.value);
                        }
                    }
                    cnt.append(el);
                }
            });
        }
        if (typeof newValue != "undefined") {
            el.dataset.value = +newValue;
            hdr.dataset.value = +newValue;
        }
        return el;
    }

}

AbstractElement.registerReference("or", OperatorOr);
customElements.define('deep-logic-or', OperatorOr);