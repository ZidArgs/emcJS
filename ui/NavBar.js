import Template from "../util/Template.js";

const TPL = new Template(`
<style>
    :host {
        display: flex;
        justify-content: space-between;
        top: 0;
        width: 100%;
        min-height: 40px;
        background-color: var(--navigation-background-color, #ffffff);
        color: var(--navigation-text-color, #000000);
        flex-grow: 0;
        flex-shrink: 0;
        z-index: 1000;
    }
    :host * {
        box-sizing: border-box;
    }
    #container {
        display: iblock;
        margin: 0;
        z-index: 100;
    }
    ul {
        position: relative;
        -webkit-padding-start: 0;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -moz-padding-start: 0;
        -moz-margin-before: 0;
        -moz-margin-after: 0;
        list-style: none;
    }
    ul li {
        position: relative;
        min-width: 150px;
        padding: 5px;
        background-color: var(--navigation-background-color, #ffffff);
    }
    ul > li {
        display: inline-block;
    }
    ul > li.select-savegame {
        flex-basis: 0%;
        flex-grow: 1;
        min-width: 200px;
        max-width: 500px;
        margin-right: 10px;
        font-size: 0.8em;
    }
    ul > li > ul {
        left: 0;
        width: 100px;
        z-index: 100;
    }
    ul#content {
        display: inline-flex;
        margin: 0;
    }
    #hamburger-button {
        position: relative;
        display: none;
        width: 40px;
        height: 40px;
        padding: 0px;
        margin: 4px;
        transition: transform 0.2s ease-in-out;
        z-index: 1000;
    }
    #hamburger-button div {
        position: absolute;
        width: 30px;
        height: 4px;
        top: 18px;
        left: 5px;
        background-color: var(--navigation-text-color, #000000);
        transition: transform 0.2s ease-in-out;
    }
    #hamburger-button div:nth-child(1) {
        transform: translateY(-8px);
    }
    #hamburger-button div:nth-child(2) {
        transform-origin: left;
    }
    #hamburger-button div:nth-child(3) {
        transform: translateY(8px);
    }
    #container.open ~ #hamburger-button {
        transform: translateX(calc(100vw - 50px));
    }
    #container.open ~ #hamburger-button div:nth-child(1) {
        transform: rotate(45deg);
    }
    #container.open ~ #hamburger-button div:nth-child(2) {
        transform: scaleX(0);
    }
    #container.open ~ #hamburger-button div:nth-child(3) {
        transform: rotate(-45deg);
    }
    #backface {
        display: none;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 26px;
        border: none;
        border-radius: 0;
        background-color: var(--navigation-background-color, #ffffff);
        color: var(--navigation-text-color, #000000);
        font-weight: bold;
        font-size: 1em;
        text-align: center;
        cursor: pointer;
        outline: none;
        text-decoration: none;
        appearance: none;
        user-select: none;
    }
    button:hover {
        box-shadow: inset 0px 0px 2px 1px;
    }
    button:active {
        box-shadow: inset 0px 0px 4px 3px;
    }
    button:disabled {
        opacity: 0.3;
    }
    ul li > button {
        width: 100%;
    }
    ul#content > li.expandable > button:before {
        display: block;
        padding-right: 5px;
        border-top: solid transparent 4px;
        border-left: solid var(--navigation-text-color, #000000) 6px;
        border-bottom: solid transparent 4px;
        border-right: solid transparent 0px;
        transition: transform 0.2s ease-in-out;
        transform-origin: 3px 4px;
        content: "";
    }
    ul#content > li.expandable.open > button:before {
        transform: rotate(90deg);
    }
    @media (max-width: 500px) {
        :host {
            display: block;
            width: 100vw;
        }
        #container {
            position: absolute;
            width: 100vw;
            left: -100vw;
            height: 100vh;
            padding-right: 50px;
            transition: left 0.2s ease-in-out;
        }
        #container.open {
            left: 0;
        }
        #hamburger-button {
            display: inline-block;
        }
        ul li {
            width: 100%;
        }
        ul li > .hamburger-hide {
            display: none;
        }
        ul#content {
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }
        ul#content > li > ul {
            display: none;
            width: 100%;
            padding: 0 0 0 20px;
        }
        ul#content > li.open > ul {
            display: table;
        }
        ul#content > li > ul:not(:last-child) {
            padding-bottom: 4px;
        }
        button {
            height: 40px;
            padding-left: 10px;
            justify-content: flex-start;
        }
    }
    @media (min-width: 501px) {
        #container.cover {
            position: absolute;
            width: 100vw;
            height: 100vh;
        }
        ul#content {
            flex-wrap: wrap;
            width: 100%;
            padding: 2px 10px;
        }
        ul#content > li > ul {
            position: absolute;
            display: table;
            top: 100%;
            transition: transform 0.2s ease-in-out;
            transform-origin: center top;
            transform: scaleY(0);
        }
        ul#content > li.open > ul {
            transform: scaleY(1);
        }
        ul#content > li > ul > li {
            display: inline-block;
        }
    }
</style>
<div id="container">
    <ul id="content">
    </ul>
</div>
<button id="hamburger-button">
    <div></div>
    <div></div>
    <div></div>
</button>
`);

