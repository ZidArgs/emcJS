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
            border-radius: 5px;
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
        .header[data-value]:before {
            display: block;
            width: 10px;
            height: 10px;
            margin-right: 5px;
            border-radius: 50%;
            border: solid 2px black;
            background-color: yellow;
            content: " ";
        }
        .header[data-value="true"]:before {
            background-color: green;
        }
        .header[data-value="false"]:before {
            background-color: red;
        }
        .body {
            display: block;
            padding: 5px;
            border-top-width: 1px;
            border-top-style: solid;
            border-color: var(--logic-color-border, black);
        }
        .body input {
            width: 100px;
            height: 25px;
            text-align: right;
            margin: 0 5px;
        }
        .placeholder {
            display: table;
            margin: 5px;
            padding: 5px 20px;
            background-color: lightgray;
            border: 1px solid gray;
            font-weight: bold;
            cursor: pointer;
        }
        :host([template]:not([template="false"])) .placeholder {
            cursor: default;
        }
        :host([readonly]:not([readonly="false"])) .placeholder {
            display: none;
        }
    </style>
`);

function dragStart(event) {
    event.dataTransfer.setData("logic-transfer-id", event.target.id);
}

// TODO add on placeholder click dialog to append logic elements

const ID = new WeakMap();
const REG = new Map();

export default class DeepLogicAbstractElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        ID.set(this, UID.generate("logic-element"));
    }

    connectedCallback() {
        if (this.readonly === null || this.readonly == "false") {
            this.setAttribute("draggable", "true");
        }
        this.id = ID.get(this);
        this.addEventListener("dragstart", dragStart);
    }

    disconnectedCallback() {
        this.removeAttribute("draggable");
        this.removeAttribute("id");
        this.removeEventListener("dragstart", dragStart);
    }

    getElement(forceCopy = false) {
        if (!!forceCopy || (typeof this.template == "string" && this.template != "false")) {
            let el = this.cloneNode(true);
            el.removeAttribute('template');
            return el;
        } else {
            return this;
        }
    }

    visualizeValue() {
        throw new TypeError("can not call abstract method");
    }

    toJSON() {
        throw new TypeError("can not call abstract method");
    }

    loadLogic() {
        throw new TypeError("can not call abstract method");
    }
    
    appendChild(el) {
        if (el instanceof DeepLogicAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            return super.appendChild(el);
        }
    }

    get template() {
        return this.getAttribute('template');
    }

    set template(val) {
        this.setAttribute('template', val);
    }

    get readonly() {
        return this.getAttribute('readonly');
    }

    set readonly(val) {
        this.setAttribute('readonly', val);
    }

    static get observedAttributes() {
        return ['readonly'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'readonly':
                if (oldValue != newValue) {
                    if (newValue === null || newValue == "false") {
                        this.setAttribute("draggable", "true");
                    } else {
                        this.removeAttribute("draggable");
                    }
                }
                break;
        }
    }

    static registerReference(ref, clazz) {
        if (REG.has(ref)) {
            throw new Error(`reference ${ref} already exists`);
        }
        REG.set(ref, clazz);
    }

    static getReference(ref) {
        if (REG.has(ref)) {
            return REG.get(ref);
        }
        return DeepLogicError;
    }

}

DeepLogicAbstractElement.allowDrop = function allowDrop(event) {
    let el = event.target.getRootNode().host;
    if (el.readonly === null || el.readonly == "false") {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}

DeepLogicAbstractElement.dropOnPlaceholder = function dropOnPlaceholder(event) {
    if (!!event.dataTransfer) {
        var id = event.dataTransfer.getData("logic-transfer-id");
        var el = document.getElementById(id);
        if (!!el) {
            let ne = event.target.getRootNode().host.appendChild(el.getElement(event.ctrlKey));
            if (!!ne) {
                let slot = event.target.parentNode;
                if (slot instanceof HTMLSlotElement && slot.name != null) {
                    ne.setAttribute("slot", slot.name);
                } else {
                    ne.removeAttribute("slot");
                }
            }
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

/**
 * for undefined references
 */
const TPL_E = new Template(`
    <style>
        :host {
            --logic-color-back: #ff0000;
            --logic-color-border: #770000;
            --logic-color-text: #ffffff;
        }
    </style>
    <div class="header">ERROR: REFERENCE NOT FOUND</div>
`);

class DeepLogicError extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL_E.generate());
    }

    getElement() {
        return this;
    }

    visualizeValue() {}

    toJSON() {}

    loadLogic(logic) {}

}

DeepLogicAbstractElement.registerReference("error", DeepLogicError);
customElements.define('deep-logic-error', DeepLogicError);