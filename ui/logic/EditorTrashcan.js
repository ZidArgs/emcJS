import Template from "../../util/Template.js";
import LogicAbstractElement from "./elements/AbstractElement.js";

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
        let id = event.dataTransfer.getData("logic-transfer-id");
        let el = document.getElementById(id);
        if (!!el && el instanceof LogicAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            el.parentElement.removeChild(el);
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class EditorTrashcan extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.ondragover = allowDrop;
        this.ondrop = dropOnPlaceholder;
    }

}

customElements.define('emc-logiceditor-trashcan', EditorTrashcan);