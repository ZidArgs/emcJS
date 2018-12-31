import Logger from "./Logger.mjs";

const subs_before = new Map;
const subs_on = new Map;
const subs_after = new Map;
const muted = new Set;
let log = false;

class EventBus {

    onbefore(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.before(n, callback));
        } else {
            let subs;
            if (!subs_before.has(name)) {
                subs = new Set;
                subs_before.set(name, subs);
            } else {
                subs = subs_before.get(name);
            }
            subs.add(callback);
        }
    }

    unbefore(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unbefore(n, callback));
        } else {
            if (subs_before.has(name)) {
                let subs = subs_before.get(name);
                if (subs.has(callback)) {
                    subs.delete(callback);
                }
            }
        }
    }

    on(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.on(n, callback));
        } else {
            let subs;
            if (!subs_on.has(name)) {
                subs = new Set;
                subs_on.set(name, subs);
            } else {
                subs = subs_on.get(name);
            }
            subs.add(callback);
        }
    }

    un(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.un(n, callback));
        } else {
            if (subs_on.has(name)) {
                let subs = subs_on.get(name);
                if (subs.has(callback)) {
                    subs.delete(callback);
                }
            }
        }
    }

    onafter(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.after(n, callback));
        } else {
            let subs;
            if (!subs_after.has(name)) {
                subs = new Set;
                subs_after.set(name, subs);
            } else {
                subs = subs_after.get(name);
            }
            subs.add(callback);
        }
    }

    unafter(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unafter(n, callback));
        } else {
            if (subs_after.has(name)) {
                let subs = subs_after.get(name);
                if (subs.has(callback)) {
                    subs.delete(callback);
                }
            }
        }
    }

    post(name, ...args) {
        if (!muted.has(name)) {
            if (log) Logger.log(`posted event "${name}" with values (${args.join(', ')})`, "EventBus");
            if (subs_before.has(name)) subs_before.get(name).forEach(fn => fn(...args));
            if (subs_on.has(name)) subs_on.get(name).forEach(fn => fn(...args));
            if (subs_after.has(name)) subs_after.get(name).forEach(fn => fn(...args));
        } else {
            if (log) Logger.warn(`tried posting muted event "${name}" with values (${args.join(', ')})`, "EventBus");
        }
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            if (muted.has(name)) return;
            if (log) Logger.warn(`muted "${name}"`, "EventBus");
            muted.add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            if (!muted.has(name)) return;
            if (log) Logger.info(`unmuted "${name}"`, "EventBus");
            muted.delete(name);
        }
    }

    logEvents(v) {
        log = !!v;
    }

}

export default new EventBus;