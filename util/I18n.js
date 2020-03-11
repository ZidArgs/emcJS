import Logger from "./Logger.js";

const OBSERVER_CONFIG = {
    attributes: true,
    childList: true,
    subtree: true
};

const MUTATION_OBSERVER = new MutationObserver(function(mutations) {
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
});

let isObserving = false;
let actLang = "";
let languages = new Map();

function getTranslation(key) {
    if (languages.has(actLang) && languages.get(actLang).has(key)) {
        return languages.get(actLang).get(key).trim();
    }
    Logger.warn(`translation for "${key}" missing`, "I18n");
    return key;
}

function applyLanguage() {
    document.querySelectorAll(`[i18n-content]`).forEach(el=>{
        el.innerHTML = getTranslation(el.getAttribute("i18n-content"));
    });
    document.querySelectorAll(`[i18n-tooltip]`).forEach(el=>{
        el.setAttribute("title", getTranslation(el.getAttribute("i18n-tooltip")));
    });
}

class I18n {

    setLanguage(lang) {
        if (actLang != lang) {
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
        return getTranslation(key);
    }

    forceTranslation() {
        applyLanguage();
    }

    connect() {
        if (!isObserving) {
            isObserving = true;
            MUTATION_OBSERVER.observe(document.documentElement, OBSERVER_CONFIG);
        }
    }

    disconnect() {
        if (!!isObserving) {
            isObserving = false;
            MUTATION_OBSERVER.disconnect();
        }
    }

}

export default new I18n();