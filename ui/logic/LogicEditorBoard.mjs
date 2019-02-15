import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: inline-block;
            width: 20px;
            height: 20px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }
        div {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            background-origin: content-box;
            pointer-events: none;
        }
    </style>
    <div>
        <span id="placeholder">...</span>
    </div>
`);

function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
}

function dropOnPlaceholder(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!!ev.dataTransfer) {
        var id = ev.dataTransfer.getData("text");
        var el = document.getElementById(id);
        if (!!el) {
            if (id.startsWith("logic_onboard_")) {
                moveLogicEl(el, ev.target, ev.ctrlKey);
            } else {
                addLogicEl(el, ev.target);
            }
            exportLogic();
        }
    }
}

export default class LogicEditorBoard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());
        let placeholder = this.shadowRoot.getElementById('placeholder');
        ondrop="dropOnPlaceholder(event)"
        ondragover="allowDrop(event)"
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(val) {
        this.setAttribute('src', val);
    }

    static get observedAttributes() {
        return ['src'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'src':
                if (oldValue != newValue) {
                    this.shadowRoot.querySelector('div').style.backgroundImage = `url("${newValue}")`;
                }
                break;
        }
    }

}

customElements.define('deep-logiceditorboard', LogicEditorBoard);

/*

<div id="logic-and" class="logic-operator logic-and multiple-children" draggable="true">
    <div class="operator-header">AND</div>
    <span class="placeholder">...</span>
</div>
<div id="logic-or" class="logic-operator logic-or multiple-children" draggable="true">
    <div class="operator-header">OR</div>
    <span class="placeholder">...</span>
</div>
<div id="logic-not" class="logic-operator logic-not" draggable="true">
    <div class="operator-header">NOT</div>
    <span class="placeholder">...</span>
</div>
<div id="logic-min" class="logic-operator logic-min" draggable="true">
    <div class="operator-header">MIN <input type="number" MIN="1" MAX="100" value="1" disabled></div>
    <span class="placeholder">...</span>
</div>

*/