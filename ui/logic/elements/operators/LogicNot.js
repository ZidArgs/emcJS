import Template from "../../../../util/Template.js";
import AbstractElement from "../AbstractElement.js";

const TPL_CAPTION = "NOT";
const TPL_BACKGROUND = "#ffdfe4";
const TPL_BORDER = "#ff0000";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div class="header">${TPL_CAPTION}</div>
    <div class="body">
        <slot id="child">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header">${TPL_CAPTION}</div>
        <div class="body"></div>
    </div>
`);

export default class DeepLogicNot extends AbstractElement {

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

    update() {
        let newValue;
        let ch = this.children;
        if (ch.length > 0) {
            let value = ch[0].value;
            if (typeof value != "undefined") {
                newValue = +!value;
            }
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            let el = this.children[0];
            if (!!el) {
                el = el.toJSON();
            }
            return {
                type: "not",
                el: el
            };
        }
        return {
            type: "not",
            el: undefined
        };
    }

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (AbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.append(el);
        }
    }

    static getSVG(logic) {
        let el = SVG.generate().children[0];
        let cnt = el.querySelector(".body");
        let hdr = el.querySelector(".header");
        let newValue;
        if (!!logic && !!logic.el) {
            let el = AbstractElement.getReference(logic.el.type).getSVG(logic.el);
            if (typeof el.dataset.value != "undefined") {
                newValue = !!parseInt(el.dataset.value);
            }
            cnt.append(el);
        }
        if (typeof newValue != "undefined") {
            el.dataset.value = +newValue;
            hdr.dataset.value = +newValue;
        }
        return el;
    }

}

AbstractElement.registerReference("not", DeepLogicNot);
customElements.define('deep-logic-not', DeepLogicNot);