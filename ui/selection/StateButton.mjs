import Template from "../../util/Template.mjs";
import "./Option.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-block;
            width: 20px;
            height: 20px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }
        slot {
            width: 100%;
            height: 100%;
        }
        ::slotted(:not([value])),
        ::slotted([value]:not(.active)) {
            display: none !important;
        }
        ::slotted([value]) {
            width: 100%;
            height: 100%;
            min-height: auto;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            background-origin: content-box;
        }
    </style>
    <slot>
    </slot>
`);

export default class DeepStateButton extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", this.next);
        this.addEventListener("contextmenu", this.prev);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
    }

    connectedCallback() {
        if (!this.value) {
            let all = this.querySelectorAll("[value]");
            if (!!all.length) {
                this.value = all[0].value;
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
                    let oe = this.querySelector(`.active`);
                    if (!!oe) {
                        oe.classList.remove("active");
                    }
                    let ne = this.querySelector(`[value="${newValue}"]`);
                    if (!!ne) {
                        ne.classList.add("active");
                    }
                    let event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    this.dispatchEvent(event);
                }
                break;
        }
    }

    next(ev) {
        if (!this.readonly) {
            let all = this.querySelectorAll("[value]");
            if (!!all.length) {
                let opt = this.querySelector(`[value="${this.value}"]`);
                if (!!opt) {
                    if (!!opt.nextElementSibling) {
                        this.value = opt.nextElementSibling.getAttribute("value");
                    }
                } else {
                    this.value = all[0].getAttribute("value");
                }
            }
        }
        ev.preventDefault();
        return false;
    }

    prev(ev) {
        if (!this.readonly) {
            let all = this.querySelectorAll("[value]");
            if (!!all.length) {
                let opt = this.querySelector(`[value="${this.value}"]`);
                if (!!opt) {
                    if (!!opt.previousElementSibling) {
                        this.value = opt.previousElementSibling.getAttribute("value");
                    }
                } else {
                    this.value = all[0].getAttribute("value");
                }
            }
        }
        ev.preventDefault();
        return false;
    }

}

customElements.define('deep-statebutton', DeepStateButton);