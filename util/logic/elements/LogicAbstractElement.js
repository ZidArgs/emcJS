
const REG = new Map();
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

    get parent() {
        return PARENT.get(this);
    }

    get children() {
        return Array.from(CHILDREN.get(this));
    }

    append(el) {
        if (el instanceof LogicAbstractElement) {
            let old = PARENT.get(el);
            if (!!old) {
                CHILDREN.get(old).delete(el);
            }
            PARENT.set(el, this);
            CHILDREN.get(this).add(el);
        }
    }

    remove(el) {
        if (el instanceof LogicAbstractElement) {
            PARENT.set(el, null);
            CHILDREN.get(this).delete(el);
        }
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
