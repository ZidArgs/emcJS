import DeepTemplate from "../util/Template.mjs";

const TPL = new DeepTemplate(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        :host,
        .footer,
        .button {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }
        :host {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            -webkit-box-align: start;
                -ms-flex-align: start;
                    align-items: flex-start;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            z-index: 1000000;
        }
        .window {
            display: table;
            height: 100px;
            margin-top: 100px;
            color: black;
            background-color: white;
            border: solid 2px #cccccc;
            border-radius: 4px;
        }
        .title {
            font-size: 1.5em;
            padding: 10px 20px 10px;
            font-weight: bold;
            overflow: hidden;
            border-bottom: solid 2px #cccccc;
        }
        .body {
            display: block;
            padding: 20px;
            min-width: 20vw;
            max-width: 1000px;
            min-height: 10vh;
            max-height: 50vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .text {
            display: block;
            padding-bottom: 20px;
            word-wrap: break-word;
            resize: none;
        }
        .footer {
            height: 50px;
            margin-top: 20px;
            padding: 10px 30px 10px;
            -webkit-box-pack: end;
                -ms-flex-pack: end;
                    justify-content: flex-end;
            border-top: solid 2px #cccccc;
        }
        .button {
            margin-left: 10px;
            padding: 5px;
            border: solid 1px black;
            border-radius: 2px;
        }
        .close-button {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 20px;
            height: 20px;
            border: none;
            line-height: 0.9em;
        }
        .button,
        .close-button {
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
        }
        .button:hover,
        .close-button:hover {
            color: white;
            background-color: black;
        }
        :focus {
            -webkit-box-shadow: #3b92ff 0 0px 6px 3px;
                    box-shadow: #3b92ff 0 0px 6px 3px;
        }
        .hidden {
            display: none;
        }
    </style>
    <div id="focus_catcher_top" tabindex="0"></div>
    <div class="window" id="dialog" role="dialog" aria-modal="true" aria-labelledby="title" aria-describedby="title">
        <div id="title" class="title">
            [title]
        </div>
        <div id="text" class="text">
            [title]
        </div>
        <div class="body">
            <slot></slot>
        </div>
        <div id="footer" class="footer">
            <button id="button_submit" class="button" title="SUBMIT">
                SUBMIT
            </button>
            <button id="button_cancel" class="button" title="CANCEL">
                CANCEL
            </button>
        </div>
        <button id="button_close" class="button close-button" title="close">✖</button>
    </div>
    <div id="focus_catcher_bottom" tabindex="0"></div>
`);

const Q_TAB = [
    'button:not([tabindex="-1"])',
    '[href]:not([tabindex="-1"])',
    'input:not([tabindex="-1"])',
    'select:not([tabindex="-1"])',
    'textarea:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');

function dialogSubmit() {
    this.dispatchEvent(new Event('submit'));
    document.body.removeChild(this);
}

function dialogCancel() {
    this.dispatchEvent(new Event('cancel'));
    document.body.removeChild(this);
}

function dialogClose() {
    this.dispatchEvent(new Event('close'));
    document.body.removeChild(this);
}

function focusFirst() {
    let a = Array.from(this.querySelectorAll(Q_TAB));
    a.push.apply(a, Array.from(this.shadowRoot.getElementById('dialog').querySelectorAll(Q_TAB)));
    a[0].focus();
}

function focusLast() {
    let a = Array.from(this.querySelectorAll(Q_TAB));
    a.push.apply(a, Array.from(this.shadowRoot.getElementById('dialog').querySelectorAll(Q_TAB)));
    a[a.length-1].focus();
}

export default class DeepDialog extends HTMLElement {

    constructor(options = {}) {
        super();
        this.onkeydown = function(ev) {
            var key = ev.which || ev.keyCode;
            if (key == 27) {
                dialogClose.call(this);
            }
            ev.stopPropagation();
        };
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());

        /* init */
        let dialog = this.shadowRoot.getElementById('dialog');
        let title = this.shadowRoot.getElementById('title');
        if (!!options.title && typeof options.title === "string") {
            title.innerHTML = options.title;
        } else {
            dialog.removeChild(title);
        }
        let text = this.shadowRoot.getElementById('text');
        if (!!options.text && typeof options.text === "string") {
            text.innerHTML = options.text;
        } else {
            dialog.removeChild(text);
        }
        let footer = this.shadowRoot.getElementById('footer');
        let button_submit = this.shadowRoot.getElementById('button_submit');
        if (!!options.button_submit && typeof options.button_submit === "string") {
            button_submit.innerHTML = options.button_submit;
            button_submit.setAttribute("title", options.button_submit);
            button_submit.onclick = dialogSubmit.bind(this);
        } else {
            footer.removeChild(button_submit);
        }
        let button_cancel = this.shadowRoot.getElementById('button_cancel');
        if (!!options.button_cancel && typeof options.button_cancel === "string") {
            button_cancel.innerHTML = options.button_cancel;
            button_cancel.setAttribute("title", options.button_cancel);
            button_cancel.onclick = dialogCancel.bind(this);
        } else {
            footer.removeChild(button_cancel);
        }
        let button_close = this.shadowRoot.getElementById('button_close');
        if (!!options.button_close && typeof options.button_close === "string") {
            button_close.setAttribute("title", options.button_close);
        }
        button_close.onclick = dialogClose.bind(this);
        this.shadowRoot.getElementById('focus_catcher_top').onfocus = focusLast.bind(this);
        this.shadowRoot.getElementById('focus_catcher_bottom').onfocus = focusFirst.bind(this);
    }

    show() {
        document.body.appendChild(this);
        focusFirst.call(this);
    }
    
    static alert(ttl, msg) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                button_submit: "OK"
            });
            d.onsubmit = function() {
                resolve(true);
            }
            d.oncancel = function() {
                resolve(false);
            }
            d.onclose = function() {
                resolve();
            }
            d.show();
        });
    }
    
    static confirm(ttl, msg, ret) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                button_submit: "YES",
                button_cancel: "NO"
            });
            d.onsubmit = function() {
                resolve(true);
            }
            d.oncancel = function() {
                resolve(false);
            }
            d.onclose = function() {
                resolve();
            }
            d.show();
        });
    }
    
    static prompt(ttl, msg, ret) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                button_submit: "YES",
                button_cancel: "NO"
            });   
            var el = document.createElement("input");
            el.style.width = "100%";
            el.style.padding = "5px";
            el.style.backgroundColor = "white";
            el.style.border = "solid 1px black";
            el.style.color = "black";
            d.appendChild(el);
            d.onsubmit = function() {
                resolve(el.value);
            }
            d.oncancel = function() {
                resolve(false);
            }
            d.onclose = function() {
                resolve();
            }
            d.show();
        });
    }

}

customElements.define('deep-dialog', DeepDialog);