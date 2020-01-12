import Template from "../util/Template.js";

const TPL = new Template(`
    <style>
        * {
            box-sizing: border-box;
        }
        :host {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        :slotted:not(.active),
        :slotted:not(emc-page) {
            display: none;
        }
    </style>
    <slot id="container">
    </slot>
`);

export default class DeepPaging extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    get active() {
        return this.getAttribute('active');
    }

    set active(val) {
        this.setAttribute('active', val);
    }

    static get observedAttributes() {
        return ['active'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'active':
                if (oldValue != newValue) {
                    if (typeof newValue == "string") {
                        this.shadowRoot.getElementById("container").name = newValue;
                    }
                }
                break;
        }
    }

}

customElements.define('emc-paging', DeepPaging);