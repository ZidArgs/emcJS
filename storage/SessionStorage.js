function getCategory(v) {
    return v.split('\0')[0];
}

function filterCategory(c, v) {
    return v.startsWith(c+'\0');
}

function getName(v) {
    return v.split('\0')[1];
}

class SessionStorage {

    set(category, name, data) {
        sessionStorage.setItem(category+"\0"+name, JSON.stringify(data));
    }

    get(category, name, def = null) {
        let res = sessionStorage.getItem(category+"\0"+name);
        if (!res || res == null) return def;
        return JSON.parse(res);
    }

    has(category, name) {
        return sessionStorage.hasOwnProperty(category+"\0"+name);
    }

    remove(category, name) {
        sessionStorage.removeItem(category+"\0"+name);
    }

    purge() {
        sessionStorage.clear();
    }

    categories() {
        let k = Object.keys(sessionStorage);
        k = k.map(getCategory);
        return Array.from(new Set(k));
    }

    names(category) {
        let k = Object.keys(sessionStorage);
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

export default new SessionStorage;