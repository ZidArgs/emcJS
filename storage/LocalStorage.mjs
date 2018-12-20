function getCategory(v) {
    return v.split('\0')[0];
}

function filterCategory(c, v) {
    return v.startsWith(c+'\0');
}

function getName(v) {
    return v.split('\0')[1];
}

class DeepLocalStorage {

    set(category, name, data) {
        localStorage.setItem(category+"\0"+name, JSON.stringify(data));
    }


    get(category, name, def = null) {
        try {
            var res = localStorage.getItem(category+"\0"+name);
            if (!res || res == null) return def;
            return JSON.parse(res);
        } catch(e) {
            return def;
        }
    }

    has(category, name) {
        return localStorage.hasOwnProperty(category+"\0"+name);
    }

    remove(category, name) {
        localStorage.removeItem(category+"\0"+name);
    }

    categories() {
        var k = Object.keys(localStorage);
        k = k.map(getCategory);
        return Array.from(new Set(k));
    }

    names(category) {
        var k = Object.keys(localStorage);
        k = k.filter(filterCategory.bind(this, category));
        k = k.map(getName);
        return Array.from(new Set(k));
    }

}

export default new DeepLocalStorage;