import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        :host {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-origin: content-box;
            flex-grow: 0;
            flex-shrink: 0;
            min-height: auto;
            white-space: normal;
            padding: 0;
            user-select: none;
        }
    </style>
    <slot></slot>
`);

export default class DeepOption extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    static createOption(value, content = value, style = {}) {
        let opt = document.createElement('deep-option');
        opt.setAttribute('value', value);
        if (content instanceof HTMLElement) {
            opt.append(content);
        } else {
            opt.innerHTML = content;
        }
        for (let i in style) {
            opt.style[i] = style[i];
        }
        return opt;
    }

}

customElements.define('deep-option', DeepOption);