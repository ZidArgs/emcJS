import Template from "../util/Template.js";
import "./selection/ListSelect.js";

const TPL = new Template(`
    <style>
        :host {
            position: fixed !important;
            display: none;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 99999;
        }
        :host([active]:not([active="false"])) {
            display: block;
        }
        #menu {
            position: relative;
            display: inline-block;
            overflow-x: hidden;
            overflow-y: auto;
            max-width: 50vw;
            max-height: 50vh;
            background: var(--contextmenu-background, #ffffff);
            border: solid 2px var(--contextmenu-border, #cccccc);
        }
        ::slotted(.item) {
            display: block;
            min-width: 150px;
            height: 30px;
            padding: 5px;
            color: var(--contextmenu-text, #000000);
            background: var(--contextmenu-background, #ffffff);
        }
        ::slotted(.item:hover) {
            background: var(--contextmenu-background-hover, var(--contextmenu-border, #cccccc));
            color: var(--contextmenu-text-hover, var(--contextmenu-text, #000000));
        }
        ::slotted(.splitter) {
            display: block;
            margin: 10px 5px;
            height: 2px;
            background: var(--contextmenu-text, #000000);
        }
    </style>
    <slot id="menu">
    </slot>
`);

function closeMenu(event) {
    this.active = false;
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class ContextMenu extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.addEventListener("click", closeMenu.bind(this));
        this.addEventListener("contextmenu", closeMenu.bind(this));
        this.shadowRoot.getElementById('menu').addEventListener("click", closeMenu.bind(this));
    }

    get active() {
        return this.getAttribute('active');
    }

    set active(val) {
        this.setAttribute('active', val);
    }

    show(posX, posY) {
        this.active = true;
        let menu = this.shadowRoot.getElementById('menu');
        if (posX < 25) {
            posX = 25;
        } else if (menu.clientWidth + posX > window.innerWidth - 25) {
            posX = window.innerWidth - menu.clientWidth - 25;
        }
        if (posY < 25) {
            posY = 25;
        } else if (menu.clientHeight + posY > window.innerHeight - 25) {
            posY = window.innerHeight - menu.clientHeight - 25;
        }
        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
    }

}

customElements.define('emc-contextmenu', ContextMenu);