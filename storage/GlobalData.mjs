var storage = {};

class GlobalData {

    set(name, data) {
        storage[name] = data;
    }


    get(name, def = null) {
        try {
            return storage[name];
        } catch(e) {
            return def;
        }
    }

    has(name) {
        return storage.hasOwnProperty(name);
    }

    remove(name) {
        try {
            delete storage[name];
        } catch(e) {
            return;
        }
    }

    names() {
        try {
            Object.keys(storage)
        } catch(e) {
            return;
        }
    }

}

export default new GlobalData;