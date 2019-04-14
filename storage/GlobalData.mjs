let STORAGE = {};

class GlobalData {

    set(name, data) {
        STORAGE[name] = data;
    }


    get(name, def = null) {
        if (!!STORAGE[name]) {
            return STORAGE[name];
        }
        return def;
    }

    has(name) {
        return STORAGE.hasOwnProperty(name);
    }

    remove(name) {
        if (!!STORAGE[name]) {
            delete STORAGE[name];
        }
    }

    purge() {
        STORAGE = {};
    }

    names() {
        return Object.keys(STORAGE);
    }

    toObject() {
        return Object.assign({}, STORAGE);
    }

}

export default new GlobalData;