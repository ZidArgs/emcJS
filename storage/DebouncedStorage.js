
import Helper from "../util/Helper.js";

const CATEGORY = new WeakMap();
const STATE = new WeakMap();
const CHANGES = new WeakMap();
const DEBOUNCE_TIMER = new WeakMap();

let DEBOUNCE_TIME = 500;

export default class DebouncedStorage extends EventTarget {

    static get debounceTime() {
        return DEBOUNCE_TIME;
    }

    static set debounceTime(value) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("value must be a number");
        if (value < 0 || value > 60000) throw new RangeError("value must be between 0 and 60000");
        DEBOUNCE_TIME = value;
    }

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
        for (const [key, value] of state) {
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
        for (const [key, value] of state) {
            data[key] = value;
        }
        for (const [key, value] of changes) {
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
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        const changed = {};
        for (const [key, value] of state) {
            if (value != null) {
                changed[key] = {
                    oldValue: state.get(key),
                    newValue: value
                };
            }
        }
        state.clear();
        changes.clear();
        if (DEBOUNCE_TIMER.has(this)) {
            clearTimeout(DEBOUNCE_TIMER.get(this));
            DEBOUNCE_TIMER.delete(this);
        }
        if (Object.keys(changed).length) {
            const event = new Event("change");
            event.category = CATEGORY.get(this);
            event.data = changed;
            this.dispatchEvent(event);
        }
    }

    setImmediate(key, value) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
                changes.set(key, value);
            } else {
                changes.delete(key);
                if (!changes.size) {
                    clearTimeout(DEBOUNCE_TIMER.get(this));
                    DEBOUNCE_TIMER.delete(this);
                }
            }
        } else {
            if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
                const changed = {};
                changed[key] = {
                    oldValue: state.get(key),
                    newValue: value
                };
                state.set(key, value);
                const event = new Event("change");
                event.category = CATEGORY.get(this);
                event.data = changed;
                this.dispatchEvent(event);
            }
        }
    }

    setImmediateAll(data) {
        const state = STATE.get(this);
        const changes = CHANGES.get(this);
        if (DEBOUNCE_TIMER.has(this)) {
            for (const key in data) {
                const value = data[key];
                if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
                    changes.set(key, value);
                } else {
                    changes.delete(key);
                }
            }
            if (!changes.size) {
                clearTimeout(DEBOUNCE_TIMER.get(this));
                DEBOUNCE_TIMER.delete(this);
            }
        } else {
            const changed = {};
            for (const key in data) {
                const value = data[key];
                if (!state.has(key) || !Helper.isEqual(state.get(key), value)) {
                    changed[key] = {
                        oldValue: state.get(key),
                        newValue: value
                    };
                    state.set(key, value);
                }
            }
            if (!Helper.isEqual(state.get(key), value)) {
                const event = new Event("change");
                event.category = CATEGORY.get(this);
                event.data = changed;
                this.dispatchEvent(event);
            }
        }
    }

}
