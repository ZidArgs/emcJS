let STORAGE = {};

class MemorySTORAGE {

    set(category, name, data) {
        STORAGE[category] = STORAGE[category] || {};
        STORAGE[category][name] = JSON.stringify(data);
    }


    get(category, name, def = null) {
        if (!!STORAGE[category] && !!STORAGE[category][name]) {
            return JSON.parse(STORAGE[category][name]);
        } else {
            return def;
        }
    }

    has(category, name) {
        return !!STORAGE[category] && STORAGE[category].hasOwnProperty(name);
    }

    remove(category, name) {
        if (!!STORAGE[category] && !!STORAGE[category][name]) {
            delete STORAGE[category][name];
            if (!Object.keys(STORAGE[category]).length) {
                delete STORAGE[category];
            }
        }
    }

    purge() {
        STORAGE = {};
    }

    categories() {
        return Object.keys(STORAGE);
    }

    names(category) {
        if (!!STORAGE[category]) {
            return Object.keys(STORAGE[category]);
        }
        return [];
    }

    toObject() {
        let res = {};
        for (let i in STORAGE) {
            if (!res[i]) {
                res[i] = {};
            }
            for (let j in STORAGE[i]) {
                res[i][j] = JSON.parse(STORAGE[i][j]);
            }
        }
    }

}

export default new MemorySTORAGE;