import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: violet;
            --logic-color-border: darkmagenta;
        }
    </style>
    <div class="header">MIN</div>
    <div class="body">
        <input id="input" type="number" value="0" />
        <slot id="children">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);

export default class DeepLogicMin extends DeepLogicAbstractElement {

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
                this.shadowRoot.querySelector(".header").dataset.value = value >= this.shadowRoot.getElementById("input").value;
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
                type: "min",
                el: el,
                value: this.shadowRoot.getElementById("input").value
            };
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.appendChild(el);
            this.shadowRoot.getElementById("input").value = logic.value;
        }
    }

}

DeepLogicAbstractElement.registerReference("min", DeepLogicMin);
customElements.define('deep-logic-min', DeepLogicMin);