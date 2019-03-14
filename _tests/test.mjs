
customElements.define('c-test', class Test extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(document.createElement("div"));
    }
    get value() {
        return this.getAttribute('value');
    }
    set value(value) {
        this.setAttribute('value', value);
    }
    getValue() {
        return this.value;
    }
});