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
            flex-direction: column;
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
            color: black;
            background-color: lightgray;
            border: 1px solid gray;
            font-weight: bold;
        }
        #title-container {
            display: flex;
            top: 0;
            padding: 8px;
            background-color: #777;
            color: #fff;
        }
        #title {
            display: inline-flex;
            flex: 1;
        }
        slot {
            display: block;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
    <div id="title-container">
        <span id="title"></span>
        <span id="save" class="button lsf">save</span>
        <span id="load" class="button lsf">upload</span>
        <span id="clear" class="button lsf">delete</span>
    </div>
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

    getLogic() {
        let el = this.children[0];
        if (!!el) {
            return el.toJSON();
        }
    }

    loadLogic(logic) { // FIXME why will this sometimes not be applied
        if (!!this.children.length) this.removeChild(this.children[0]);
        if (!!logic) {
            let el = new (DeepLogicAbstractElement.getReference(logic.type));
            el.loadLogic(logic);
            this.appendChild(el);
        }
    }
    
    appendChild(el) {
        if (el instanceof DeepLogicAbstractElement && (typeof this.template != "string" || this.template == "false")) {
            return super.appendChild(el);
        }
    }

    get caption() {
        return this.getAttribute('caption');
    }

    set caption(val) {
        this.setAttribute('caption', val);
    }

    static get observedAttributes() {
        return ['caption'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'caption':
                if (oldValue != newValue) {
                    this.shadowRoot.getElementById('title').innerHTML = newValue;
                }
                break;
        }
    }

}

customElements.define('deep-logiceditor-workingarea', LogicEditorWorkingarea);