import EventBusAbstractModule from "./EventBusAbstractModule.js";

const ALLS = new Set();
const SUBS = new Map();
const MUTED = new Set();

const MODULES = new Set();

function triggerEvent(data = {name:"",data:{}}) {
    if (SUBS.has(data.name)) {
        for (let fn of SUBS.get(data.name)) {
            fn(data);
        }
    }
    for (let fn of ALLS) {
        fn(data);
    }
}

class EventBus {

    addModule(module) {
        if (module instanceof EventBusAbstractModule) {
            MODULES.add(module);
            module.onModuleEvent = triggerEvent;
        }
    }

    removeModule(module) {
        if (module instanceof EventBusAbstractModule) {
            if (MODULES.has(module)) {
                MODULES.delete(module);
                module.onModuleEvent = function(){};
            }
        }
    }

    register(name, fn) {
        if (typeof name == "function") {
            ALLS.add(name);
        } else {
            if (Array.isArray(name)) {
                name.forEach(n => this.register(n, fn));
            } else {
                if (!SUBS.has(name)) {
                    let subs = new Set;
                    subs.add(fn);
                    SUBS.set(name, subs);
                } else {
                    SUBS.get(name).add(fn);
                }
            }
        }
    }

    unregister(name, fn) {
        if (typeof name == "function") {
            ALLS.delete(name);
        } else {
            if (Array.isArray(name)) {
                name.forEach(n => this.unregister(n, fn));
            } else {
                if (SUBS.has(name)) {
                    SUBS.get(name).delete(fn);
                }
            }
        }
    }

    trigger(name, data = {}) {
        if (!MUTED.has(name)) {
            let payload = {
                name: name,
                data: data
            };
            triggerEvent(payload);
            for (let module of MODULES) {
                module.triggerModuleEvent(payload);
            }
        }
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            MUTED.add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            MUTED.delete(name);
        }
    }

}

export default new EventBus;