import Template from "../../../util/Template.js";
import AbstractElement from "./AbstractElement.js";

const TPL_CAPTION = "MAX";
const TPL_BACKGROUND = "#ff1493";
const TPL_BORDER = "#aa0022";

const TPL = new Template(`
    <style>
        :host {
            --logic-color-back: ${TPL_BACKGROUND};
            --logic-color-border: ${TPL_BORDER};
        }
    </style>
    <div id="header" class="header">${TPL_CAPTION}</div>
    <div class="body">
        <input id="input" type="number" value="0" />
    </div>
    <div class="body">
        <slot id="children">
            <span id="droptarget" class="placeholder">...</span>
        </slot>
    </div>
`);
const SVG = new Template(`
    <div class="logic-element" style="--logic-color-back: ${TPL_BACKGROUND}; --logic-color-border: ${TPL_BORDER};">
        <div id="header" class="header">${TPL_CAPTION}</div>
        <div class="body">
            <div class="input">
            </div>
        </div>
    </div>
`);

export default class OperatorMax extends AbstractElement {

    constructor() {
        super();
        this.shadowRoot.append(TPL.generate());
        let target = this.shadowRoot.getElementById("droptarget");
        target.ondragover = AbstractElement.allowDrop;
        target.ondrop = AbstractElement.dropOnPlaceholder;
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

    calculate(state = {}) {
        let ch = this.children;
        if (!!ch[0]) {
            let val = ch[0].calculate(state);
            if (typeof val != "undefined") {
                value = +(val <= this.shadowRoot.getElementById("input").value);
            }
        }
        this.shadowRoot.getElementById('header').setAttribute('value', value);
        return value;
    }

    toJSON() {
        return {
            type: "max",
            el: Array.from(this.children).slice(0,1).map(e => e.toJSON())[0]
        };
    }

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let cl;
            if (!!logic.el.category) {
                cl = AbstractElement.getReference(logic.el.category, logic.el.type);
            } else {
                cl = AbstractElement.getReference(logic.el.type);
            }
            let el = new cl;
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
            let el = AbstractElement.getReference(logic.el.type).getSVG(logic.el);
            if (typeof el.dataset.value != "undefined") {
                newValue = parseInt(el.dataset.value) <= logic.value;
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

AbstractElement.registerReference("max", OperatorMax);
customElements.define('deep-logic-max', OperatorMax);