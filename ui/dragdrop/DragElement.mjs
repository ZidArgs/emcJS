import UID from "../../UID.mjs";
import DeepTemplate from "../../Template.mjs";

const TPL = new DeepTemplate(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-block;
            cursor: grab;
        }
        :host:active {
            cursor: grabbing;
        }
    </style>
    <slot>
    </slot>
`);

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
        this.shadowRoot.appendChild(TPL.generate());
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('deep-dragelement', DeepDragElement);