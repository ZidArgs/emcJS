import Logger from "../util/Logger.mjs";
import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            display: content;
            position: relative;
            box-sizing: border-box;
        }
    </style>
    <div>
    </div>
`);

const PARSER = new DOMParser();

export default class DeepImport extends HTMLElement {

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
        }
    }

}

customElements.define('deep-import', DeepImport);