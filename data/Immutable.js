const HANDLER = {
    get(target, key) {
        return target[key] || undefined;
    },
    set() {},
    deleteProperty() {},
    defineProperty() {},
};

export default class Immutable extends Proxy {

    constructor(target) {
        return new Proxy(target, HANDLER);
    }

}