import Template from "../../util/Template.js";
import GlobalStyle from "../../util/GlobalStyle.js";
import "../ListHeader.js";
import "./Option.js";

const TPL = new Template(`
<emc-listheader id="header">
</emc-listheader>
<div id="scroll-container">
    <slot id="container">
        <div id="empty">no entries</div>
    </slot>
</div>
`);

const STYLE = new GlobalStyle(`
* {
    position: relative;
    box-sizing: border-box;
}
:host {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    min-height: 200px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    overflow: hidden;
}
#scroll-container {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--list-color-back, #ffffff);
    scrollbar-color: var(--list-color-hover, #b8b8b8) var(--list-color-border, #f1f1f1);
}
#scroll-container::-webkit-scrollbar-track {
    background-color: var(--list-color-border, #f1f1f1);
}
#scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--list-color-hover, #b8b8b8);
}
slot {
    display: block;
    width: 100%;
}
::slotted([value]) {
    display: flex;
    align-items: center;
    min-height: 30px;
    padding: 5px;
    white-space: normal;
    color: var(--list-color-front, #000000);
    background-color: var(--list-color-back, #ffffff);
    border-bottom: solid 1px #eee;
}
::slotted([value][disabled]) {
    display: none;
}
::slotted([value]:hover) {
    background-color: var(--list-color-hover, #b8b8b8);
}
::slotted([value])::before {
    margin: 0 10px 0 4px;
    font-size: 18px;
    content: "☐";
}
::slotted([value].active)::before {
    content: "☑";
}
:host(:not([readonly])) ::slotted([value]:not(.active)),
:host([readonly="false"]) ::slotted([value]:not(.active)),
:host([multimode]:not([multimode="false"]):not([readonly])) ::slotted([value].active),
:host([readonly="false"][multimode]:not([multimode="false"])) ::slotted([value].active) {
    cursor: pointer;
}
#header {
    padding-right: 2px;
    padding-left: 2px;
}
#empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    min-height: 30px;
    padding: 5px;
    margin: 5px 2px;
    white-space: normal;
}
`);

function clickOption(event) {
    if (!this.readonly) {
        const value = event.currentTarget.getAttribute("value");
        if (this.multimode) {
            const arr = this.value;
            const set = new Set(arr);
            if (set.has(value)) {
                set.delete(value);
            } else {
                set.add(value);
            }
            this.value = Array.from(set);
        } else {
            this.value = value;
        }
    }
}

export default class ListSelect extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        STYLE.apply(this.shadowRoot);
        /* --- */
        this.shadowRoot.getElementById("container").addEventListener("slotchange", event => {
            const all = this.querySelectorAll(`[value]`);
            all.forEach(el => {
                if (!!el) {
                    el.onclick = clickOption.bind(this);
                }
            });
            this.calculateItems();
        });
        /* header */
        const header = this.shadowRoot.getElementById("header");
        header.addEventListener('check', event => {
            if (this.multimode) {
                const all = this.querySelectorAll(`[value]`);
                const value = [];
                if (event.value) {
                    all.forEach(el => {
                        if (!!el && el.style.display == "" || el.classList.contains("active")) {
                            value.push(el.value);
                        }
                    });
                } else {
                    all.forEach(el => {
                        if (!!el && el.style.display == "none" && el.classList.contains("active")) {
                            value.push(el.value);
                        }
                    });
                }
                this.value = value;
            }
        });
        header.addEventListener('filter', event => {
            const all = this.querySelectorAll(`[value]`);
            let checked = false;
            let unchecked = false;
            if (!!event.value) {
                const regEx = new RegExp(`.*${event.value.split(" ").join(".*")}.*`, "i");
                all.forEach(el => {
                    if (el.innerText.match(regEx)) {
                        el.style.display = "";
                        if (el.classList.contains("active")) {
                            checked = true;
                        } else {
                            unchecked = true;
                        }
                    } else {
                        el.style.display = "none";
                    }
                });
            } else {
                all.forEach(el => {
                    el.style.display = "";
                    if (el.classList.contains("active")) {
                        checked = true;
                    } else {
                        unchecked = true;
                    }
                });
            }
            if (this.multimode) {
                if (checked) {
                    if (unchecked) {
                        header.checked = "mixed";
                    } else {
                        header.checked = true;
                    }
                } else {
                    header.checked = false;
                }
            }
        });
    }

    connectedCallback() {
        const all = this.querySelectorAll(`[value]`);
        if (!this.value && !!all.length) {
            this.value = all[0].value;
        }
        all.forEach(el => {
            if (!!el) {
                el.onclick = clickOption.bind(this);
            }
        });
        this.calculateItems();
    }

    get value() {
        let val = this.getAttribute('value');
        if (this.multimode) {
            val = JSON.parse(val);
        }
        return val;
    }

    set value(val) {
        if (this.multimode) {
            if (!Array.isArray(val)) {
                val = [val];
            }
            val = JSON.stringify(val);
        }
        this.setAttribute('value', val);
    }

    get multimode() {
        return this.getAttribute('multimode') == "true";
    }

    set multimode(val) {
        this.setAttribute('multimode', val);
    }

    get readonly() {
        const val = this.getAttribute('readonly');
        return !!val && val != "false";
    }

    set readonly(val) {
        this.setAttribute('readonly', val);
    }

    static get observedAttributes() {
        return ['value', 'multimode'];
    }
      
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                if (oldValue != newValue) {
                    this.calculateItems();
                    const event = new Event('change');
                    event.oldValue = oldValue;
                    event.newValue = newValue;
                    event.value = newValue;
                    this.dispatchEvent(event);
                }
                break;
            case 'multimode':
                if (oldValue != newValue) {
                    if (newValue != "true") {
                        const arr = JSON.parse(this.getAttribute('value'));
                        if (arr.length > 1) {
                            this.value = arr[0];
                        }
                    } else {
                        this.value = [this.getAttribute('value')];
                    }
                    const header = this.shadowRoot.getElementById("header");
                    header.multimode = newValue;
                }
                break;
        }
    }

    resetSearch() {
        const header = this.shadowRoot.getElementById("header");
        header.search = "";
    }
    
    calculateItems() {
        const header = this.shadowRoot.getElementById("header");
        const all = this.querySelectorAll(`[value]`);
        if (this.multimode) {
            const vals = new Set(this.value);
            let checked = false;
            let unchecked = false;
            all.forEach(el => {
                if (!!el) {
                    if (vals.has(el.value)) {
                        el.classList.add("active");
                        if (el.style.display == "") {
                            checked = true;
                        }
                    } else {
                        el.classList.remove("active");
                        if (el.style.display == "") {
                            unchecked = true;
                        }
                    }
                }
            });
            if (checked) {
                if (unchecked) {
                    header.checked = "mixed";
                } else {
                    header.checked = true;
                }
            } else {
                header.checked = false;
            }
        } else {
            all.forEach(el => {
                if (!!el) {
                    if (this.value == el.value) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                }
            });
        }
    }

}

customElements.define('emc-listselect', ListSelect);
