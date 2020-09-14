import Template from "../../util/Template.js";
import "./Option.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }
        slot {
            width: 100%;
            height: 100%;
        }
        ::slotted(:not([value])),
        ::slotted([value][disabled]) {
            display: none;
        }
        ::slotted([value]) {
            display: inline-block;
            min-height: auto;
        }
        ::slotted([value]:not(.active)) {
            opacity: 0.5;
        }
        :host(:not([readonly])) ::slotted([value]:not(.active)),
        :host([readonly="false"]) ::slotted([value]:not(.active)),
        :host([multimode]:not([multimode="false"]):not([readonly])) ::slotted([value].active),
        :host([readonly="false"][multimode]:not([multimode="false"])) ::slotted([value].active) {
            cursor: pointer;
        }
    </style>
    <slot id="container">
    </slot>
`);

function clickOption(event) {
    if (!this.readonly) {
        let value = event.currentTarget.getAttribute("value");
        if (this.multimode) {
            let arr = this.value;
            let set = new Set(arr);
            if (set.has(value)) {
                set.delete(value);
            } else {
                set.add(value);
            }
            this.value = Array.from(set);
        } else {
            this.value = value;
        }
    }
}

export default class ChoiceSelect extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            let all = this.querySelectorAll(`[value]`);
            all.forEach(el => {
                if (!!el) {
                    el.onclick = clickOption.bind(this);
                }
            });
            this.calculateItems();
        });
    }

    connectedCallback() {
        let all = this.querySelectorAll(`[value]`);
        if (!this.value && !!all.length) {
            this.value = all[0].value;
        }
        all.forEach(el => {
            if (!!el) {
                el.onclick = clickOption.bind(this);
            }
        });
        this.calculateItems();
    }

    get value() {
        let val = this.getAttribute('value');
        if (this.multimode) {
            val = JSON.parse(val);
        }
        return val;
    }

    set value(val) {
        if (this.multimode) {
            if (!Array.isArray(val)) {
                val = [val];
            }
            val = JSON.stringify(val);
        }
        this.setAttribute('value', val);
    }

    get multimode() {
        return this.getAttribute('multimode') == "true";
    }

    set multimode(val) {
        this.setAttribute('multimode', val);
    }

    get readonly() {
        let val = this.getAttribute('readonly');
        return !!val && val != "false";
    }

    set readonly(val) {
        this.setAttribute('readonly', val);
    }

    static get observedAttributes() {
        return ['value', 'multimode'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                if (oldValue != newValue) {
                    this.calculateItems();
                    let event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    event.value = newValue;
                    this.dispatchEvent(event);
                }
                break;
            case 'multimode':
                if (oldValue != newValue) {
                    if (newValue != "true") {
                        let arr = JSON.parse(this.getAttribute('value'));
                        if (arr.length > 1) {
                            this.value = arr[0];
                        }
                    } else {
                        this.value = [this.getAttribute('value')];
                    }
                }
                break;
        }
    }
    
    calculateItems() {
        let all = this.querySelectorAll(`[value]`);
        if (this.multimode) {
            let vals = new Set(this.value);
            all.forEach(el => {
                if (!!el) {
                    if (vals.has(el.value)) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                }
            });
        } else {
            all.forEach(el => {
                if (!!el) {
                    if (this.value == el.value) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                }
            });
        }
    }

}

customElements.define('emc-choiceselect', ChoiceSelect);