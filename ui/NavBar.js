import Template from "../util/Template.js";

const TPL = new Template(`
<style>
    @media (max-width: 500px) {
        #container {
            display: block;
            width: 100vw;
        }
        #container #hamburger-button {
            display: inline-block;
        }
        #container.open #navigation > ul {
            left: 0;
        }
        #navigation ul li {
            width: 100%;
        }
        #navigation ul li > * {
            height: 40px;
        }
        #navigation ul li > .hamburger-hide {
            display: none;
        }
        #navigation > ul {
            position: absolute;
            width: 100vw;
            left: -100vw;
            padding-right: 60px;
            flex-direction: column;
            transition: left 0.2s;
        }
        #navigation > ul > li > ul {
            display: table;
            width: 100%;
            padding: 0px;
        }
        #navigation > ul > li > ul:not(:last-child) {
            padding-bottom: 4px;
        }
    }
    @media (min-width: 501px) {
        #navigation > ul {
            width: 100%;
        }
        #navigation > ul > li:hover > ul {
            display: table;
        }
        #navigation > ul > li > ul {
            position: absolute;
            display: none;
            top: 100%;
        }
        #navigation > ul > li > ul > li {
            display: inline-block;
        }
    }
    #container {
        display: content;
    }
    #container #hamburger-button {
        position: relative;
        display: none;
        width: 40px;
        height: 40px;
        margin: 4px;
        transition: transform 0.2s;
        z-index: 1000;
    }
    #container #hamburger-button div {
        position: absolute;
        width: 30px;
        height: 4px;
        top: 18px;
        left: 5px;
        background-color: var(--navigation-text-color, #000000);
        transition: transform 0.2s ease-in-out;
    }
    #container #hamburger-button div:nth-child(1) {
        transform: translateY(-8px);
    }
    #container #hamburger-button div:nth-child(2) {
        transform-origin: left;
    }
    #container #hamburger-button div:nth-child(3) {
        transform: translateY(8px);
    }
    #container.open #hamburger-button {
        transform: translateX(calc(100vw - 60px));
    }
    #container.open #hamburger-button div:nth-child(1) {
        transform: rotate(45deg);
    }
    #container.open #hamburger-button div:nth-child(2) {
        transform: scaleX(0);
    }
    #container.open #hamburger-button div:nth-child(3) {
        transform: rotate(-45deg);
    }
    #navigation {
        display: flex;
        justify-content: space-between;
        top: 0;
        width: 100%;
        padding: 2px 10px;
        background-color: var(--navigation-background-color, #ffffff);
        color: var(--navigation-text-color, #000000);
        flex-grow: 0;
        flex-shrink: 0;
        z-index: 1000;
    }
    #navigation ul {
        position: relative;
        -webkit-padding-start: 0;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -moz-padding-start: 0;
        -moz-margin-before: 0;
        -moz-margin-after: 0;
        list-style: none;
    }
    #navigation ul li {
        position: relative;
        min-width: 150px;
        padding: 5px;
    }
    #navigation ul li > * {
        width: 100%;
        height: 26px;
    }
    #navigation ul li > .splitter {
        height: 2px;
        width: auto;
    }
    #navigation > ul {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0;
        background-color: var(--navigation-background-color, #ffffff);
        z-index: 100;
    }     
    #navigation ul > li {
        display: inline-block;
    }
    #navigation ul > li.select-savegame {
        flex-basis: 0%;
        flex-grow: 1;
        min-width: 200px;
        max-width: 500px;
        margin-right: 10px;
        font-size: 0.8em;
    }
    #navigation ul > li > ul {
        left: 0;
        width: 100px;
        z-index: 100;
        background-color: var(--navigation-background-color, #ffffff);
    }
    button {
        appearance: none;
        padding: 5px;
        border: none;
        border-radius: 0;
        background-color: var(--navigation-background-color, #ffffff);
        color: var(--navigation-text-color, #000000);
        outline: none;
        text-decoration: none;
        font-weight: bold;
        font-size: 1em;
        text-align: center;
        cursor: pointer;
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
</style>
<div id="container">
    <nav id="navigation">
        <ul id="content">
        </ul>
    </nav>
    <button id="hamburger-button">
        <div></div>
        <div></div>
        <div></div>
    </button>
</div>
`);

export class NavBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(TPL.generate());

        this.shadowRoot.getElementById("hamburger-button").onclick = function(event) {
            this.shadowRoot.getElementById("container").classList.toggle("open");
        }
    }

    loadNavigation(config) {
        let content = this.shadowRoot.getElementById("content");
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
            }
            content.append(el);
        }
    }

}

customElements.define('emc-navbar', NavBar);