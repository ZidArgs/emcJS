let STORAGE = new Map();

class MemoryStorage {

    set(key, value) {
        STORAGE.set(key, JSON.stringify(value));
    }

    get(key, value) {
        let res = STORAGE.get(key);
        if (typeof res == "undefined" || res == null) {
            return value;
        }
        return JSON.parse(res);
    }

    has(key) {
        return STORAGE.has(key);
    }

    delete(key) {
        STORAGE.delete(key);
    }

    clear() {
        STORAGE.clear();
    }

    keys(filter) {
        let keys = STORAGE.keys();
        if (typeof filter == "string") {
            keys.filter(key => key.startsWith(filter));
        }
        return keys;
    }

    getAll() {
        let res = {};
        let k = STORAGE.keys();
        for (let i of k) {
            res[i] = JSON.parse(STORAGE.get(i));
        }
        return res;
    }

}

export default new MemoryStorage;