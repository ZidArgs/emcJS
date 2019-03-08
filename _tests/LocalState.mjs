let state = {};

class TrackerLocalState {

    load(data) {
        state = data;
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

    names(category) {
        if (state.hasOwnProperty(category)) {
            return Object.keys(state[category]);
        }
        return [];
    }
}

export default new TrackerLocalState;