import DeepTemplate from "../util/Template.mjs";

const TPL = new DeepTemplate(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-block;
            width: 20px;
            height: 20px;
            user-select: none;
        }
        div {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            background-origin: content-box;
        }
    </style>
    <div>
    </div>
`);

export default class DeepIcon extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(val) {
        this.setAttribute('src', val);
    }

    static get observedAttributes() {
        return ['src'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'src':
                if (oldValue != newValue) {
                    this.shadowRoot.querySelector('div').style.backgroundImage = `url("${newValue}")`;
                }
                break;
        }
    }

}

customElements.define('deep-icon', DeepIcon);