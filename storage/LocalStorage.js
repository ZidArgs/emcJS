function getCategory(v) {
    return v.split('\0')[0];
}

function filterCategory(c, v) {
    return v.startsWith(c+'\0');
}

function getName(v) {
    return v.split('\0')[1];
}

class LocalStorage {

    set(category, name, data) {
        localStorage.setItem(category+"\0"+name, JSON.stringify(data));
    }

    get(category, name, def = null) {
        let res = localStorage.getItem(category+"\0"+name);
        if (typeof result == "undefined" || result == null) {
            return def;
        }
        return JSON.parse(res);
    }

    has(category, name) {
        return localStorage.hasOwnProperty(category+"\0"+name);
    }

    remove(category, name) {
        localStorage.removeItem(category+"\0"+name);
    }

    purge() {
        localStorage.clear();
    }

    categories() {
        let k = Object.keys(localStorage);
        k = k.map(getCategory);
        return Array.from(new Set(k));
    }

    names(category) {
        let k = Object.keys(localStorage);
        k = k.filter(filterCategory.bind(this, category));
        k = k.map(getName);
        return Array.from(new Set(k));
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