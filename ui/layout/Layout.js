import Template from "../../util/Template.js";
import HBox from "./HBox.js";
import VBox from "./VBox.js";
import Panel from "./Panel.js";

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
            border-style: solid;
            border-width: 2px;
            border-color: var(--page-border-color, #ffffff);
            overflow: hidden;
        }
    </style>
    <slot>
    </slot>
`);

const PANEL_CACHE = new WeakMap();

function getPanel(cache, name) {
    if (!!cache.has(name)) {
        return cache.get(name);
    }
    let el = new (Panel.getReference(name));
    cache.set(name, el);
    return el;
}

function loadLayout(cache, layout) {
    if (!!layout) {
        if (layout.type == "panel") {
            let el = document.createElement('div');
            el.classList.add("panel");
            // let ch = getPanel(cache, layout.name);
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
                let ch = loadLayout(cache, item);
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
        PANEL_CACHE.set(this, new Map());
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    loadLayout(layout) {
        this.innerHTML = "";
        if (!layout) return;
        this.appendChild(loadLayout(PANEL_CACHE.get(this), layout));
    }

}

customElements.define('deep-layout', DeepLayout);