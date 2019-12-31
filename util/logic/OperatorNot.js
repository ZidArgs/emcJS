import AbstractElement from "./AbstractElement.js";

export default class OperatorNot extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let cl = AbstractElement.getReference(logic.type);
            if (!cl) return;
            let el = new cl;
            el.loadLogic(logic.el);
            this.append(el);
        }
    }

    toString() {
        let ch = this.children;
        ch = !!ch[0] && ch[0].toString();
        if (!ch) {
            return "";
        }
        return `!${ch}`;
    }

}

AbstractElement.registerReference("not", OperatorNot);