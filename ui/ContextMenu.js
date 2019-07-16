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
            background: #ffffff;
            border: solid 2px #cccccc;
        }
        ::slotted(.item) {
            display: block;
            min-width: 150px;
            height: 30px;
            padding: 5px;
            color: #000000;
            background: #ffffff;
        }
        ::slotted(.item:hover) {
            background: #cccccc;
        }
        ::slotted(.splitter) {
            display: block;
            margin: 10px 5px;
            height: 2px;
            background: #000000;
        }
    </style>
    <slot id="menu">
    </slot>
`);

function closeMenu(event) {
    this.active = false;
    event.stopPropagation();
    return false;
}

export default class DeepContextMenu extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        this.addEventListener("click", closeMenu.bind(this));
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
        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
    }

}

customElements.define('deep-contextmenu', DeepContextMenu);