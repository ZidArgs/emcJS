const CUSTOM_CSS = `
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
`;

export default class DeepIcon extends HTMLElement {

    constructor() {
        super();
        /* host */
        this.attachShadow({mode: 'open'});
        /* style */
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        this.shadowRoot.appendChild(style);
        /* content */
        this.shadowRoot.appendChild(document.createElement('div'));
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