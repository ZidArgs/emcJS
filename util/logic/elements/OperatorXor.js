import AbstractElement from "./AbstractElement.js";

export default class OperatorXor extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            for (let i = 0; i < logic.el.length && i < 2; ++i) {
                let ch = logic.el[i];
                if (!!ch) {
                    let cl = AbstractElement.getReference(ch.type);
                    if (!cl) continue;
                    let el = new cl;
                    el.loadLogic(ch);
                    this.append(el);
                }
            }
        }
    }

    toString() {
        let ch = this.children;
        if (!ch[0] && !ch[1]) {
            return "0";
        }
        if (!ch[0]) {
            return ch[0].toString();
        }
        if (!ch[1]) {
            return ch[1].toString();
        }
        return `(!${ch[0]}!=!${ch[1]})`;
    }

    getDependency(res = new Set()) {
        let ch = this.children;
        if (!ch[0]) {
            ch[0].getDependency(res);
        }if (!ch[1]) {
            ch[1].getDependency(res);
        }
        return res;
    }

}

AbstractElement.registerReference("xor", OperatorXor);