import DeepWindow from "./Window.js";
import Template from "../util/Template.js";
import "./selection/ListSelect.js";

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
        #footer,
        #submit,
        #cancel {
            display: flex;
        }
        #categories {
            padding: 5px;
            overflow-x: auto;
            overflow-y: none;
            border-bottom: solid 2px #cccccc;
        }
        .category {
            display: inline-flex;
            margin: 0 2px;
        }
        .panel {
            display: none;
            word-wrap: break-word;
            resize: none;
        }
        .panel.active {
            display: block;
        }
        #footer {
            height: 50px;
            padding: 10px 30px 10px;
            justify-content: flex-end;
            border-top: solid 2px #cccccc;
        }
        #submit,
        #cancel {
            margin-left: 10px;
            padding: 5px;
            border: solid 1px black;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
        }
        .category {
            padding: 5px;
            border: solid 1px black;
            border-radius: 2px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            -webkit-appearance: none;
        }
        .category:hover {
            background-color: gray;
        }
        #submit:hover,
        #cancel:hover,
        .category.active {
            color: white;
            background-color: black;
        }
        label.settings-option {
            display: flex;
            padding: 10px;
            align-items: center;
            justify-content: flex-start;
        }
        label.settings-option:hover {
            background-color: lightgray;
        }
        input[type="checkbox"] {
            margin-right: 10px;
        }
        deep-listselect {
            max-height: 300px;
        }
        .settings-input {
            width: 50%;
        }
        .option-text {
            display: inline-block;
            flex-basis: 500px;
            flex-shrink: 1;
            margin-right: 10px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }
    </style>
    <div id="categories">
        <div class="category" target="about">About</div>
    </div>
    <div class="panel" id="panel_about">
        <slot></slot>
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

function settingsSubmit() {
    let data = {};
    Array.from(this.shadowRoot.querySelectorAll('.panel[data-ref]')).forEach(i => {
        data[i.dataset.ref] = data[i.dataset.ref] || {};
        Array.from(i.querySelectorAll('.settings-input[data-ref]')).forEach(j => {
            switch (j.type) {
                case 'checkbox':
                    data[i.dataset.ref][j.dataset.ref] = j.checked;
                    break;
                case 'number':
                case 'range':
                    data[i.dataset.ref][j.dataset.ref] = parseFloat(j.value);
                    break;
                default:
                    data[i.dataset.ref][j.dataset.ref] = j.value;
                    break;
            }
        });
    });
    let ev = new Event('submit');
    ev.data = data;
    this.dispatchEvent(ev);
    this.close();
}

export default class DeepSettingsWindow extends DeepWindow {

    constructor(title = "Settings", options = {}) {
        super(title, options.close);
        let els = TPL.generate();
        let window = this.shadowRoot.getElementById('window');
        this.shadowRoot.getElementById('body').innerHTML = "";
        this.shadowRoot.insertBefore(els.children[0], this.shadowRoot.getElementById('focus_catcher_top'));
        this.shadowRoot.getElementById('body').append(els.getElementById('panel_about'));
        let ctgrs = els.getElementById('categories');
        window.insertBefore(ctgrs, this.shadowRoot.getElementById('body'));
        window.append(els.getElementById('footer'));

        ctgrs.onclick = (event) => {
            let t = event.target.getAttribute('target');
            if (!!t) {
                this.active = t;
                event.preventDefault();
                return false;
            }
        }

        let sbm = this.shadowRoot.getElementById('submit');
        if (!!options.submit && typeof options.submit === "string") {
            sbm.innerHTML = options.submit;
            sbm.setAttribute("title", options.submit);
        }
        sbm.onclick = settingsSubmit.bind(this);

        let ccl = this.shadowRoot.getElementById('cancel');
        if (!!options.cancel && typeof options.cancel === "string") {
            ccl.innerHTML = options.cancel;
            ccl.setAttribute("title", options.cancel);
        }
        ccl.onclick = () => {
            this.dispatchEvent(new Event('cancel'));
            this.close();
        }
    }

    get active() {
        return this.getAttribute('active');
    }

    set active(val) {
        this.setAttribute('active', val);
    }

