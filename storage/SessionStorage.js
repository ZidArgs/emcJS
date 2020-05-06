class SessionStorage {

    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key, value) {
        let res = sessionStorage.getItem(key);
        if (res != null) {
            return JSON.parse(res);
        }
        return value;
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

    keys(filter) {
        let keys = Object.keys(sessionStorage);
        if (typeof filter == "string") {
            return keys.filter(key => key.startsWith(filter));
        }
        return keys;
    }

    getAll(filter) {
        let res = {};
        let k = this.keys(filter);
        for (let i of k) {
            res[i] = JSON.parse(sessionStorage.getItem(i));
        }
        return res;
    }

}

export default new SessionStorage;