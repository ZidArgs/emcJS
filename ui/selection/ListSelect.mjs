import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            user-select: none;
        }
        slot {
            display: block;
            width: 100%;
            height: 100%;
            overflow: auto;
        }
        ::slotted(:not(option)) {
            display: none;
        }
        ::slotted(option) {
            display: block;
            min-height: auto;
            cursor: pointer;
        }
        ::slotted(option:not(.active)) {
            opacity: 0.5;
        }
        ::slotted(option.active) {
            background-color: #cccccc;
        }
        ::slotted(option:hover) {
            background-color: #a9e1ff;
        }
    </style>
    <slot>
    </slot>
`);

function clickOption(event) {
    if (!this.readonly) {
        let arr = [];
        if (this.value.length > 0) {
            arr = this.value.split(",");
        }
        let set = new Set(arr);
        if (set.has(event.target.value)) {
            set.delete(event.target.value);
        } else {
            set.add(event.target.value);
        }
        this.value = Array.from(set).join(",");
    }
}

export default class DeepListSelect extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", clickOption.bind(this));
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
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

    get readonly() {
        return this.getAttribute('readonly');
    }

    set readonly(val) {
        this.setAttribute('readonly', val);
    }

    static get observedAttributes() {
        return ['value'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                if (oldValue != newValue) {
                    let ol = oldValue.split(",");
                    for (let i in ol) {
                        let el = this.querySelector(`option[value="${ol[i]}"]`);
                        if (!!el) {
                            el.classList.remove("active");
                        }
                    }
                    let nl = newValue.split(",");
                    for (let i in nl) {
                        let el = this.querySelector(`option[value="${nl[i]}"]`);
                        if (!!el) {
                            el.classList.add("active");
                        }
                    }
                    var event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    this.dispatchEvent(event);
                }
                break;
        }
    }

}

customElements.define('deep-listselect', DeepListSelect);