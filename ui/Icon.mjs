const CUSTOM_CSS = [
    ":host{",
        "display:inline-block;",
        "width:20px;",
        "height:20px;",
        "cursor:pointer;",
        "user-select:none;",
    "}",
    "div{",
        "width:100%;",
        "height:100%;",
        "background-repeat: no-repeat;",
        "background-size: contain;",
        "background-position: center;",
        "background-origin: content-box;",
    "}"
].join('');

const pView = new WeakMap;

export default class DeepIcon extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        var view = document.createElement('div');
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        shadow.appendChild(style);
        shadow.appendChild(view);
        pView.set(this, view);
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
                    pView.get(this).style.backgroundImage = `url("${newValue}")`;
                }
                break;
        }
    }

}

customElements.define('deep-icon', DeepIcon);