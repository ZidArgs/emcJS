import UID from "../../UID.mjs";

const CUSTOM_CSS = `
    :host {
        display: inline-block;
        cursor: grab;
    }
    :host:active {
        cursor: grabbing;
    }
`;

function dragElement(event) {
    event.dataTransfer.setData("group", event.target.group);
    event.dataTransfer.setData("id", event.target.id);
}

export default class DeepDragElement extends HTMLElement {

    constructor() {
        super();
        /* host */
        this.id = UID.generate("draggable");
        this.setAttribute("draggable", true);
        this.ondragstart = dragElement.bind(this);
        this.attachShadow({mode: 'open'});
        /* style */
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        this.shadowRoot.appendChild(style);
        /* content */
        this.shadowRoot.appendChild(document.createElement('slot'));
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('deep-dragelement', DeepDragElement);