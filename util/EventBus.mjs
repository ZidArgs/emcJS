import Logger from "./Logger.mjs";

const SUBS = new Map;
const MUTED = new Set;
let log = false;

class EventBus {

    on(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.on(n, callback));
        } else {
            let subs;
            if (!SUBS.has(name)) {
                subs = new Set;
                SUBS.set(name, subs);
            } else {
                subs = SUBS.get(name);
            }
            subs.add(callback);
        }
    }

    un(name, callback) {
        if (Array.isArray(name)) {
            name.forEach(n => this.un(n, callback));
        } else {
            if (SUBS.has(name)) {
                let subs = SUBS.get(name);
                if (subs.has(callback)) {
                    subs.delete(callback);
                }
            }
        }
    }

    post(name, ...args) {
        if (!MUTED.has(name)) {
            if (log) Logger.log(`posted event "${name}" with values (${args.join(', ')})`, "EventBus");
            if (SUBS.has(name)) SUBS.get(name).forEach(function(fn) {
                fn(...args);
            });
        } else {
            if (log) Logger.warn(`tried posting MUTED event "${name}" with values (${args.join(', ')})`, "EventBus");
        }
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            if (MUTED.has(name)) return;
            if (log) Logger.warn(`MUTED "${name}"`, "EventBus");
            MUTED.add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            if (!MUTED.has(name)) return;
            if (log) Logger.info(`unMUTED "${name}"`, "EventBus");
            MUTED.delete(name);
        }
    }

    logEvents(v) {
        log = !!v;
    }

}

export default new EventBus;