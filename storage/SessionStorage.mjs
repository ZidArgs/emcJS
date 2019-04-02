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
        var res = sessionStorage.getItem(category+"\0"+name);
        if (!res || res == null) return def;
        return JSON.parse(res);
    }

    has(category, name) {
        return sessionStorage.hasOwnProperty(category+"\0"+name);
    }

    remove(category, name) {
        sessionStorage.removeItem(category+"\0"+name);
    }

    categories() {
        var k = Object.keys(sessionStorage);
        k = k.map(getCategory);
        return Array.from(new Set(k));
    }

    names(category) {
        var k = Object.keys(sessionStorage);
        k = k.filter(filterCategory.bind(this, category));
        k = k.map(getName);
        return Array.from(new Set(k));
    }

}

export default new SessionStorage;