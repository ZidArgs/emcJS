const STORAGE = {};

class MemorySTORAGE {

    set(category, name, data) {
        STORAGE[category] = STORAGE[category] || {};
        STORAGE[category][name] = data;
    }


    get(category, name, def = null) {
        if (!!STORAGE[category] && !!STORAGE[category][name]) {
            return STORAGE[category][name];
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

    categories() {
        return Object.keys(STORAGE);
    }

    names(category) {
        if (!!STORAGE[category]) {
            return Object.keys(STORAGE[category]);
        }
    }

}

export default new MemorySTORAGE;