import Template from "../../../util/Template.js";
import UGen from "../../../util/UniqueGenerator.js";

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
            font-family: monospace;
            background-color: var(--logic-color-back, white);
            border-width: 1px;
            border-style: solid;
            color: var(--logic-color-text, black);
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
            user-select: none;
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
        :host([readonly]:not([readonly="false"])) {
            cursor: default;
        }
        :host([readonly]:not([readonly="false"])) .placeholder {
            display: none;
        }
    </style>
`);

function dragStart(event) {
    event.dataTransfer.setData("layout-transfer-id", event.target.id);
}

const ID = new WeakMap();
const REG = new Map();

export default class DeepLayoutAbstractElement extends HTMLElement {

    constructor() {
        super();
        if (new.target === DeepLayoutAbstractElement) {
            throw new TypeError("can not construct abstract class");
        }
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        ID.set(this, UGen.appUID("layout-element"));
    }

    connectedCallback() {
        this.id = ID.get(this);
        this.setAttribute("draggable", "true");
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

    toJSON() {
        throw new TypeError("can not call abstract method");
    }

    append(el) {
        if (Array.isArray(el)) {
            el.forEach(e => this.appendChild(e));
        } else {
            this.appendChild(el);
        }
    }

    prepend(el) {
        if (Array.isArray(el)) {
            el.forEach(e => this.insertBefore(e, this.firstChild));
        } else {
            this.insertBefore(el, this.firstChild);
        }
    }
    
    appendChild(el) {
        if (el instanceof DeepLayoutAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            let r = super.appendChild(el);
            return r;
        }
    }

    insertBefore(el, ref) {
        if (el instanceof DeepLayoutAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            let r = super.insertBefore(el, ref);
            return r;
        }
    }

    get template() {
        return this.getAttribute('template');
    }

    set template(val) {
        this.setAttribute('template', val);
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

    static buildLayout(layout) {
        if (typeof layout == "object" && !!layout) {
            if (Array.isArray(layout)) {
                return new DeepLayoutError();
            } else {
                let el = new (DeepLayoutAbstractElement.getReference(layout.type));
                el.loadLogic(layout);
                return el;
            }
        }
        return new (DeepLayoutAbstractElement.getReference(`${layout}`));
    }

    static allowDrop(event) {
        let el = event.target.getRootNode().host;
        if ((typeof el.readonly != "string" || el.readonly == "false")
        &&  (typeof el.template != "string" || el.template == "false")) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }

    static dropOnPlaceholder(event) {
        if (!!event.dataTransfer) {
            let id = event.dataTransfer.getData("logic-transfer-id");
            let el = document.getElementById(id);
            if (!!el && el instanceof DeepLayoutAbstractElement) {
                let ne = event.target.getRootNode().host.append(el.getElement(event.ctrlKey));
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

}

/**
 * for undefined references
 */
const TPL_E = new Template(`
    <style>
        .error {
            --logic-color-back: #ff0000;
            --logic-color-border: #770000;
            --logic-color-text: #ffffff;
        }
    </style>
    <span class="error">ERROR: REFERENCE NOT FOUND</span>
`);

class DeepLayoutError extends DeepLayoutAbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL_E.generate());
    }

    getElement() {
        return this;
    }

    toJSON() {}

    buildLayout(layout) {}

}

customElements.define('deep-logic-error', DeepLogicError);