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

    delete(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }

    keys(filter) {
        let keys = Object.keys(localStorage);
        if (typeof filter == "string") {
            return keys.filter(key => key.startsWith(filter));
        }
        return keys;
    }

    getAll(filter) {
        let res = {};
        let k = this.keys(filter);
        for (let i of k) {
            res[i] = JSON.parse(localStorage.getItem(i));
        }
        return res;
    }

}

export default new LocalStorage;