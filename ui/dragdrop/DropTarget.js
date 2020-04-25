import DragDropMemory from "../../util/DragDropMemory.js";
import Template from "../../util/Template.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            height: 100%;
        }
    </style>
    <slot>
    </slot>
`);

function dropElement(event) {
    let els = DragDropMemory.get();
    if (!!els.length) {
        this.append(els);
    }
    DragDropMemory.clear();
    event.preventDefault();
    event.stopPropagation();
}

function allowDrop(event) {
    let els = DragDropMemory.get();
    if (!this.group) {
        event.preventDefault();
        event.stopPropagation();
    } else if (els.every(e => e.group == this.group)) {
        event.preventDefault();
        event.stopPropagation();
    }
    
}

export default class DropTarget extends HTMLElement {

    constructor() {
        super();
        this.ondrop = dropElement.bind(this);
        this.ondragover = allowDrop.bind(this);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('emc-droptarget', DropTarget);