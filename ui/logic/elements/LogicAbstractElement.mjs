import Template from "../../../util/Template.mjs";
import UID from "../../../util/UniqueID.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: table;
            margin: 5px;
            user-select: none;
            border-radius: 2px;
            cursor: move;
            font-family: Arial, sans-serif;
            background-color: var(--logic-color-back, white);
            border-width: 1px;
            border-style: solid;
            border-color: var(--logic-color-border, black);
            -webkit-user-select: none;
            user-select: none;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 35px;
            padding: 5px;
            color: var(--logic-color-text, black);
            user-select: none;
        }
        .header input {
            width: 100px;
            height: 25px;
            text-align: right;
            margin: 0 5px;
        }
        .body {
            display: block;
            padding: 5px;
            border-top-width: 1px;
            border-top-style: solid;
            border-color: var(--logic-color-border, black);
        }
        .placeholder {
            display: table;
            margin: 5px;
            padding: 5px 20px;
            background-color: lightgray;
            border: 1px solid gray;
        }
    </style>
`);

export default class DeepAbstractLogicElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        this.setAttribute("draggable", "true");
        this.setAttribute("id", UID.generate("logic-element"))
        this.ondragstart = function(event) {
            event.dataTransfer.setData("logic-transfer-id", event.target.id);
        }
    }

    getElement(forceCopy = false) {
        if (!!forceCopy || (typeof this.template == "string" && this.template != "false")) {
            let el = this.cloneNode();
            el.removeAttribute('template');
            return el;
        } else {
            return this;
        }
    }

    get template() {
        return this.getAttribute('template');
    }

    set template(val) {
        this.setAttribute('template', val);
    }

}