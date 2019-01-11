import DeepWindow from "./Window.mjs";
import Template from "../util/Template.mjs";

const TPL = new Template(`
    <style>
        :host {
            position: fixed;
            display: inline-block;
            left: 0;
            right: 0;
            margin: auto;
            bottom: 50px;
            cursor: pointer;
        }
        #text {
            position: relative;
            box-sizing: border-box;
            disply: inline-block;
            padding: 20px;
            box-shadow: 2px 2px 2px black;
            whitespace: pre;
            color: #000000;
            background-color: #ffffff;
        }
        #text.success {
            color: #4f8a10;
            background-color: #dff2bf;
        }
        #text.info {
            color: #00529b;
            background-color: #bde5f8;
        }
        #text.warning {
            color: #9f6000;
            background-color: #feefb3;
        }
        #text.error {
            color: #d8000c;
            background-color: #ffd2d2;
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

function showSuccessToast(text) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.appendChild(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "success";
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 5000);
    el.onclick = function() {
        clearTimeout(t);
        document.body.removeChild(el);
    }
    document.body.appendChild(el);
}

function showInfoToast(text) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.appendChild(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "info";
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 5000);
    el.onclick = function() {
        clearTimeout(t);
        document.body.removeChild(el);
    }
    document.body.appendChild(el);
}

function showWarnToast(text) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.appendChild(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "warning";
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 5000);
    el.onclick = function() {
        clearTimeout(t);
        document.body.removeChild(el);
    }
    document.body.appendChild(el);
}

function showErrorToast(text) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.appendChild(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "error";
    let t = setTimeout(function () {
        document.body.removeChild(el);
    }, 5000);
    el.onclick = function() {
        clearTimeout(t);
        document.body.removeChild(el);
    }
    document.body.appendChild(el);
}

export {showToast, showSuccessToast, showInfoToast, showWarnToast, showErrorToast};