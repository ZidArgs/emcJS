import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: lightyellow;
            --logic-color-border: orange;
        }
    </style>
    <div class="header">AND</div>
    <div class="body">
        <slot id="children"></slot>
        <span id="droptarget" class="placeholder">...</span>
    </div>
`);

function dropOnPlaceholder(event) {
    if (!!event.dataTransfer) {
        var id = event.dataTransfer.getData("logic-transfer-id");
        var el = document.getElementById(id);
        if (!!el) {
            let ne = event.target.getRootNode().host.appendChild(el.getElement(event.ctrlKey));
            if (!!ne) {
                ne.removeAttribute("slot");
            }
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicAnd extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = dropOnPlaceholder;
    }

    toJSON() {
        if (this.children.length > 0) {
            return {
                type: "and",
                children: Array.from(this.children).map(e => e.toJSON())
            };
        }
    }

}

customElements.define('deep-logic-and', LogicAnd);