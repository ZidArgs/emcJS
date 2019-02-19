import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: #00aacc;
            --logic-color-border: #003377;
        }
    </style>
    <div class="header">!=</div>
    <div class="body">
        <slot id="child0" name="slot0">
            <span id="droptarget0" class="placeholder">...</span>
        </slot>
        <slot id="child1" name="slot1">
            <span id="droptarget1" class="placeholder">...</span>
        </slot>
    </div>
`);

function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function dropOnPlaceholder(event) {
    if (!!event.dataTransfer) {
        var id = event.dataTransfer.getData("logic-transfer-id");
        var el = document.getElementById(id);
        if (!!el) {
            let ne = event.target.getRootNode().host.appendChild(el.getElement(event.ctrlKey));
            if (!!ne) {
                ne.setAttribute("slot", event.target.parentElement.name);
            }
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicNeq extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target0 = this.shadowRoot.getElementById("droptarget0");
        let target1 = this.shadowRoot.getElementById("droptarget1");
        target0.ondragover = allowDrop;
        target1.ondragover = allowDrop;
        target0.ondrop = dropOnPlaceholder;
        target1.ondrop = dropOnPlaceholder;
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
                type: "neq",
                child0: el0,
                child1: el1
            };
        }
    }

}

customElements.define('deep-logic-neq', LogicNeq);