const DUMMYFN = function() {};
const ONUPDATE = new WeakMap;

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

}