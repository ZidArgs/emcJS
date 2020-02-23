import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
            min-height: min-content;
            min-width: min-content;
        }
        :host > ::slotted(*) {
            flex-grow: 0;
            flex-shrink: 0;
        }
        :host(.stretchlast) > ::slotted(:last-child),
        :host > ::slotted(.autosize) {
            flex-grow: 1;
            flex-shrink: 1;
        }
        :host > ::slotted(.panel) {
            border-style: solid;
            border-width: 2px;
            border-color: var(--page-border-color, #ffffff);
            overflow: hidden;
        }
    </style>
    <slot>
    </slot>
`);

export default class HBox extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

}

customElements.define('emc-hbox', HBox);