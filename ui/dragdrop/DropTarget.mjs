const CUSTOM_CSS = `
    :host {
        display: block;
        height: 100%;
    }
`;

function dropElement(event) {
    var el = document.getElementById(event.dataTransfer.getData("id"));
    console.log(el);
    if (!!el) {
        this.appendChild(el);
    }
    event.preventDefault();
    event.stopPropagation();
}

function allowDrop(event) {
    if (!this.group) {
        event.preventDefault();
        event.stopPropagation();
    } else if (!!event.dataTransfer && event.dataTransfer.getData('group') === this.group) {
        event.preventDefault();
        event.stopPropagation();
    }
}

export default class DeepDropTarget extends HTMLElement {

    constructor() {
        super();
        /* host */
        this.ondrop = dropElement.bind(this);
        this.ondragover = allowDrop.bind(this);
        this.attachShadow({mode: 'open'});
        /* style */
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        this.shadowRoot.appendChild(style);
        /* content */
        var view = document.createElement('slot');
        this.shadowRoot.appendChild(view);
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('deep-droptarget', DeepDropTarget);