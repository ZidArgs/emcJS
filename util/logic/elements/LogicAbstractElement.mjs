const DUMMYFN = function() {};
const ONUPDATE = new WeakMap;
const REG = new Map();

export default class DeepLogicAbstractElement {

    value;

    constructor() {
        if (new.target === DeepLogicAbstractElement) {
            throw new TypeError("can not construct abstract class");
        }
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