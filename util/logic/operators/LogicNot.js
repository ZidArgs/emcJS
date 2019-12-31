import AbstractElement from "../AbstractElement.js";

export default class LogicNot extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (AbstractElement.getReference(logic.el.type));
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

AbstractElement.registerReference("not", LogicNot);