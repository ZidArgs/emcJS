import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicNot extends LogicAbstractElement {

    loadLogic(logic) {
        if (!!logic && !!logic.el) {
            let el = new (LogicAbstractElement.getReference(logic.el.type));
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

LogicAbstractElement.registerReference("not", LogicNot);