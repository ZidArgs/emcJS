import Template from "../util/Template.mjs";
import DeepLogicAbstractElement from "../ui/logic/elements/LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: white;
            --logic-color-border: lightgrey;
        }
    </style>
    <div class="header">FILTER</div>
    <div id="ref" class="body"></div>
`);

export default class DeepLogicFilter extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.appendChild(TPL.generate());
    }

    visualizeValue() {
        // TODO get actual referenced value
        this.shadowRoot.querySelector(".header").dataset.value = "";
    }

    toJSON() {
        if (this.children.length > 0) {
            let el = this.children[0];
            if (!!el) {
                el = el.toJSON();
            }
            return {
                type: "item",
                item: this.ref
            };
        }
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

DeepLogicAbstractElement.registerReference("filter", DeepLogicFilter);
customElements.define('deep-logic-filter', DeepLogicFilter);