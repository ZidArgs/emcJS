import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicNand extends LogicAbstractElement {

    update() {
        let newValue;
        let ch = this.children;
        for (let c of ch) {
            if (typeof c.value != "undefined") {
                newValue = +!c.value;
                if (!newValue) {
                    break;
                }
            }
        }
        this.value = newValue;
    }

    loadLogic(logic) {
        if (!!logic && Array.isArray(logic.el)) {
            logic.el.forEach(ch => {
                if (!!ch) {
                    let el = new (LogicAbstractElement.getReference(ch.type));
                    el.loadLogic(ch);
                    this.append(el);
                }
            });
        }
    }

    toString() {
        return `!(${this.children.join("&&")})`;
    }

}

LogicAbstractElement.registerReference("nand", LogicNand);