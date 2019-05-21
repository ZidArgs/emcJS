import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: palevioletred;
            --logic-color-border: #774455;
        }
    </style>
    <div class="header">NOR</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
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

}

DeepLogicAbstractElement.registerReference("nor", DeepLogicNor);
customElements.define('deep-logic-nor', DeepLogicNor);