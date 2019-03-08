const DUMMYFN = function() {};
const ONUPDATE = new WeakMap;
const CHILDREN = new WeakMap;
const PARENT = new WeakMap;
const REG = new Map();

// TODO
/**
 * merge this with the html elements, we can have them as logic interpreters
 * the overhead will be tolleratable considering the benefits
 */

export default class DeepLogicAbstractElement {

    value;

    constructor() {
        if (new.target === DeepLogicAbstractElement) {
            throw new TypeError("can not construct abstract class");
        }
        CHILDREN.set(this, new Map());
    }

    update() {
        throw new TypeError("can not call abstract method");
    }

    get onupdate() {
        if (ONUPDATE.has(this)) {
            return ONUPDATE.get(this);
        }
        return DUMMYFN;
    }

    set onupdate(fn) {
        ONUPDATE.set(this, fn);
    }
    
    appendChild(el) {
        if (el instanceof DeepLogicAbstractElement) {
            if (el.parent) {
                el.parent.removeChild(el);
            }
            CHILDREN.get(this).set(el);
            PARENT.set(el, this);
            el.onupdate = () => this.update();
            update();
        }
    }

    removeChild(el) {
        if (el instanceof DeepLogicAbstractElement) {
            if (CHILDREN.get(this).has(el)) {
                CHILDREN.get(this).remove(el);
            }
            PARENT.remove(el);
        }
    }

    get children() {
        return Array.from(CHILDREN.get(this));
    }

    get parent() {
        if (PARENT.has(this)) {
            return PARENT.get(this);
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
        return DeepLogicError;
    }

}