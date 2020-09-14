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

export default class Select extends HTMLSelectElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

}

customElements.define('emc-select', Select);