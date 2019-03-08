import Template from "../util/Template.mjs";
import DeepLogicAbstractElement from "../ui/logic/elements/LogicAbstractElement.mjs";
import localState from "./LocalState.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: white;
            --logic-color-border: lightgrey;
        }
        :host([visualize]:not([visualize="false"])[value]) .header:before {
            background-color: #85ff85;
            content: attr(data-value);
        }
        :host([visualize]:not([visualize="false"])[value="0"]) .header:before,
        :host([visualize]:not([visualize="false"])[value="false"]) .header:before {
            background-color: #ff8585;
            content: "FALSE";
        }
    </style>
    <div id="head" class="header">ITEM</div>
    <div id="ref" class="body"></div>
`);

export default class DeepLogicItem extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
    }

    update() {
        this.value = localState.read("items", this.ref, false);
        this.shadowRoot.getElementById("head").dataset.value = this.value;
    }

    toJSON() {
        return {
            type: "item",
            item: this.ref
        };
    }

    get ref() {
        return this.getAttribute('ref');
    }

    set ref(val) {
        this.setAttribute('ref', val);
    }

    static get observedAttributes() {
        return ['ref'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'ref':
                if (oldValue != newValue) {
                    this.shadowRoot.getElementById("ref").innerHTML = this.ref;
                    this.value = localState.read("items", this.ref, false);
                    this.shadowRoot.getElementById("head").dataset.value = this.value;
                }
                break;
        }
    }

    loadLogic(logic) {
        if (!!logic) {
            this.ref = logic.el;
        }
    }

}

DeepLogicAbstractElement.registerReference("item", DeepLogicItem);
customElements.define('deep-logic-item', DeepLogicItem);