import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: block;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            border: solid 2px #bdbdbd;
            background-color: #f2f2f2;
            border-radius: 10px;
        }
        .body {
            display: block;
            padding: 10px;
            border-top-width: 1px;
            border-top-style: solid;
            border-color: var(--logic-color-border, black);
        }
        .placeholder {
            display: table;
            margin: 5px;
            padding: 5px 20px;
            background-color: lightgray;
            border: 1px solid gray;
            font-weight: bold;
        }
    </style>
    <slot id="child">
        <span id="droptarget" class="placeholder">...</span>
    </slot>
`);

function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function dropOnPlaceholder(event) {
    if (!!event.dataTransfer) {
        var id = event.dataTransfer.getData("logic-transfer-id");
        var el = document.getElementById(id);
        if (!!el) {
            let ne = el.getElement(event.ctrlKey);
            ne.removeAttribute("slot");
            event.target.getRootNode().host.appendChild(ne);
        }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

export default class LogicEditorBoard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        let target = this.shadowRoot.getElementById('droptarget');
        target.ondragover = allowDrop;
        target.ondrop = dropOnPlaceholder;
    }

    getLogic() {
        let el = this.children[0];
        if (!!el) {
            return el.toJSON();
        }
    }

}

customElements.define('deep-logiceditorboard', LogicEditorBoard);