const CUSTOM_CSS = [
    ":host{",
        "display:inline-block;",
        "width:20px;",
        "height:20px;",
        "cursor:pointer;",
        "user-select:none;",
    "}",
    "slot{",
        "width:100%;",
        "height:100%;",
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

export default class DeepSwitchButton extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        var view = document.createElement('slot');
        view.setAttribute("name", "value");
        var style = document.createElement('style');
        style.textContent = CUSTOM_CSS;
        shadow.appendChild(style);
        shadow.appendChild(view);
        this.addEventListener("click", this.next);
        this.addEventListener("contextmenu", this.prev);
        
        // init
        if (!this.value) {
            let all = this.querySelectorAll("option");
            if (!!all.length) {
                this.value = all[0].value;
                all[0].setAttribute("slot", "value");
            }
        }
    }

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    static get observedAttributes() {
        return ['value'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                if (oldValue != newValue) {
                    let ol = this.querySelector(`option[value="${oldValue}"]`);
                    if (!!ol) {
                        ol.removeAttribute("slot");
                    }
                }
                let nl = this.querySelector(`option[value="${newValue}"]`);
                if (!!nl) {
                    nl.setAttribute("slot", "value");
                }
                break;
        }
    }

    next(ev) {
        let all = this.querySelectorAll("option");
        if (!!all.length) {
            let opt = this.querySelector(`option[value="${this.value}"]`);
            if (!!opt && !!opt.nextElementSibling) {
                this.value = opt.nextElementSibling.value;
            } else {
                this.value = all[0].value;
            }
        }
        ev.preventDefault();
        return false;
    }

    prev(ev) {
        let all = this.querySelectorAll("option");
        if (!!all.length) {
            let opt = this.querySelector(`option[value="${this.value}"]`);
            if (!!opt && !!opt.previousElementSibling) {
                this.value = opt.previousElementSibling.value;
            } else {
                this.value = all[all.length-1].value;
            }
        }
        ev.preventDefault();
        return false;
    }

}

customElements.define('deep-switchbutton', DeepSwitchButton);