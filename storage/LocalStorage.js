class LocalStorage {

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key, value) {
        let res = localStorage.getItem(key);
        if (typeof res == "undefined" || res == null) {
            return value;
        }
        return JSON.parse(res);
    }

    has(key) {
        return localStorage.hasOwnProperty(key);
    }

    delete(name) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }

    keys() { // TODO add filter
        return Object.keys(localStorage);
    }

    getAll() {
        let res = {};
        let k = Object.keys(localStorage);
        for (let i of k) {
            res[i] = JSON.parse(localStorage.getItem(i));
        }
        return res;
    }

}

export default new LocalStorage;