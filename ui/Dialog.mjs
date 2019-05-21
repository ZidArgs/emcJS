import DeepWindow from "./Window.mjs";
import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        #footer,
        #submit,
        #cancel {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }
        #text {
            display: block;
            word-wrap: break-word;
            resize: none;
        }
        #footer {
            height: 50px;
            margin-top: 20px;
            padding: 10px 30px 10px;
            -webkit-box-pack: end;
                -ms-flex-pack: end;
                    justify-content: flex-end;
            border-top: solid 2px #cccccc;
        }
        #submit,
        #cancel {
            margin-left: 10px;
            padding: 5px;
            border: solid 1px black;
            border-radius: 2px;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
        }
        #submit:hover,
        #cancel:hover {
            color: white;
            background-color: black;
        }
        #window {
            width: auto;
            min-width: 20vw;
        }
    </style>
    <div id="text">
        [text]
    </div>
    <div id="footer">
        <button id="submit" title="submit">
            submit
        </button>
        <button id="cancel" title="cancel">
            cancel
        </button>
    </div>
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

export default class DeepDialog extends DeepWindow {

    constructor(options = {}) {
        super(options.title, options.close);
        let els = TPL.generate();
        let window = this.shadowRoot.getElementById('window');
        this.shadowRoot.insertBefore(els.children[0], this.shadowRoot.getElementById('focus_catcher_top'));
        window.append(els.getElementById('footer'));

        if (!!options.text && typeof options.text === "string") {
            let text = els.getElementById('text');
            this.shadowRoot.getElementById('body').insertBefore(text, this.shadowRoot.getElementById('body').children[0]);
            text.innerHTML = options.text;
        }
        let footer = this.shadowRoot.getElementById('footer');

        let sbm = this.shadowRoot.getElementById('submit');
        if (!!options.submit) {
            if (typeof options.submit === "string") {
                sbm.innerHTML = options.submit;
                sbm.setAttribute("title", options.submit);
            }
            sbm.onclick = dialogSubmit.bind(this);
        } else {
            footer.removeChild(sbm);
        }

        let ccl = this.shadowRoot.getElementById('cancel');
        if (!!options.cancel) {
            if (typeof options.cancel === "string") {
                ccl.innerHTML = options.cancel;
                ccl.setAttribute("title", options.cancel);
            }
            ccl.onclick = dialogCancel.bind(this);
        } else {
            footer.removeChild(ccl);
        }
    }

    initialFocus() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.push(this.shadowRoot.getElementById('submit'));
        a.push(this.shadowRoot.getElementById('cancel'));
        a.push(this.shadowRoot.getElementById('close'));
        a[0].focus();
    }

    focusFirst() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.push(this.shadowRoot.getElementById('submit'));
        a.push(this.shadowRoot.getElementById('cancel'));
        a.unshift(this.shadowRoot.getElementById('close'));
        a[0].focus();
    }
    
    focusLast() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.push(this.shadowRoot.getElementById('submit'));
        a.push(this.shadowRoot.getElementById('cancel'));
        a.unshift(this.shadowRoot.getElementById('close'));
        a[a.length-1].focus();
    }
    
    static alert(ttl, msg) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                submit: "OK"
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
    
    static confirm(ttl, msg) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                submit: "YES",
                cancel: "NO"
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
    
    static prompt(ttl, msg, def) {
        return new Promise(function(resolve) {
            let d = new DeepDialog({
                title: ttl,
                text: msg,
                submit: "YES",
                cancel: "NO"
            });   
            let el = document.createElement("input");
            el.style.width = "100%";
            el.style.padding = "5px";
            el.style.backgroundColor = "white";
            el.style.border = "solid 1px black";
            el.style.color = "black";
            if (typeof def == "string") {
                el.value = def;
            }
            d.append(el);
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