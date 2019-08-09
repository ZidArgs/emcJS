class SessionStorage {

    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key, value) {
        let res = sessionStorage.getItem(key);
        if (typeof res == "undefined" || res == null) {
            return value;
        }
        return JSON.parse(res);
    }

    has(key) {
        return sessionStorage.hasOwnProperty(key);
    }

    delete(key) {
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }

    keys() { // TODO add filter
        return Object.keys(sessionStorage);
    }

    getAll() {
        let res = {};
        let k = Object.keys(sessionStorage);
        for (let i of k) {
            res[i] = JSON.parse(sessionStorage.getItem(i));
        }
        return res;
    }

}

export default new SessionStorage;