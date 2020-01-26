import EventBus from "./EventBus.js";

const ALLS = new WeakMap();
const SUBS = new WeakMap();
const MUTED = new WeakMap();

export default class EventBusSubset {

    constructor() {
        SUBS.set(this, new Map());
        ALLS.set(this, new Set());
        MUTED.set(this, new Set());
        EventBus.register((data = {name:"",data:{}}) => {
            if (!MUTED.get(this).has(data.name)) {
                if (SUBS.get(this).has(data.name)) {
                    SUBS.get(this).get(data.name).forEach(function(fn) {
                        fn(data);
                    });
                }
                ALLS.get(this).forEach(function(fn) {
                    fn(data);
                });
            }
        });
    }

    trigger(name, data) {
        if (!MUTED.get(this).has(name)) {
            EventBus.trigger(name, data);
        }
    }

    register(name, fn) {
        if (typeof name == "function") {
            ALLS.get(this).add(name);
        } else {
            if (Array.isArray(name)) {
                name.forEach(n => this.register(n, fn));
            } else {
                if (!SUBS.get(this).has(name)) {
                    let subs = new Set;
                    subs.add(fn);
                    SUBS.get(this).set(name, subs);
                } else {
                    SUBS.get(this).get(name).add(fn);
                }
            }
        }
    }

    unregister(name, fn) {
        if (typeof name == "function") {
            ALLS.get(this).delete(name);
        } else {
            if (Array.isArray(name)) {
                name.forEach(n => this.unregister(n, fn));
            } else {
                if (SUBS.get(this).has(name)) {
                    SUBS.get(this).get(name).delete(fn);
                }
            }
        }
    }

    clear() {
        ALLS.get(this).clear();
        SUBS.get(this).clear();
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            MUTED.get(this).add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            MUTED.get(this).delete(name);
        }
    }

}