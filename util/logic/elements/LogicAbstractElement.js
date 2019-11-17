
const REG = new Map();

let VALUE = new WeakMap();
let PARENT = new WeakMap();
let CHILDREN = new WeakMap();

export default class LogicAbstractElement {

    constructor() {
        if (new.target === LogicAbstractElement) {
            throw new TypeError("can not construct abstract class");
        }
        PARENT.set(this, null);
        CHILDREN.set(this, new Set());
    }

    loadLogic() {
        throw new TypeError("can not call abstract method");
    }

    get value() {
        if (VALUE.has(this)) {
            return VALUE.get(this);
        }
    }

    set value(val) {
        if (typeof value == "undefined") {
            VALUE.delete(this);
        } else {
            VALUE.set(this, val);
        }
        this.parent.update();
    }

    get parent() {
        return PARENT.get(this);
    }

    get children() {
        return Array.from(CHILDREN.get(this));
    }

    append(el) {
        let old = PARENT.get(el);
        if (!!old) {
            CHILDREN.get(old).delete(el);
        }
        PARENT.set(el, this);
        CHILDREN.get(this).add(el);
    }

    remove(el) {
        PARENT.set(el, null);
        CHILDREN.get(this).delete(el);
    }

    static registerReference(ref, clazz) {
        if (REG.has(ref)) {
            throw new Error(`reference ${ref} already exists`);
        }
        REG.set(ref, clazz);
    }

    static getReference(ref) {
        if (REG.has(ref)) {
            return REG.get(ref);
        }
        return REG.get("");
    }

    static buildLogic(logic) {
        if (typeof logic == "object" && !!logic) {
            if (Array.isArray(logic)) {
                return null;
            } else {
                let el = new (LogicAbstractElement.getReference(logic.type));
                el.loadLogic(logic);
                return el;
            }
        }
        return new (LogicAbstractElement.getReference(`${logic}`));
    }

    toString() {
        throw new TypeError("can not call abstract method");
    }

}
