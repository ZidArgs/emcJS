import Template from "../../util/Template.mjs";
import "./Option.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            min-width: 200px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            overflow-x: hidden;
            overflow-y: auto;
        }
        slot {
            display: block;
            width: 100%;
        }
        ::slotted(:not()),
        ::slotted(:not([value])) {
            display: none;
        }
        ::slotted([value]) {
            display: flex;
            align-items: center;
            min-height: 30px;
            padding: 5px;
            cursor: pointer;
            white-space: normal;
            margin: 5px 2px;
        }
        ::slotted([value]:not(.active)) {
            color: #000000;
            background-color: #ffffff;
        }
        ::slotted([value].active) {
            color: #ffffff;
            background-color: #000000;
        }
        ::slotted([value]:hover) {
            color: #000000;
            background-color: #cccccc;
        }
        ::slotted([value].active:hover) {
            color: #ffffff;
            background-color: #555555;
        }
    </style>
    <slot id="container">
    </slot>
`);

function clickOption(event) {
    if (!this.readonly) {
        let value = event.target.getAttribute("value");
        if (this.multimode == "true") {
            let arr = [];
            if (!!this.value && this.value.length > 0) {
                arr = this.value.split(",");
            }
            let set = new Set(arr);
            if (set.has(value)) {
                set.delete(value);
            } else {
                set.add(value);
            }
            this.value = Array.from(set).join(",");
        } else {
            this.value = value;
        }
    }
}

export default class DeepListSelect extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", clickOption.bind(this));
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            this.calculateItems();
        });
    }

    connectedCallback() {
        if (!this.value) {
            this.value = "";
        }
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    get multimode() {
        return this.getAttribute('multimode');
    }

    set multimode(val) {
        this.setAttribute('multimode', val);
    }

    get readonly() {
        return this.getAttribute('readonly');
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
                    var event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    this.dispatchEvent(event);
                }
                break;
            case 'multimode':
                if (oldValue != newValue) {
                    if (newValue != "true") {
                        let arr = this.value.split(",");
                        if (arr.length > 1) {
                            this.value = arr[0];
                        }
                    }
                }
                break;
        }
    }
    
    calculateItems() {
        this.querySelectorAll(`[value]:not([value=""])`).forEach(el => {
            if (!!el) {
                el.classList.remove("active");
            }
        });
        if (typeof this.value === "string" && this.value.length > 0) {
            this.value.split(",").forEach(v => {
                let el = this.querySelector(`[value="${v}"]`);
                if (!!el) {
                    el.classList.add("active");
                }
            });
        }
    }

}

customElements.define('deep-listselect', DeepListSelect);