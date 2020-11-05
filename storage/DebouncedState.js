
import Helper from "../util/Helper.js";

const CATEGORY = new WeakMap();
const STATE = new WeakMap();
const CHANGES = new WeakMap();
const DEBOUNCE_TIMER = new WeakMap();

const DEBOUNCE_TIME = 500;

export default class DebouncedState extends EventTarget {

    constructor(category) {
        super();
        CATEGORY.set(this, category);
        CHANGES.set(this, new Map());
        STATE.set(this, new Map());
    }

    overwrite(data) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        state.clear();
        changes.clear();
        for (const key in data) {
            const value = data[key];
            state.set(key, value);
        }
    }

    clear() {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        for (let [key, value] of state) {
            if (value != null) {
                changes[key] = undefined;
            }
        }
        if (!!changes.size) {
            DEBOUNCE_TIMER.set(this, setTimeout(() => {
                const changed = {};
                for (const [key, value] of changes) {
                    changed[key] = {
                        oldValue: state.get(key),
                        newValue: value
                    };
                    state.set(key, value);
                }
                changes.clear();
                const event = new Event("change");
                event.category = CATEGORY.get(this);
                event.data = changed;
                this.dispatchEvent(event);
            }, DEBOUNCE_TIME));
        }
        state.clear();
    }

    set(key, value) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
            changes.set(key, value);
        } else {
            changes.delete(key);
        }
        if (!!changes.size) {
            DEBOUNCE_TIMER.set(this, setTimeout(() => {
                const changed = {};
                for (const [key, value] of changes) {
                    changed[key] = {
                        oldValue: state.get(key),
                        newValue: value
                    };
                    state.set(key, value);
                }
                changes.clear();
                const event = new Event("change");
                event.category = CATEGORY.get(this);
                event.data = changed;
                this.dispatchEvent(event);
            }, DEBOUNCE_TIME));
        }
    }

    setAll(data) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        for (const key in data) {
            const value = data[key];
            if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
                changes.set(key, value);
            } else {
                changes.delete(key);
            }
        }
        if (!!changes.size) {
            DEBOUNCE_TIMER.set(this, setTimeout(() => {
                const changed = {};
                for (const [key, value] of changes) {
                    changed[key] = {
                        oldValue: state.get(key),
                        newValue: value
                    };
                    state.set(key, value);
                }
                changes.clear();
                const event = new Event("change");
                event.category = CATEGORY.get(this);
                event.data = changed;
                this.dispatchEvent(event);
            }, DEBOUNCE_TIME));
        }
    }

    get(key) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (changes.has(key)) {
            return changes.get(key);
        } else {
            return state.get(key);
        }
    }

    getAll() {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        const data = {};
        for (let [key, value] of state) {
            data[key] = value;
        }
        for (let [key, value] of changes) {
            data[key] = value;
        }
        return data;
    }

    has(key) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (changes.has(key) || state.has(key)) {
            return true;
        } else {
            return false;
        }
    }

    clearImmediate() {
        let state = STATE.get(this);
        let changes = CHANGES.get(this);
        for (let [key, value] of state) {
            if (value != null) {
                changes.set(key, undefined);
            }
        }
        for (let [key, value] of changes) {
            if (value != null) {
                if (state[key] == null) {
                    changes.delete(key);
                } else {
                    changes.set(key, undefined);
                }
            }
        }
        if (!changes.size && DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        state.clear();
    }

    setImmediate(key, value) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        state.set(key, value);
        if (changes.has(key)) {
            if (Helper.isEqual(changes.get(key), value)) {
                changes.delete(key);
            }
        }
        if (!changes.size && DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
    }

    setImmediateAll(data) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        for (const key in data) {
            const value = data[key];
            state.set(key, value);
            if (changes.has(key)) {
                if (Helper.isEqual(changes.get(key), value)) {
                    changes.delete(key);
                }
            }
        }
        if (!changes.size && DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
    }

}
