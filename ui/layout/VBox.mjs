import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            display: flex;
            flex-direction: column;
        }
        :slotted {
            flex-grow: 0;
            flex-shrink: 0;
        }
        :slotted(:last-child) {
            flex-grow: 1;
        }
    </style>
    <slot>
    </slot>
`);

export default class DeepVBox extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

}

customElements.define('deep-vbox', DeepVBox);