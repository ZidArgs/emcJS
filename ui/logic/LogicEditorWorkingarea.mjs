import Template from "../../util/Template.mjs";
import DeepLogicAbstractElement from "./elements/LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            border: solid 2px;
            background-color: #222;
            border-color: #777;
            overflow: hidden;
        }
        .placeholder {
            display: table;
            margin: 5px;
            padding: 5px 20px;
            background-color: lightgray;
            border: 1px solid gray;
            font-weight: bold;
        }
        slot {
            display: block;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
    <slot id="child">
        <span id="droptarget" class="placeholder">...</span>
    </slot>
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
                ne.removeAttribute("slot");
            }
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicEditorWorkingarea extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById('droptarget');
        target.ondragover = allowDrop;
        target.ondrop = dropOnPlaceholder;
    }

    visualizeValue() {
        let el = this.children[0];
        if (!!el) {
            el.visualizeValue();
        }
    }

    getLogic() {
        let el = this.children[0];
        if (!!el) {
            return el.toJSON();
        }
    }
    
    appendChild(el) {
        if (el instanceof DeepLogicAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            return super.appendChild(el);
        }
    }

}

customElements.define('deep-logiceditor-workingarea', LogicEditorWorkingarea);