import Template from "../../util/Template.js";
import "./ListHeader.js";
import "./Option.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            flex-direction: column;
            min-width: 200px;
            min-height: 100px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            overflow: hidden;
        }
        #scroll-container {
            flex: 1;
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
            color: #000000;
            background-color: #ffffff;
            border-bottom: solid 1px #eee;
        }
        ::slotted([value]:hover) {
            background-color: #b8b8b8;
        }
        ::slotted([value])::before {
            margin: 0 10px 0 2px;
            font-size: 18px;
            content: "☐";
        }
        ::slotted([value].active)::before {
            content: "☑";
        }
        :host(:not([readonly])) ::slotted([value]:not(.active)),
        :host([readonly="false"]) ::slotted([value]:not(.active)),
        :host([multimode]:not([multimode="false"]):not([readonly])) ::slotted([value].active),
        :host([readonly="false"][multimode]:not([multimode="false"])) ::slotted([value].active) {
            cursor: pointer;
        }
        #empty {
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: italic;
            min-height: 30px;
            padding: 5px;
            margin: 5px 2px;
            white-space: normal;
        }
    </style>
    <emc-listheader id="header">
    </emc-listheader>
    <div id="scroll-container">
        <slot id="container">
            <div id="empty">no entries</div>
        </slot>
    </div>
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

export default class ListSelect extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            this.calculateItems();
        });
        /* header */
        let header = this.shadowRoot.getElementById("header");
        header.addEventListener('check', event => {
            if (event.value) {
                let all = this.querySelectorAll(`[value]`);
                let value = [];
                all.forEach(el => {
                    if (!!el && el.style.display == "") {
                        value.push(el.value);
                    }
                });
                this.value = value;
            } else {
                this.value = [];
            }
        });
        header.addEventListener('filter', event => {
            let all = this.querySelectorAll(`[value]`);
            if (!!event.value) {
                let regEx = new RegExp(`.*${event.value.split(" ").join(".*")}.*`, "i")
                all.forEach(el => {
                    if (el.innerHTML.match(regEx)) {
                        el.style.display = "";
                    } else {
                        el.style.display = "none";
                    }
                });
            } else {
                all.forEach(el => {
                    el.style.display = "";
                });
            }
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

    get header() {
        let val = this.getAttribute('header');
        return !!val && val != "false";
    }

    set header(val) {
        this.setAttribute('header', val);
    }

    static get observedAttributes() {
        return ['value', 'multimode', 'header'];
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
                    let header = this.shadowRoot.getElementById("header");
                    header.multimode = newValue;
                }
                break;
            case 'header':
                if (oldValue != newValue) {
                    let header = this.shadowRoot.getElementById("header");
                    if (!!newValue && newValue != "false") {
                        header.style.display = "";
                    } else {
                        header.style.display = "none";
                    }
                }
                break;
        }
    }
    
    calculateItems() {
        let header = this.shadowRoot.getElementById("header");
        let all = this.querySelectorAll(`[value]`);
        all.forEach(el => {
            if (!!el) {
                el.classList.remove("active");
                el.onclick = clickOption.bind(this);
            }
        });
        if (this.multimode) {
            let count = 0;
            this.value.forEach(v => {
                let el = this.querySelector(`[value="${v}"]`);
                if (!!el) {
                    count++;
                    el.classList.add("active");
                }
            });
            if (count > 0) {
                if (all.length == count) {
                    header.checked = true;
                } else {
                    header.checked = "mixed";
                }
            } else {
                header.checked = false;
            }
        } else {
            let el = this.querySelector(`[value="${this.value}"]`);
            if (!!el) {
                el.classList.add("active");
            }
        }
    }

}

customElements.define('emc-listselect', ListSelect);