import Template from "../../util/Template.js";
import GlobalStyle from "../../util/GlobalStyle.js";
import "./Option.js";

const TPL = new Template(`
<slot id="container"></slot>
`);

const STYLE = new GlobalStyle(`
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

const CLICK_HANDLER = new WeakMap();

export default class ChoiceSelect extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        STYLE.apply(this.shadowRoot);
        /* --- */
        const onClickOption = clickOption.bind(this);
        CLICK_HANDLER.set(this, onClickOption);
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            const all = this.querySelectorAll(`[value]`);
            all.forEach(el => {
                if (!!el) {
                    el.onclick = onClickOption;
                }
            });
            if (!this.value && !!all.length) {
                this.value = all[0].value;
            } else {
                this.calculateItems();
            }
        });
    }

    connectedCallback() {
        const onClickOption = CLICK_HANDLER.get(this);
        const all = this.querySelectorAll(`[value]`);
        if (!this.value && !!all.length) {
            this.value = all[0].value;
        }
        all.forEach(el => {
            if (!!el) {
                el.onclick = onClickOption;
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
        const val = this.getAttribute('readonly');
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
                    const event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    event.value = newValue;
                    this.dispatchEvent(event);
                }
                break;
            case 'multimode':
                if (oldValue != newValue) {
                    if (newValue != "true") {
                        const arr = JSON.parse(this.getAttribute('value'));
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
        const all = this.querySelectorAll("[value]");
        all.forEach(el => {
            if (!!el) {
                el.classList.remove("active");
            }
        });
        if (this.multimode) {
            for (const value of this.value) {
                const el = this.querySelector(`[value="${value}"]`);
                el.classList.add("active");
            }
        } else {
            const el = this.querySelector(`[value="${this.value}"]`);
            if (!!el) {
                el.classList.add("active");
            }
        }
    }

}

customElements.define('emc-choiceselect', ChoiceSelect);
