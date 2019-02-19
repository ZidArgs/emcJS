import Template from "../../util/Template.mjs";
import DeepLogicAbstractElement from "./elements/LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            border: solid 2px;
            background-color: #222;
            border-color: #777;
        }
    </style>
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
        if (!!el && el instanceof DeepLogicAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            el.parentElement.removeChild(el);
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicEditorTrashcan extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        this.ondragover = allowDrop;
        this.ondrop = dropOnPlaceholder;
    }

}

customElements.define('deep-logiceditor-trashcan', LogicEditorTrashcan);