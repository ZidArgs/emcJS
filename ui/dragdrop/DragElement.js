import DragDropMemory from "../../util/DragDropMemory.js";
import UniqueGenerator from "../../util/UniqueGenerator.js";
import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-block;
            cursor: grab;
        }
    </style>
    <slot>
    </slot>
`);

function dragElement(event) {
    DragDropMemory.add(event.currentTarget);
    event.stopPropagation();
}

export default class DragElement extends HTMLElement {

    constructor() {
        super();
        /* host */
        this.id = UniqueGenerator.appUID("draggable");
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.setAttribute("draggable", true);
        this.addEventListener("dragstart", dragElement);
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('emc-dragelement', DragElement);