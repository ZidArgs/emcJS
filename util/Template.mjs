const TEMPLATE = new WeakMap;
const PARSER = new DOMParser;

export default class Template {

    constructor(template) {
        let buf;
        if (template instanceof HTMLTemplateElement) {
            TEMPLATE.set(this, template);
            buf = template;
        } else if (template instanceof HTMLElement) {
            var buf = document.createElement('template');
            buf.appendChild(template);
            TEMPLATE.set(this, buf);
        } else {
            var buf = document.createElement('template');
            if (typeof template === "string") {
                buf.innerHTML = template;
            }
            TEMPLATE.set(this, buf);
        }
        if (!!window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(buf, 'awesome-button');
        }
    }

    generate() {
        return document.importNode(TEMPLATE.get(this).content, true);
    }

    static generate(template) {
        if (template instanceof HTMLTemplateElement) {
            return document.importNode(template.content, true);
        }
        return "";
    }

}