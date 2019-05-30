import Template from "../../util/Template.mjs";
import HBox from "./HBox.mjs";
import VBox from "./VBox.mjs";
import Panel from "./Panel.mjs";

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
    </style>
    <slot>
    </slot>
`);

function loadLayout(layout) {
    if (!!layout) {
        switch (layout.type) {
            case "hbox":
            case "vbox":
                let el = document.createElement(`deep-${layout-type}`);
                for (let i of layout.items) {
                    el.append(loadLayout(layout.items[i]));
                }
                return el;
            case "panel":
                let el = new (Panel.getReference(layout.name));
                for (let i of layout.options) {
                    el.setAttribute(i, layout.options[i]);
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
            this.appendChild(loadLayout(layout));
    }

    get layout() {
        return this.getAttribute('layout');
    }

    set layout(val) {
        this.setAttribute('layout', val);
    }

    static get observedAttributes() {
        return ['layout'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'layout':
                if (oldValue != newValue) {
                    this.innerHTML = "";
                    let layout = GlobalData.get("layouts")[newValue];
                    if (!!layout) {
                        this.appendChild(loadLayout(layout));
                    }
                }
            break;
        }
    }

}

customElements.define('deep-layout', DeepLayout);