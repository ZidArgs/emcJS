import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: orange;
            --logic-color-border: #aa7700;
        }
    </style>
    <div class="header">NAND</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);

export default class DeepLogicNand extends DeepLogicAbstractElement {

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

    visualizeValue() {
        if (this.children.length > 0) {
            let values = Array.from(this.children).map(el => {
                return el.visualizeValue();
            });
            if (values.some(v => v === false)) {
                this.shadowRoot.querySelector(".header").dataset.value = "true";
                return true;
            }
            if (values.some(v => v === true)) {
                this.shadowRoot.querySelector(".header").dataset.value = "false";
                return false;
            }
        }
        this.shadowRoot.querySelector(".header").dataset.value = "";
    }

    update() {
        let newValue;
        let ch = this.children;
        for (let c of ch) {
            if (typeof c.value != "undefined") {
                newValue = +!c.value;
                if (!newValue) {
                    break;
                }
            }
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "nand",
                el: Array.from(this.children).map(e => e.toJSON())
            };
        }
        return {
            type: "nand",
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

}

DeepLogicAbstractElement.registerReference("nand", DeepLogicNand);
customElements.define('deep-logic-nand', DeepLogicNand);