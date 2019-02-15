import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: table;
            margin: 5px;
            user-select: none;
            border-radius: 2px;
            cursor: move;
        }
        .operator-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 35px;
            padding: 5px;
            user-select: none;
        }
    </style>
`);

export default class DeepAbstractLogicElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
    }

    getElement() {
        if (!!this.template && this.template != "false") {
            let el = this.cloneNode();
            el.removeAttribute('template');
            return el;
        } else {
            return this;
        }
    }

    get template() {
        return this.getAttribute('template');
    }

    set template(val) {
        this.setAttribute('template', val);
    }

}