    static get observedAttributes() {
        return ['active'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            if (!!oldValue) {
                let ol = this.shadowRoot.getElementById(`panel_${oldValue}`);
                if (!!ol) {
                    ol.classList.remove("active");
                }
                let ob = this.shadowRoot.querySelector(`[target="${oldValue}"]`);
                if (!!ob) {
                    ob.classList.remove("active");
                }
            }
            let nl = this.shadowRoot.getElementById(`panel_${newValue}`);
            if (!!nl) {
                nl.classList.add("active");
            }
            let nb = this.shadowRoot.querySelector(`[target="${newValue}"]`);
            if (!!nb) {
                nb.classList.add("active");
            }
        }
    }

    show(data = {}, category) {
        super.show();
        for (let i in data) {
            let b = this.shadowRoot.getElementById(`panel_${i}`);
            if (!b) continue;
            for (let j in data[i]) {
                let e = b.querySelector(`[data-ref="${j}"]`);
                if (!e) continue;
                if (e.type === "checkbox") {
                    e.checked = !!data[i][j];
                } else {
                    e.value = data[i][j];
                }
            }
        }
        if (!!category) {
            this.active = category;
        } else {
            let ctg = this.shadowRoot.getElementById('categories').children;
            if (!!ctg.length) {
                this.active = ctg[0].getAttribute('target')
            }
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

    addTab(title, id) {
        let pnl = document.createElement('div');
        pnl.className = "panel";
        pnl.id = `panel_${id}`;
        pnl.dataset.ref = id;
        this.shadowRoot.getElementById('body').append(pnl);
        let cb = document.createElement('div');
        cb.className = "category";
        cb.setAttribute('target', id);
        cb.innerHTML = title;
        let cbt = this.shadowRoot.getElementById('categories');
        cbt.insertBefore(cb, cbt.children[cbt.children.length - 1]);
    }

    addStringInput(category, label, ref, def) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "text");
        input.value = def;
        input.dataset.ref = ref;
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addNumberInput(category, label, ref, def, min, max) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "number");
        input.value = def;
        if (!isNaN(min)) {
            input.setAttribute("min", min);
        }
        if (!isNaN(max)) {
            input.setAttribute("max", max);
        }
        input.dataset.ref = ref;
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addRangeInput(category, label, ref, def, min, max) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "range");
        input.value = def;
        if (!isNaN(min)) {
            input.setAttribute("min", min);
        }
        if (!isNaN(max)) {
            input.setAttribute("max", max);
        }
        input.dataset.ref = ref;
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addCheckInput(category, label, ref, def) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "checkbox");
        input.checked = !!def;
        input.dataset.ref = ref;
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addChoiceInput(category, label, ref, def, values) {
        let el = generateField(label);
        let input = document.createElement("select");
        input.className = "settings-input";
        for (let j in values) {
            input.append(createOption(j, values[j]));
        }
        input.value = def;
        input.dataset.ref = ref;
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addListSelectInput(category, label, ref, def, multimode, values) {
        let el = generateField(label);
        let input = document.createElement("deep-listselect");
        input.className = "settings-input";
        input.value = def;
        input.multimode = multimode;
        input.dataset.ref = ref;
        for (let j in values) {
            input.append(createDeepOption(j, values[j]));
        }
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

    addButton(category, label, ref, text = "", callback) {
        let el = generateField(label);
        let input = document.createElement("button");
        input.className = "settings-button";
        input.dataset.ref = ref;
        input.innerHTML = text;
        if (typeof callback == "function") {
            input.onclick = callback;
        }
        el.append(input);
        this.shadowRoot.getElementById(`panel_${category}`).append(el);
    }

}

customElements.define('deep-settingswindow', DeepSettingsWindow);

function generateField(label) {
    let el = document.createElement("label");
    el.className = "settings-option";
    let text = document.createElement("span");
    text.innerHTML = label;
    text.className = "option-text";
    el.append(text);
    return el;
}

function createOption(value, content) {
    let opt = document.createElement('option');
    opt.value = value;
    opt.innerHTML = content;
    return opt;
}

function createDeepOption(value, content) {
    let opt = document.createElement('deep-option');
    opt.value = value;
    opt.innerHTML = content;
    return opt;
}