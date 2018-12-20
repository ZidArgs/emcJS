var storage = {};

class DeepMemoryStorage {

    set(category, name, data) {
        storage[category] = storage[category] || {};
        storage[category][name] = data;
    }


    get(category, name, def = null) {
        try {
            return storage[category][name];
        } catch(e) {
            return def;
        }
    }

    has(category, name) {
        return !!storage[category] && storage[category].hasOwnProperty(name);
    }

    remove(category, name) {
        try {
            delete storage[category][name];
            if (!Object.keys(storage[category]).length) {
                delete storage[category];
            }
        } catch(e) {
            return;
        }
    }

    categories() {
        return Object.keys(storage);
    }

    names(category) {
        try {
            Object.keys(storage[category])
        } catch(e) {
            return;
        }
    }

}

export default new DeepMemoryStorage;