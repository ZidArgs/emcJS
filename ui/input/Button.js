import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        :host {
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2em;
            cursor: pointer;
            -webkit-appearance: none;
            color: var(--primary-color-front, #000000);
            background: var(--primary-color-back, #ffffff);
            border-radius: 2px;
            border: solid 1px var(--primary-color-border, #000000);
            flex-grow: 0;
            flex-shrink: 0;
        }

        :host:hover {
            background: var(--primary-color-marked, #eeeeee);
        }
    </style>
    <slot></slot>
`);

export default class Button extends HTMLButtonElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

}

customElements.define('emc-button', Button);