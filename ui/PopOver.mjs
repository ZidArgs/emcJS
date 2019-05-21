import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            position: fixed;
            display: flex;
            justify-content: center;
            right: 50px;
            top: 50px;
            cursor: pointer;
            pointer-events: none;
        }
        #text {
            position: relative;
            box-sizing: border-box;
            disply: inline-block;
            padding: 20px;
            box-shadow: 5px 5px 20px black;
            whitespace: pre;
            color: #000000;
            background-color: #ffffff;
            pointer-events: all;
        }
        #close {
            position: absolute;
            top: 2px;
            right: 2px;
            display: flex;
            width: 15px;
            height: 15px;
            border: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
            font-size: 10px;
            line-height: 1em;
            pointer-events: all;
        }
        #close:hover {
            color: white;
            background-color: red;
        }
    </style>
    <span id="text"></span>
    <button id="close" title="close">✖</button>
`);

function showPopover(text = "", onclick) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    el.shadowRoot.getElementById('text').innerHTML = text;
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 10000);
    el.onclick = function(ev) {
        clearTimeout(t);
        document.body.removeChild(el);
        if (typeof onclick == "function") onclick();
        ev.stopPropagation();
    }
    el.shadowRoot.getElementById('close').onclick = function(ev) {
        clearTimeout(t);
        document.body.removeChild(el);
        ev.stopPropagation();
    }
    document.body.append(el);
}

export {showPopover};