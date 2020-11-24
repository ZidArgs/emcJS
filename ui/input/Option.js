import Template from "../../util/Template.js";
import GlobalStyle from "../../util/GlobalStyle.js";

const TPL = new Template(`
<slot></slot>
`);

const STYLE = new GlobalStyle(`
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
`);

export default class Option extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        STYLE.apply(this.shadowRoot);
        /* --- */
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    static createOption(value, content = value, style = {}) {
        let opt = document.createElement('emc-option');
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

customElements.define('emc-option', Option);
