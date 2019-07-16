import Template from "../util/Template.js";

const TPL = new Template(`
    <style>
        :host {
            position: fixed;
            display: flex;
            justify-content: center;
            left: 0;
            right: 0;
            bottom: 50px;
            cursor: pointer;
            pointer-events: none;
            z-index: 999999999;
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

// TODO better toasting

function appendToast(el, timeout) {
    if (parseInt(timeout) === 0) {
        el.onclick = function() {
            document.body.removeChild(el);
        }
    } else {
        let t = setTimeout(function () {
            document.body.removeChild(el);
        }, parseInt(timeout) || 5000);
        el.onclick = function() {
            clearTimeout(t);
            document.body.removeChild(el);
        }
    }
    document.body.append(el);
}

function showToast(text, timeout) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    appendToast(el, timeout);
}

function showSuccessToast(text, timeout) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "success";
    appendToast(el, timeout);
}

function showInfoToast(text, timeout) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "info";
    appendToast(el, timeout);
}

function showWarnToast(text, timeout) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "warning";
    appendToast(el, timeout);
}

function showErrorToast(text, timeout) {
    let el = document.createElement('div');
    el.attachShadow({mode: 'open'});
    el.shadowRoot.append(TPL.generate());
    let txt = el.shadowRoot.getElementById('text');
    txt.innerHTML = text;
    txt.className = "error";
    appendToast(el, timeout);
}

export {showToast, showSuccessToast, showInfoToast, showWarnToast, showErrorToast};