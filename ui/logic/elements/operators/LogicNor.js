import Template from "../../../../util/Template.js";
import DeepLogicAbstractElement from "../LogicAbstractElement.js";

const TPL_CAPTION = "NOR";
const TPL_BG_0 = "#bcdefb";
const TPL_BG_1 = "#ffdfe4";
const TPL_BACKGROUND = `repeating-linear-gradient(145deg, ${TPL_BG_0}, ${TPL_BG_0} 20px, ${TPL_BG_1} 20px, ${TPL_BG_1} 40px)`;
const TPL_BORDER = "#37a3ff";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div class="header">${TPL_CAPTION}</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header">${TPL_CAPTION}</div>
        <div class="body"></div>
    </div>
`);

export default class DeepLogicNor extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
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
        for (let c of ch) {
            if (typeof c.value != "undefined") {
                newValue = +!c.value;
                if (!!newValue) {
                    break;
                }
            }
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "nor",
                el: Array.from(this.children).map(e => e.toJSON())
            };
        }
        return {
            type: "nor",
            el: []
        };
    }

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            logic.el.forEach(ch => {
                if (!!ch) {
                    let el = new (DeepLogicAbstractElement.getReference(ch.type));
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
                    let el = DeepLogicAbstractElement.getReference(ch.type).getSVG(ch);
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
            el.dataset.value = +!newValue;
            hdr.dataset.value = +!newValue;
        }
        return el;
    }

}

DeepLogicAbstractElement.registerReference("nor", DeepLogicNor);
customElements.define('deep-logic-nor', DeepLogicNor);