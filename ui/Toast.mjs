import DeepWindow from "./Window.mjs";
import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            position: fixed;
            display: inline-flex;
            justify-content: center;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 50px;
            cursor: pointer;
        }
        span {
            position: relative;
            box-sizing: border-box;
            disply: inline-block;
            padding: 20px;
            box-shadow: 2px 2px 2px black;
            whitespace: pre;
            background-color: #003355;
            color: #0088ff;
        }
    </style>
    <span id="text"></span>
`);

function showToast(text) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.appendChild(TPL.generate());
    el.shadowRoot.getElementById('text').innerHTML = text;
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 5000);
    el.onclick = function() {
        clearTimeout(t);
        document.body.removeChild(el);
    }
    document.body.appendChild(el);
}

export {showToast};