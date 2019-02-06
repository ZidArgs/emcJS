import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
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
    <slot>
    </slot>
`);

function chooseOption(event) {
    if (!this.readonly) {
        this.value = event.target.value;
    }
}

export default class DeepChoiceSelect extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", chooseOption.bind(this));
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
                    let ol = this.querySelector(`option[value="${oldValue}"]`);
                    if (!!ol) {
                        ol.classList.remove("active");
                    }
                    let nl = this.querySelector(`option[value="${newValue}"]`);
                    if (!!nl) {
                        nl.classList.add("active");
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

customElements.define('deep-choiceselect', DeepChoiceSelect);