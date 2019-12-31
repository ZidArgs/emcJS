import AbstractElement from "./AbstractElement.js";

export default class OperatorNand extends AbstractElement {

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            logic.el.forEach(ch => {
                if (!!ch) {
                    let cl = AbstractElement.getReference(ch.type);
                    if (!cl) return;
                    let el = new cl;
                    el.loadLogic(ch);
                    this.append(el);
                }
            });
        }
    }

    toString() {
        let ch = this.children;
        ch = ch.map(v=>v.toString()).filter(v=>!!v);
        if (ch.length <= 1) {
            if (ch.length == 1) {
                return `!${ch[0]}`;
            }
            return "";
        }
        return `!(${ch.join("&&")})`;
    }

}

AbstractElement.registerReference("nand", OperatorNand);