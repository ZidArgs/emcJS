const CUSTOM_CSS = [
    ":host{",
        "display:inline-block;",
        "width:20px;",
        "height:20px;",
    "}",
    "slot{",
        "width:100%;",
        "height:100%;",
        "cursor:pointer;",
        "user-select:none;",
    "}",
    "::slotted(option){",
        "width:100%;",
        "height:100%;",
        "background-repeat: no-repeat;",
        "background-size: contain;",
        "background-position: center;",
        "background-origin: content-box;",
    "}"
].join('');

export default class SwitchButton extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'closed'});
        var view = document.createElement('slot');
        view.setAttribute("name", "value");
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        shadow.appendChild(style);
        shadow.appendChild(view);
        
        if (!!this.querySelectorAll("option").length) {
            this.querySelectorAll("option")[0].slot = "value";
        }

        this.addEventListener("click", this.next);
        this.addEventListener("contextmenu", this.prev);
    }

    get value() {
        let el = this.querySelector("option[slot=value]");
        if (!!el) {
            return el.value;
        }
    }

    set value(val) {
        let el = this.querySelector("option[slot=value]");
        if (!!el) {
            el.removeAttribute("slot");
        }
        let nl = this.querySelector("option[value="+val+"]");
        if (!!nl) {
            nl.setAttribute("slot","value");
        }
    }

    next(ev) {
        let o = this.querySelectorAll("option");
        if (!!o.length) {
            let el = this.querySelector("option[slot=value]");
            el.removeAttribute("slot");
            if (!!el.nextElementSibling) {
                el.nextElementSibling.setAttribute("slot","value");
            } else {
                o[0].setAttribute("slot","value");
            }
        }
        ev.preventDefault();
        return false;
    }

}

customElements.define('deep-switchbutton', SwitchButton);