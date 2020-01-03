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
        let ch0 = !!ch[0] && ch[0].toString();
        let ch1 = !!ch[1] && ch[1].toString();
        if (!ch0 && !ch1) {
            return "";
        }
        if (!ch0) {
            return ch1;
        }
        if (!ch1) {
            return ch0;
        }
        return `(!${ch0}!=!${ch1})`;
    }

}

AbstractElement.registerReference("xor", OperatorXor);