import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            padding: 5px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            border: solid 2px;
            background-color: #222;
            border-color: #777;
            overflow: hidden;
        }
        slot {
            display: block;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
    <slot></slot>
`);

export default class LogicEditorElements extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
    }

}

customElements.define('deep-logiceditor-elements', LogicEditorElements);