import Template from "../../util/Template.js";
import "./Option.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            min-width: 200px;
            min-height: 100px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        slot {
            display: block;
            width: 100%;
        }
        ::slotted(:not([value])) {
            display: none;
        }
        ::slotted([value]) {
            display: flex;
            align-items: center;
            min-height: 30px;
            padding: 5px;
            white-space: normal;
            margin: 5px 2px;
            color: #000000;
            background-color: #ffffff;
        }
        ::slotted([value]:hover) {
            background-color: #b8b8b8;
        }
        ::slotted([value])::before {
            margin-left: 2px;
            margin-right: 10px;
            font-size: 1.4em;
            content: "☐";
        }
        ::slotted([value].active)::before {
            content: "☑";
        }
        ::slotted([value]:not(.active)),
        :host([multimode]:not([multimode="false"])) ::slotted([value].active) {
            cursor: pointer;
        }
        #empty {
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: italic;
            min-height: 30px;
            padding: 5px;
            white-space: normal;
            margin: 5px 2px;
        }
    </style>
    <slot id="container">
        <div id="empty">no entries</div>
    </slot>
`);

function clickOption(event) {
    if (!this.readonly) {
        let value = event.currentTarget.getAttribute("value");
        if (this.multimode == "true") {
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

export default class DeepListSelect extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
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
        let val = this.getAttribute('value');
        if (this.multimode) {
            val = JSON.parse(val);
        }
        return val;
    }

    set value(val) {
        if (this.multimode) {
            if (Array.isArray(val)) {
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
                    let event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
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
        this.querySelectorAll(`[value]`).forEach(el => {
            if (!!el) {
                el.classList.remove("active");
                el.onclick = clickOption.bind(this);
            }
        });
        if (this.multimode) {
            this.value.forEach(v => {
                let el = this.querySelector(`[value="${v}"]`);
                if (!!el) {
                    el.classList.add("active");
                }
            });
        } else {
            let el = this.querySelector(`[value="${this.value}"]`);
            if (!!el) {
                el.classList.add("active");
            }
        }
    }

}

customElements.define('deep-listselect', DeepListSelect);