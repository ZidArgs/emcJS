import AbstractElement from "./AbstractElement.js";

export default class OperatorOr extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            for (let i = 0; i < logic.el.length; ++i) {
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
        ch = ch.map(v=>v.toString()).filter(v=>!!v);
        if (ch.length <= 1) {
            if (ch.length == 1) {
                return ch[0];
            }
            return "";
        }
        return `(${ch.join("||")})`;
    }

}

AbstractElement.registerReference("or", OperatorOr);