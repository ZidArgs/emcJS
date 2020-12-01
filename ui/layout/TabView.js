import Template from "../../util/Template.js";
import GlobalStyle from "../../util/GlobalStyle.js";
import ElementManager from "../../util/ElementManager.js";
import Panel from "./Panel.js";
import "../input/Option.js";

const TPL = new Template(`
<slot id="container"></slot>
<div id="view-choice"></div>
`);

const STYLE = new GlobalStyle(`
* {
    position: relative;
    box-sizing: border-box;
}
:host {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
    margin: 0px;
    background-color: var(--page-background-color, #000000);
    color: var(--page-text-color, #ffffff);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}
#container {
    display: flex;
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
}
::slotted(*) {
    display: block;
    flex: 1;
}
#view-choice {
    padding: 4px;
    background-color: var(--navigation-background-color, #ffffff);
}
#view-choice emc-option {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-origin: content-box;
    border-radius: 20%;
    border: solid 2px var(--navigation-text-color, #000000);
    padding: 4px;
    margin: 0 2px;
    filter: drop-shadow(black 1px 1px 1px);
}
#view-choice emc-option emc-icon {
    width: 100%;
    height: 100%;
    pointer-events: none;
}
#view-choice emc-option.active {
    cursor: default;
}
#view-choice emc-option:not(.active) {
    opacity: 0.5;
}
`);

const EL_MANAGER = new WeakMap();
const ON_CLICK = new WeakMap();

function onOptionClick(event) {
    const el = event.currentTarget;
    if (!el.classList.contains("active")) {
        this.active = el.value;
    }
}

function composer(key, params) {
    const el = document.createElement("emc-option");
    el.value = key;
    el.style.backgroundImage = `url('${params.icon}')`;
    el.title = params.title || key;
    el.addEventListener("click", params.onClick);
    return el;
}

export default class TabView extends Panel {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        STYLE.apply(this.shadowRoot);
        /* --- */
        ON_CLICK.set(this, onOptionClick.bind(this));
        const choice = this.shadowRoot.getElementById("view-choice");
        EL_MANAGER.set(this, new ElementManager(choice, composer));
        const observer = new MutationObserver(() => {
            this.connectedCallback();
        });
        observer.observe(this, {childList: true});
    }

    connectedCallback() {
        const all = this.querySelectorAll("[slot]");
        const elManager = EL_MANAGER.get(this);
        const onClick = ON_CLICK.get(this);
        const data = [];
        all.forEach((el) => {
            data.push({
                key: el.getAttribute("slot"),
                title: el.dataset.title,
                icon: el.dataset.icon,
                onClick
            });
        });
        elManager.manage(data);
        // apply value
        const choice = this.shadowRoot.getElementById("view-choice");
        const el = choice.querySelector(`[value="${this.active}"]`);
        if (!!el) {
            el.classList.add("active");
        }
    }

    disconnectedCallback() {
        // revoke value
        const choice = this.shadowRoot.getElementById("view-choice");
        const current = choice.querySelector(`[value="${this.active}"]`);
        if (!!current) {
            current.classList.remove("active");
        }
    }

    get active() {
        return this.getAttribute('active');
    }

    set active(val) {
        this.setAttribute('active', val);
    }

    static get observedAttributes() {
        return ['active'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'active':
                if (oldValue != newValue) {
                    const container = this.shadowRoot.getElementById("container");
                    if (typeof newValue == "string") {
                        container.name = newValue;
                        // update choice
                        const choice = this.shadowRoot.getElementById("view-choice");
                        const current = choice.querySelector(`[value="${oldValue}"]`);
                        if (!!current) {
                            current.classList.remove("active");
                        }
                        const el = choice.querySelector(`[value="${newValue}"]`);
                        if (!!el) {
                            el.classList.add("active");
                        }
                    }
                }
                break;
        }
    }

}

customElements.define('emc-tabview', TabView);
