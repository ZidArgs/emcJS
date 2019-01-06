import Template from "../util/Template.mjs";

const TPL = new Template(`
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
            position: absolute !important;
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
        #window {
            display: table;
            width: 100%;
            max-width: 1000px;
            margin-top: 100px;
            color: black;
            background-color: white;
            border: solid 2px #cccccc;
            border-radius: 4px;
            resize: both;
        }
        #header {
            display: flex;
            border-bottom: solid 2px #cccccc;
        }
        #title {
            display: flex;
            -webkit-box-align: center;
               -ms-flex-align: center;
                  align-items: center;
            flex: 1;
            height: 30px;
            padding: 0 10px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1em;
            line-height: 1em;
        }
        #close {
            display: flex;
            width: 40px;
            height: 30px;
            border: none;
            -webkit-box-align: center;
               -ms-flex-align: center;
                  align-items: center;
            -webkit-box-pack: center;
               -ms-flex-pack: center;
             justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
            font-size: 1.2em;
            line-height: 1em;
        }
        #close:hover {
            color: white;
            background-color: red;
        }
        #body {
            display: block;
            padding: 5px;
            min-height: 10vh;
            max-height: 50vh;
            overflow: auto;
        }
        :focus {
            -webkit-box-shadow: #3b92ff 0 0px 6px 3px;
                    box-shadow: #3b92ff 0 0px 6px 3px;
        }
    </style>
    <div id="focus_catcher_top" tabindex="0"></div>
    <div id="window" role="dialog" aria-modal="true" aria-labelledby="title" aria-describedby="title">
        <div id="header">
            <div id="title"></div>
            <button id="close" title="close">✖</button>
        </div>
        <div id="body">
            <slot></slot>
        </div>
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

export default class DeepWindow extends HTMLElement {

    constructor(title = "", close = "close") {
        super();
        this.onkeydown = function(ev) {
            var key = ev.which || ev.keyCode;
            if (key == 27) {
                windowClose.call(this);
            }
            ev.stopPropagation();
        };
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(TPL.generate());

        let ttl = this.shadowRoot.getElementById('title');
        if (!!title && typeof title === "string") {
            ttl.innerHTML = title;
        }
        let cls = this.shadowRoot.getElementById('close');
        if (!!close && typeof close === "string") {
            cls.setAttribute("title", close);
        }
        cls.onclick = () => this.close();
        this.shadowRoot.getElementById('focus_catcher_top').onfocus = () => this.focusLast();
        this.shadowRoot.getElementById('focus_catcher_bottom').onfocus = () => this.focusFirst();
    }

    show() {
        document.body.appendChild(this);
        this.initialFocus();
    }

    close() {
        document.body.removeChild(this);
        this.dispatchEvent(new Event('close'));
    }

    initialFocus() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.push(this.shadowRoot.getElementById('close'));
        a[0].focus();
    }

    focusFirst() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.unshift(this.shadowRoot.getElementById('close'));
        a[0].focus();
    }
    
    focusLast() {
        let a = Array.from(this.querySelectorAll(Q_TAB));
        a.unshift(this.shadowRoot.getElementById('close'));
        a[a.length-1].focus();
    }

}

customElements.define('deep-window', DeepWindow);