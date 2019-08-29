import Template from "../../util/Template.js";
import"./HBox.js";
import"./VBox.js";
import Panel from "./Panel.js";

// TODO WebKit - add a wrapper with hbox abilities around panels residing inside a vbox

const TPL = new Template(`
    <style>
        :host {
            display: flex;
            --item-size: 40px;
            justify-content: stretch;
            align-items: stretch;
        }
        ::slotted(:not(:first-child)) {
            display: none;
        }
        ::slotted(.panel) {
            padding: 5px;
            border-style: solid;
            border-width: 2px;
            border-color: var(--page-border-color, #ffffff);
            overflow: hidden;
        }
    </style>
    <slot>
    </slot>
`);

function loadLayout(layout) {
    if (!!layout) {
        if (layout.type == "panel") {
            let el = document.createElement('div');
            el.classList.add("panel");
            let ch = new (Panel.getReference(layout.name));
            for (let i in layout.options) {
                ch.setAttribute(i, layout.options[i]);
            }
            el.append(ch);
            return el;
        } else {
            let el = document.createElement(`deep-${layout.type}`);
            el.classList.add("stretchlast");
            for (let item of layout.items) {
                let ch = loadLayout(item);
                if (!!item.autosize) {
                    ch.classList.add("autosize");
                    el.classList.remove("stretchlast");
                }
                el.append(ch);
            }
            return el;
        }
    }
}

export default class DeepLayout extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    loadLayout(layout) {
        this.innerHTML = "";
        if (!layout) return;
        this.appendChild(loadLayout(layout));
    }

}

customElements.define('deep-layout', DeepLayout);