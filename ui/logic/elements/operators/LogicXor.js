import Template from "../../../../util/Template.js";
import DeepLogicAbstractElement from "../LogicAbstractElement.js";

const TPL_CAPTION = "XOR";
const TPL_BACKGROUND = "#ffa500";
const TPL_BORDER = "#774455";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div class="header">${TPL_CAPTION}</div>
    <div class="body">
        <slot id="child0" name="slot0">
            <span id="droptarget0" class="placeholder">...</span>
        </slot>
        <slot id="child1" name="slot1">
            <span id="droptarget1" class="placeholder">...</span>
        </slot>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header">${TPL_CAPTION}</div>
        <div class="body"></div>
    </div>
`);

export default class DeepLogicXor extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let target0 = this.shadowRoot.getElementById("droptarget0");
        let target1 = this.shadowRoot.getElementById("droptarget1");
        target0.ondragover = DeepLogicAbstractElement.allowDrop;
        target1.ondragover = DeepLogicAbstractElement.allowDrop;
        target0.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
        target1.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
        target1.onclick = target0.onclick = function(event) {
            let e = new Event('placeholderclicked');
            e.name = event.target.name;
            this.dispatchEvent(e);
            event.stopPropagation();
        }.bind(this);
    }

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            if (!!ch[1] && typeof ch[1].value != "undefined") {
                newValue = +(!!ch[0].value != !!ch[1].value);
            } else {
                newValue = +!!ch[0].value;
            }
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            let el0 = this.children[0];
            if (!!el0) {
                el0 = el0.toJSON();
            }
            let el1 = this.children[1];
            if (!!el1) {
                el1 = el1.toJSON();
            }
            return {
                type: "xor",
                el0: el0,
                el1: el1
            };
        }
        return {
            type: "xor",
            el0: undefined,
            el1: undefined
        };
    }

    loadLogic(logic) {
        if (!!logic) {
            if (!!logic.el0) {
                let el0 = new (DeepLogicAbstractElement.getReference(logic.el0.type));
                el0.loadLogic(logic.el0);
                this.append(el0);
            }
            if (!!logic.el1) {
                let el1 = new (DeepLogicAbstractElement.getReference(logic.el1.type));
                el1.loadLogic(logic.el1);
                this.append(el1);
            }
        }
    }

    static getSVG(logic) {
        let el = SVG.generate().children[0];
        let cnt = el.querySelector(".body");
        let hdr = el.querySelector(".header");
        let newValue;
        if (!!logic) {
            if (!!logic.el0) {
                let el0 = DeepLogicAbstractElement.getReference(logic.el0.type).getSVG(logic.el0);
                if (typeof el0.dataset.value != "undefined") {
                    newValue = !!parseInt(el.dataset.value);
                }
                cnt.append(el0);
            }
            if (!!logic.el1) {
                let el1 = DeepLogicAbstractElement.getReference(logic.el1.type).getSVG(logic.el1);
                if (typeof el1.dataset.value != "undefined") {
                    if (typeof newValue != "undefined") {
                        newValue = newValue ^ !!parseInt(el.dataset.value);
                    } else {
                        newValue = !!parseInt(el.dataset.value);
                    }
                }
                cnt.append(el1);
            }
        }
        if (typeof newValue != "undefined") {
            el.dataset.value = +newValue;
            hdr.dataset.value = +newValue;
        }
        return el;
    }

}

DeepLogicAbstractElement.registerReference("xor", DeepLogicXor);
customElements.define('deep-logic-xor', DeepLogicXor);