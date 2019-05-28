import Template from "../../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            display: flex;
            --item-size: 40px;
            justify-content: stretch;
            align-items: stretch;
        }
        ::slotted(:not(:first-child)) {
            display: none;
        }
    </style>
    <slot>
    </slot>
`);

export default class DeepLayout extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    get layout() {
        return this.getAttribute('layout');
    }

    set layout(val) {
        this.setAttribute('layout', val);
    }

    static get observedAttributes() {
        return ['layout'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'layout':
                if (oldValue != newValue) {
                    let layout = GlobalData.get("layouts")[newValue];
                    if (!!layout) {
                        
                    }
                }
            break;
        }
    }

}

customElements.define('deep-layout', DeepLayout);