export default class NavBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());
        let container = this.shadowRoot.getElementById("container");
        let content = this.shadowRoot.getElementById("content");
        this.shadowRoot.getElementById("hamburger-button").onclick = (event) => {
            if (container.classList.contains("open")) {
                container.classList.remove("open");
                container.classList.remove("cover");
                content.querySelectorAll(".open").forEach(function(el) {
                    el.classList.remove("open");
                });
            } else {
                container.classList.add("open");
            }
        };
        container.onclick = (event) => {
            container.classList.remove("open");
            container.classList.remove("cover");
            content.querySelectorAll(".open").forEach(function(el) {
                el.classList.remove("open");
            });
        };
    }

    loadNavigation(config) {
        let content = this.shadowRoot.getElementById("content");
        content.innerHTML = "";
        for (let item of config) {
            let el = document.createElement('li');
            let btn = document.createElement('button');
            if (item.hasOwnProperty("content")) {
                btn.innerHTML = item["content"];
            }
            if (item.hasOwnProperty("tooltip")) {
                btn.setAttribute("title", item["tooltip"]);
            }
            if (item.hasOwnProperty("i18n-content")) {
                btn.setAttribute("i18n-content", item["i18n-content"]);
            }
            if (item.hasOwnProperty("i18n-tooltip")) {
                btn.setAttribute("i18n-tooltip", item["i18n-tooltip"]);
            }
            if (item.hasOwnProperty("handler") && typeof item.handler == "function") {
                btn.addEventListener("click", item.handler);
            }
            el.append(btn);
            if (item.hasOwnProperty("submenu")) {
                let subcontent = document.createElement('ul');
                for (let subitem of item.submenu) {
                    let subel = document.createElement('li');
                    let subbtn = document.createElement('button');
                    if (subitem.hasOwnProperty("content")) {
                        subbtn.innerHTML = subitem["content"];
                    }
                    if (subitem.hasOwnProperty("tooltip")) {
                        subbtn.setAttribute("title", subitem["tooltip"]);
                    }
                    if (subitem.hasOwnProperty("i18n-content")) {
                        subbtn.setAttribute("i18n-content", subitem["i18n-content"]);
                    }
                    if (subitem.hasOwnProperty("i18n-tooltip")) {
                        subbtn.setAttribute("i18n-tooltip", subitem["i18n-tooltip"]);
                    }
                    if (subitem.hasOwnProperty("handler") && typeof subitem.handler == "function") {
                        subbtn.addEventListener("click", subitem.handler);
                    }
                    subel.append(subbtn);
                    subcontent.append(subel);
                }
                el.append(subcontent);
                el.classList.add("expandable");
                btn.addEventListener("click", (event) => {
                    let container = this.shadowRoot.getElementById("container");
                    if (el.classList.contains("open")) {
                        el.classList.remove("open");
                        container.classList.remove("cover");
                    } else {
                        content.querySelectorAll(".open").forEach(function(el) {
                            el.classList.remove("open");
                        });
                        el.classList.add("open");
                        container.classList.add("cover");
                    }
                    event.stopPropagation();
                    return false;
                });
            }
            content.append(el);
        }
    }

    open() {
    }

    close() {
    }

}

customElements.define('emc-navbar', NavBar);