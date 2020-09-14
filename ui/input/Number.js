import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        :host {
            position: relative;
            box-sizing: border-box;
            height: 2em;
            color: var(--primary-color-front, #000000);
            background: var(--primary-color-back, #ffffff);
            border-radius: 2px;
            border: solid 1px var(--primary-color-border, #000000);
        }

        :host:hover {
            background: var(--primary-color-marked, #eeeeee);
        }
    </style>
`);

export default class Number extends HTMLInputElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        super.type = "number";
    }

    set type() {}

    get type() {
        return "number";
    }

    static get observedAttributes() {
        return ['type'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'type':
                if (oldValue != newValue) {
                    this.setAttribute('type', "number");
                }
                break;
        }
    }

}

customElements.define('emc-number', Number);