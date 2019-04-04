import {importHTML, importStyle, importModule} from "../util/ImportResources.mjs";
import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            box-sizing: border-box;
        }
        :host {
            position: relative;
            display: block;
            min-width: 100%;
            min-height: 100%;
        }
    </style>
    <slot>
    </slot>
`);

function appendHTML(r) {
    while (r.length > 0) {
        this.appendChild(r[0]);
    }
}

export default class DeepImport extends HTMLElement {

    get style() {
        return this.getAttribute('style');
    }

    set style(val) {
        this.setAttribute('style', val);
    }

    get html() {
        return this.getAttribute('html');
    }

    set html(val) {
        this.setAttribute('html', val);
    }

    get module() {
        return this.getAttribute('module');
    }

    set module(val) {
        this.setAttribute('module', val);
    }

    static get observedAttributes() {
        return ['style', 'html', 'module'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'style':
                if (oldValue != newValue) {
                    importStyle(newValue);
                }
                break;
            case 'html':
                if (oldValue != newValue) {
                    importHTML(newValue).then(appendHTML.bind(this));
                }
                break;
            case 'module':
                if (oldValue != newValue) {
                    importModule(newValue);
                }
                break;
        }
    }

}

customElements.define('deep-import', DeepImport);