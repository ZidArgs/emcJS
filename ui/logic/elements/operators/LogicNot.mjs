import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: lightpink;
            --logic-color-border: red;
        }
    </style>
    <div class="header">NOT</div>
    <div class="body">
        <slot id="child">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);

export default class DeepLogicNot extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
    }

    visualizeValue() {
        if (this.children.length > 0) {
            let value = this.children[0].visualizeValue();
            if (typeof value != "undefined") {
                this.shadowRoot.querySelector(".header").dataset.value = !value;
                return !value;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
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
    }

    loadLogic(logic) {
        if (!!logic) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.appendChild(el);
        }
    }

}

DeepLogicAbstractElement.registerReference("not", DeepLogicNot);
customElements.define('deep-logic-not', DeepLogicNot);