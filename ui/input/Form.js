import Template from "../../util/Template.js";
import "./ListSelect.js";

// TODO

const TPL = new Template(`
    <style>
        * {
            position: relative;
            box-sizing: border-box;
        }
    </style>
    <slot></slot>
`);

export default class Form extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
    }

    loadConfiguration(cfg) {

    }

    addStringInput(label, ref, def) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "text");
        input.value = def;
        input.dataset.ref = ref;
        el.append(input);
        this.append(el);
    }

    addNumberInput(label, ref, def, min, max) {
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
        this.append(el);
    }

    addRangeInput(label, ref, def, min, max) {
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
        this.append(el);
    }

    addCheckInput(label, ref, def) {
        let el = generateField(label);
        let input = document.createElement("input");
        input.className = "settings-input";
        input.setAttribute("type", "checkbox");
        input.checked = !!def;
        input.dataset.ref = ref;
        el.append(input);
        this.append(el);
    }

    addChoiceInput(label, ref, def, values) {
        let el = generateField(label);
        let input = document.createElement("select");
        input.className = "settings-input";
        input.setAttribute("type", "input");
        for (let value in values) {
            let opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = values[value];
            input.append(opt);
        }
        input.value = def;
        input.dataset.ref = ref;
        el.append(input);
        this.append(el);
    }

    addListSelectInput(label, ref, def, multimode, values) {
        let el = generateField(label);
        let input = document.createElement("emc-listselect");
        input.className = "settings-input";
        input.setAttribute("type", "list");
        input.multimode = multimode;
        input.value = def;
        input.dataset.ref = ref;
        for (let value in values) {
            let opt = document.createElement('emc-option');
            opt.value = value;
            opt.innerHTML = values[value];
            input.append(opt);
        }
        el.append(input);
        this.append(el);
    }

    addButton(label, ref, text = "", callback) {
        let el = generateField(label);
        let input = document.createElement("button");
        input.className = "settings-button";
        input.setAttribute("type", "button");
        input.dataset.ref = ref;
        input.innerHTML = text;
        if (typeof callback == "function") {
            input.onclick = callback;
        }
        el.append(input);
        this.append(el);
    }

    addElements(content) {
        this.append(content);
    }

}

customElements.define('emc-form', Form);

function generateField(label) {
    let el = document.createElement("label");
    el.className = "settings-option";
    let text = document.createElement("span");
    text.innerHTML = label;
    text.className = "option-text";
    el.append(text);
    return el;
}