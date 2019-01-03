const tpl = new WeakMap;
const PARSER = new DOMParser;

export default class Template {

    constructor(template) {
        if (template instanceof HTMLTemplateElement) {
            tpl.set(this, template);
        } else if (template instanceof HTMLElement) {
            var buf = document.createElement('template');
            buf.appendChild(template);
            tpl.set(this, buf);
        } else {
            var buf = document.createElement('template');
            if (typeof template === "string") {
                buf.innerHTML = template;
            }
            tpl.set(this, buf);
        }
    }

    generate() {
        return document.importNode(tpl.get(this).content, true);
    }

    static generate(template) {
        if (template instanceof HTMLTemplateElement) {
            return document.importNode(template.content, true);
        }
        return "";
    }

}