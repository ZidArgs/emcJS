import Template from "../util/Template.js";

// TODO WebKit - add a wrapper with hbox abilities around panels residing inside a vbox

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 10px;
        }
        #title {
            margin: 10px 0;
            font-size: 2em;
            line-height: 1em;
        }
        #text {
            flex: 1;
            padding: 5px;
            resize: none;
            overflow: scroll;
            background-color: var(--edit-background-color, #ffffff);
            color: var(--edit-text-color, #000000);
            word-wrap: unset;
            white-space: pre;
            user-select: text;
        }
    </style>
    <div id="title">Title</div>
    <textarea id="text"></textarea>
`);

export default class TextEditor extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());

        let text = this.shadowRoot.getElementById("text");
        let textTimer = null;
        text.addEventListener("input", (event) => {
            if (!!textTimer) {
                clearTimeout(textTimer);
            }
            textTimer = setTimeout(() => {
                let event = new Event('change');
                event.value = text.value;
                this.dispatchEvent(event);
            }, 1000);
        });
        text.addEventListener("contextmenu", function(event) {
            event.stopPropagation();
        });
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get title() {
        return this.getAttribute('title');
    }

    set value(value) {
        let notes = this.shadowRoot.getElementById("text");
        notes.value = value;
    }

    get value() {
        let notes = this.shadowRoot.getElementById("text");
        return notes.value;
    }

    static get observedAttributes() {
        return ['title'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                if (oldValue != newValue) {
                    let title = this.shadowRoot.getElementById("title");
                    title.innerText = newValue;
                }
                break;
        }
    }
    

}

customElements.define('emc-texteditor', TextEditor);