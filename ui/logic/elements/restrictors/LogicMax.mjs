import Template from "../../../../util/Template.mjs";
import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: deeppink;
            --logic-color-border: #aa0022;
        }
    </style>
    <div class="header">MAX</div>
    <div class="body">
        <input id="input" type="number" value="0" />
        <slot id="children">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);

export default class DeepLogicMax extends DeepLogicAbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = DeepLogicAbstractElement.allowDrop;
        target.ondrop = DeepLogicAbstractElement.dropOnPlaceholder;
        target.onclick = function(event) {
            let e = new Event('placeholderclicked');
            e.name = event.target.name;
            this.dispatchEvent(e);
            event.stopPropagation();
        }.bind(this);
        this.shadowRoot.getElementById("input").addEventListener('change', (event) => {
            this.update();
        });
    }

    update() {
        let newValue;
        let ch = this.children;
        if (!!ch[0] && typeof ch[0].value != "undefined") {
            newValue = +((+ch[0].value) <= this.shadowRoot.getElementById("input").value);
        }
        this.value = newValue;
    }

    toJSON() {
        if (this.children.length > 0) {
            let el = this.children[0];
            if (!!el) {
                el = el.toJSON();
            }
            return {
                type: "max",
                el: el,
                value: this.shadowRoot.getElementById("input").value
            };
        }
        return {
            type: "max",
            el: undefined
        };
    }

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.append(el);
            this.shadowRoot.getElementById("input").value = logic.value;
        }
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'readonly':
                if (oldValue != newValue) {
                    let input = this.shadowRoot.getElementById('input');
                    if (newValue != null) {
                        input.setAttribute("disabled", newValue);
                    } else {
                        input.removeAttribute("disabled");
                    }
                }
                break;
        }
    }

}

DeepLogicAbstractElement.registerReference("max", DeepLogicMax);
customElements.define('deep-logic-max', DeepLogicMax);