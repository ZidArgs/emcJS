import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: deeppink;
            --logic-color-border: #aa0022;
        }
    </style>
    <div class="header">MAX</div>
    <div class="body">
        <input id="input" type="number" value="0" />
        <slot id="children">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);

export default class DeepLogicMax extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
        this.shadowRoot.getElementById("input").addEventListener('change', (event) => {
            this.update();
        });
    }

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            newValue = (+ch[0].value) <= this.shadowRoot.getElementById("input").value;
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
                type: "max",
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

DeepLogicAbstractElement.registerReference("max", DeepLogicMax);
customElements.define('deep-logic-max', DeepLogicMax);