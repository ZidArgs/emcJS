import Template from "../../util/Template.js";
import "./Option.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }
        :host(:not([readonly])),
        :host([readonly="false"]) {
            cursor: pointer;
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

export default class StateButton extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", this.next);
        this.addEventListener("contextmenu", this.prev);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
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
        let val = this.getAttribute('readonly');
        return !!val && val != "false";
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
                    event.value = newValue;
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
                    let next = opt;
                    while (true) {
                        if (!next.nextElementSibling) {
                            break;
                        } else {
                            next = next.nextElementSibling;
                        }
                        let da = next.getAttribute("disabled");
                        if  (!da || da == "false" || next == opt) {
                            break;
                        }
                    }
                    this.value = next.getAttribute("value");
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
                    let next = opt;
                    while (true) {
                        if (!next.previousElementSibling) {
                            break;
                        } else {
                            next = next.previousElementSibling;
                        }
                        let da = next.getAttribute("disabled");
                        if  (!da || da == "false" || next == opt) {
                            break;
                        }
                    }
                    this.value = next.getAttribute("value");
                }
            }
        }
        ev.preventDefault();
        return false;
    }

}

customElements.define('emc-statebutton', StateButton);