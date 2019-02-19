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

export default class LogicMin extends DeepLogicAbstractElement {

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
                child: el,
                value: this.shadowRoot.getElementById("input").value
            };
        }
    }

}

customElements.define('deep-logic-min', LogicMin);