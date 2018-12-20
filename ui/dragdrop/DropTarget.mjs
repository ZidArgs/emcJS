const CUSTOM_CSS = `
    :host{
        display:block;
        width:50px;
        height:20px;
    }
    div{
        width:100%;
        height:100%;
        user-select:none;
    }
`;

const CUSTOM_HTML = `
<style>
    ${CUSTOM_CSS}
</style>
<slot>
    <div>
        ...
    </div>
</slot>
`;

const pView = new WeakMap;

function dropElement(event) {
    if (!!this.group && !event.dataTransfer || event.dataTransfer.getData('group') !== this.group) {
        return;
    }
    var el = document.getElementById(event.dataTransfer.getData("id"));
    if (!!el) {
        this.appendChild(el);
    }
    event.preventDefault();
    event.stopPropagation();
}

function allowDrop(event) {
    if (!!this.group && !event.dataTransfer || event.dataTransfer.getData('group') !== this.group) {
        return;
    }
    event.preventDefault();
    event.stopPropagation();
}

export default class DeepDropTarget extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = CUSTOM_HTML;
        this.ondrop = dropElement.bind(this);
        this.ondragover = allowDrop.bind(this);
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('deep-droptarget', DeepDropTarget);