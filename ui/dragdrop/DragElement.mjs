const CUSTOM_CSS = `
    :host{
        display:block;
        width:50px;
        height:20px;
    }
`;

const CUSTOM_HTML = `
<style>
    ${CUSTOM_CSS}
</style>
<slot>
</slot>
`;

function dragElement(event) {
    event.dataTransfer.setData("group", event.target.group);
    event.dataTransfer.setData("id", event.target.id);
}

export default class DeepDragElement extends HTMLElement {

    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = CUSTOM_HTML;
        this.ondragstart = dragElement.bind(this);
    }

    get group() {
        return this.getAttribute('group');
    }

    set group(val) {
        this.setAttribute('group', val);
    }

}

customElements.define('deep-dragelement', DeepDropTarget);