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
    event.dataTransfer.setData("group", event.currentTarget.group || "");
    event.dataTransfer.setData("id", event.currentTarget.id);
}

export default class DeepDragElement extends HTMLElement {

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

customElements.define('emc-dragelement', DeepDragElement);