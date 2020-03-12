import Logger from "./Logger.js";

const OBSERVER_CONFIG = {
    attributes: true,
    childList: true,
    subtree: true
};

const MUTATION_OBSERVER_CALLBACK = function(mutations) {
    mutations.forEach(function(mutation) {
        switch(mutation.type) {
            case "childList":
                mutation.addedNodes.forEach(el=>{
                    if (el.nodeType == Node.ELEMENT_NODE) {
                        if (el.hasAttribute("i18n-content")) {
                            el.innerHTML = getTranslation(el.getAttribute("i18n-content"));
                        }
                        if (el.hasAttribute("i18n-tooltip")) {
                            el.setAttribute("title", getTranslation(el.getAttribute("i18n-tooltip")));
                        }
                    }
                });
            break;
            case "attributes":
                if (mutation.target.nodeType == Node.ELEMENT_NODE) {
                    switch(mutation.attributeName) {
                        case "i18n-content":
                            mutation.target.innerHTML = getTranslation(mutation.target.getAttribute("i18n-content"));
                        break;
                        case "i18n-tooltip":
                            mutation.target.setAttribute("title", getTranslation(mutation.target.getAttribute("i18n-tooltip")));
                        break;
                    }
                }
            break;
        }
    });
};

let observers = new Map();
let actLang = "";
let languages = new Map();

function getTranslation(key) {
    if (languages.get(actLang).has(key)) {
        return languages.get(actLang).get(key).trim();
    }
    Logger.warn(`translation for "${key}" missing`, "I18n");
    return key;
}

function applyLanguage() {
    getAllElements("[i18n-content],[i18n-tooltip]").forEach(el=>{
        if (el.hasAttribute("i18n-content")) {
            el.innerHTML = getTranslation(el.getAttribute("i18n-content"));
        }
        if (el.hasAttribute("i18n-tooltip")) {
            el.setAttribute("title", getTranslation(el.getAttribute("i18n-tooltip")));
        }
    });
}

function getAllElements(selector = "*", root = document) {
    let res = Array.from(root.querySelectorAll(selector));
    let buf = Array.from(root.querySelectorAll("*"));
    for (let el of buf) {
        if (el.shadowRoot != null) {
            res = res.concat(getAllElements(selector, el.shadowRoot));
        }
    }
    return res;
}

class I18n {

    setLanguage(lang) {
        if (actLang != lang && languages.has(lang)) {
            actLang = lang;
            applyLanguage();
        }
    }
    
    setTranslation(lang, values = {}) {
        if (typeof lang != "string") return;
        if (!languages.has(lang)) {
            languages.set(lang, new Map());
        }
        if (!actLang) {
            actLang = lang;
        }
        for (let key in values) {
            if (typeof key != "string") continue;
            if (typeof values[key] != "string") continue;
            languages.get(lang).set(key, values[key]);
        }
        if (lang == actLang) {
            applyLanguage();
        }
    }

    translate(key) {
        if (!!actLang) {
            return getTranslation(key);
        }
        Logger.warn(`no translation loaded`, "I18n");
        return key;
    }

    forceTranslation() {
        if (!!actLang) {
            applyLanguage();
        }
    }

    connect(element = document.documentElement) {
        if (!observers.has(element)) {
            let obs = new MutationObserver(MUTATION_OBSERVER_CALLBACK);
            obs.observe(element, OBSERVER_CONFIG);
            observers.set(element, obs);
        }
    }

    disconnect(element = document.documentElement) {
        if (!!observers.has(element)) {
            let obs = observers.get(element);
            obs.disconnect();
            observers.remove(element);
        }
    }

}

export default new I18n();