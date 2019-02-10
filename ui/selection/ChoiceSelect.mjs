import Template from "../../util/Template.mjs";

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
        ::slotted(:not(option)) {
            display: none;
        }
        ::slotted(option) {
            display: inline-block;
            min-height: auto;
            cursor: pointer;
        }
        ::slotted(option:not(.active)) {
            opacity: 0.5;
        }
    </style>
    <slot id="container">
    </slot>
`);

function chooseOption(event) {
    if (!this.readonly) {
        if (this.multimode == "true") {
            let arr = [];
            if (!!this.value && this.value.length > 0) {
                arr = this.value.split(",");
            }
            let set = new Set(arr);
            if (set.has(event.target.value)) {
                set.delete(event.target.value);
            } else {
                set.add(event.target.value);
            }
            this.value = Array.from(set).join(",");
        } else {
            this.value = event.target.value;
        }
    }
}

// TODO react on slotted change (maybe deselect or select new elements)

export default class DeepChoiceSelect extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", chooseOption.bind(this));
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            this.calculateItems();
        });
        /* init */
        if (!this.value) {
            let all = this.querySelectorAll("option");
            if (!!all.length) {
                this.value = all[0].value;
                all[0].classList.add("active");
            }
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
        this.querySelectorAll(`option[value]:not([value=""])`).forEach(el => {
            if (!!el) {
                el.classList.remove("active");
            }
        });
        if (typeof this.value === "string" && this.value.length > 0) {
            this.value.split(",").forEach(v => {
                let el = this.querySelector(`option[value="${v}"]`);
                if (!!el) {
                    el.classList.add("active");
                }
            });
        }
    }

}

customElements.define('deep-choiceselect', DeepChoiceSelect);