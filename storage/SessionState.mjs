import DeepSessionStorage from "./SessionStorage.mjs"

var state = {};

class DeepLocalState {

    save(name) {
        DeepSessionStorage.set("save", name, state);
    }

    load(name) {
        state = DeepSessionStorage.get("save", name);
    }

    write(category, key, value) {
        state[category] = state[category] || {};
        state[category][key] = value;
    }

    read(category, key, def) {
        if (state.hasOwnProperty(category) && state[category].hasOwnProperty(key)) {
            return state[category][key];
        }
        return def;
    }

    reset() {
        state = {};
    }
}

export default new DeepLocalState;