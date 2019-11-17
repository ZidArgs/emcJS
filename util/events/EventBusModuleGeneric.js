import EventBusAbstractModule from "./EventBusAbstractModule.js";

const MUTED = new WeakMap();
const SUBS = new WeakMap();

class EventBusModuleGeneric extends EventBusAbstractModule {

    constructor() {
        super();
        MUTED.set(this, new Set());
        SUBS.set(this, new Set());
    }

    onModuleEvent(payload) {
        // empty
    }

    async triggerModuleEvent(payload) {
        if (!MUTED.get(this).has(payload.name)) {
            SUBS.get(this).forEach(function(fn) {
                fn(payload);
            });
        }
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            if (MUTED.get(this).has(name)) return;
            MUTED.get(this).add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            if (!MUTED.get(this).has(name)) return;
            MUTED.get(this).delete(name);
        }
    }

    /* remote */

    register(fn) {
        if (typeof fn == "function") {
            SUBS.get(this).add(fn);
        }
    }

    unregister(fn) {
        if (typeof fn == "function") {
            SUBS.get(this).delete(fn);
        }
    }

    trigger(name, data = {}) {
        if (!MUTED.get(this).has(name)) {
            let payload = {
                name: name,
                data: data
            };
            this.onModuleEvent(payload);
        }
    }

}

export default EventBusModuleGeneric;