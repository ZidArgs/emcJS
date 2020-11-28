import Template from "../../util/Template.js";
import GlobalStyle from "../../util/GlobalStyle.js";
import Panel from "./Panel.js";
import "../input/Option.js";

const TPL = new Template(`
<slot id="container"></slot>
<emc-choiceselect id="view-choice"></emc-choiceselect>
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
emc-choiceselect {
    padding: 4px;
    background-color: var(--navigation-background-color, #ffffff);
}
emc-choiceselect emc-option {
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
emc-choiceselect emc-option emc-icon {
    width: 100%;
    height: 100%;
    pointer-events: none;
}
`);

export default class TabView extends Panel {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        STYLE.apply(this.shadowRoot);
        /* --- */
        const container = this.shadowRoot.getElementById("container");
        const choice = this.shadowRoot.getElementById("view-choice");
        choice.addEventListener("change", (event) => {
            this.active = event.newValue;
        });
        container.addEventListener("slotchange", event => {
            this.connectedCallback();
        });
    }

    connectedCallback() {
        const choice = this.shadowRoot.getElementById("view-choice");
        choice.innerHTML = "";
        const all = this.querySelectorAll(`[slot]`);
        all.forEach((el) => {
            const opt = document.createElement("emc-option");
            const ref = el.getAttribute("slot");
            opt.value = ref;
            if (el.dataset.title != null) {
                opt.title = el.dataset.title;
            } else {
                opt.title = ref;
            }
            if (el.dataset.icon != null) {
                opt.style.backgroundImage = `url('${el.dataset.icon}')`;
            }
            choice.append(opt);
        });
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
                    const choice = this.shadowRoot.getElementById("view-choice");
                    const container = this.shadowRoot.getElementById("container");
                    if (typeof newValue == "string") {
                        container.name = newValue;
                        choice.value = newValue;
                    }
                }
                break;
        }
    }

}

customElements.define('emc-tabview', TabView);
