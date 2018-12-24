const tpl = new WeakMap;

export default class Template {

    constructor(template) {
        if (template instanceof HTMLTemplateElement) {
            tpl.set(this, template);
        } else if (template instanceof HTMLElement) {
            var buf = document.createElement('template');
            buf.appendChild(template);
            tpl.set(this, buf);
        } else if (typeof template === "string") {
            var buf = document.createElement('template');
            buf.innerHTML = template;
            tpl.set(this, buf);
        }
    }

    generate() {
        return document.importNode(tpl.get(this).content, true);
    }

}