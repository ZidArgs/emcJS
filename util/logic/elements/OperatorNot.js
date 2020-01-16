import AbstractElement from "./AbstractElement.js";

export default class OperatorNot extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let ch = logic.el;
            if (!!ch) {
                let cl = AbstractElement.getReference(ch.type);
                if (!cl) return;
                let el = new cl;
                el.loadLogic(ch);
                this.append(el);
            }
        }
    }

    toString() {
        let ch = this.children;
        if (!ch[0]) {
            return "0";
        }
        return `!(${ch})`;
    }

    getDependency(res = new Set()) {
        let ch = this.children;
        if (!ch[0]) {
            ch[0].getDependency();
        }
        return res;
    }

}

AbstractElement.registerReference("not", OperatorNot);