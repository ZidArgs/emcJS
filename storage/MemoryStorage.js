let STORAGE = new Map(); // TODO make this work like localstorage only working with a map instead

class MemoryStorage {

    set(category, name, data) {
        STORAGE.add(`${category}\0${name}`, data);
    }


    get(category, name, def) {
        let res = STORAGE.get(`${category}\0${name}`);
        if (typeof res == "undefined" || res == null) {
            return def;
        }
        return res;
    }

    has(category, name) {
        return STORAGE.has(`${category}\0${name}`);
    }

    remove(category, name) {
        STORAGE.delete(`${category}\0${name}`);
    }

    purge() {
        STORAGE.clear();
    }

    names(category) {
        let k = Array.from(STORAGE.keys());
        let res = [];
        for (let i of k) {
            let r = i.split("\0");
            if (r[0] == category) {
                res.push(r[1]);
            }
        }
        return res;
    }

    toObject() {
        let res = {};
        let k = Array.from(STORAGE.keys());
        for (let i of k) {
            let r = i.split("\0");
            if (!res.hasOwnProperty(r[0])) {
                res[r[0]] = {};
            }
            res[r[0]][r[1]] = JSON.parse(STORAGE.get(i));
        }
        return res;
    }

}

export default new MemoryStorage;