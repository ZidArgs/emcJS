import Logger from "../util/Logger.mjs";

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

const PARSER = new DOMParser();

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
                    let t = document.createElement("link");
                    t.href = newValue;
                    t.rel = "stylesheet";
                    t.type = "text/css";
                    document.head.appendChild(t);
                }
                break;
            case 'html':
                if (oldValue != newValue) {
                    fetch(newValue)
                        	.then(r => r.text())
                            .then(r => PARSER.parseFromString(r, "text/html"))
                            .then(r => {
                                while (r.body.childNodes.length > 0) {
                                    this.appendChild(r.body.childNodes[0]);
                                }
                            })
                            .catch(e => Logger.error(e));
                }
                break;
            case 'module':
                if (oldValue != newValue) {
                    let t = document.createElement("script");
                    t.src = newValue;
                    t.type = "module";
                    document.head.appendChild(t);
                }
                break;
        }
    }

}

customElements.define('deep-import', DeepImport);