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
            let ne = el.getElement(event.ctrlKey);
            ne.removeAttribute("slot");
            event.target.getRootNode().host.appendChild(ne);
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicNor extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = allowDrop;
        target.ondrop = dropOnPlaceholder;
    }

    toJSON() {
        return {
            type: "operator",
            el: "nor",
            children: Array.from(this.children).map(e => e.toJSON())
        };
    }

}

customElements.define('deep-logic-nor', LogicNor);