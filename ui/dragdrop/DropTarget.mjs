import Template from "../../util/Template.mjs";

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
    var el = document.getElementById(event.dataTransfer.getData("id"));
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
        this.ondrop = dropElement.bind(this);
        this.ondragover = allowDrop.bind(this);
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

customElements.define('deep-droptarget', DeepDropTarget);