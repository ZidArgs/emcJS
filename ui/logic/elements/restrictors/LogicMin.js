import Template from "../../../../util/Template.js";
import DeepLogicAbstractElement from "../LogicAbstractElement.js";

const TPL_CAPTION = "MIN";
const TPL_BACKGROUND = "#ee82ee";
const TPL_BORDER = "#8b008b";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div class="header">${TPL_CAPTION}</div>
    <div class="body">
        <input id="input" type="number" value="0" />
        <slot id="children">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div class="header">${TPL_CAPTION}</div>
        <div class="body">
            <div class="input" />
        </div>
    </div>
`);

export default class DeepLogicMin extends DeepLogicAbstractElement {

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
            newValue = +((+ch[0].value) >= this.shadowRoot.getElementById("input").value);
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
                type: "min",
                el: el,
                value: this.shadowRoot.getElementById("input").value
            };
        }
        return {
            type: "min",
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

    static getSVG(logic) {
        let el = SVG.generate().children[0];
        let cnt = el.querySelector(".body");
        let hdr = el.querySelector(".header");
        let inp = el.querySelector(".input");
        let newValue;
        if (!!logic && !!logic.el) {
            let el = DeepLogicAbstractElement.getReference(logic.el.type).getSVG(logic.el);
            if (typeof el.dataset.value != "undefined") {
                newValue = parseInt(el.dataset.value) >= logic.value;
            }
            cnt.append(el);
            inp.innerHTML = logic.value;
        }
        if (typeof newValue != "undefined") {
            el.dataset.value = +newValue;
            hdr.dataset.value = +newValue;
        }
        return el;
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

DeepLogicAbstractElement.registerReference("min", DeepLogicMin);
customElements.define('deep-logic-min', DeepLogicMin);