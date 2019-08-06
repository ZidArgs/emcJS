class LocalStorage {

    set(category, name, data) {
        localStorage.setItem(`${category}\0${name}`, JSON.stringify(data));
    }

    get(category, name, def) {
        let res = localStorage.getItem(`${category}\0${name}`);
        if (typeof res == "undefined" || res == null) {
            return def;
        }
        return JSON.parse(res);
    }

    has(category, name) {
        return localStorage.hasOwnProperty(`${category}\0${name}`);
    }

    remove(category, name) {
        localStorage.removeItem(`${category}\0${name}`);
    }

    purge() {
        localStorage.clear();
    }

    names(category) {
        let k = Object.keys(localStorage);
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
        let k = Object.keys(sessionStorage);
        for (let i of k) {
            let r = i.split("\0");
            if (!res.hasOwnProperty(r[0])) {
                res[r[0]] = {};
            }
            res[r[0]][r[1]] = JSON.parse(sessionStorage.getItem(i));
        }
        return res;
    }

}

export default new LocalStorage;