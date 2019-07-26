import EventBusAbstractModule from "./EventBusAbstractModule.js";

const ALLS = new Set;
const SUBS = new Map;
const MUTED = new Set;

const MODULES = new Set;

function triggerEvent(data = {name:"",data:{}}) {
    if (SUBS.has(data.name)) SUBS.get(data.name).forEach(function(fn) {
        fn(data);
    });
    ALLS.forEach(function(fn) {
        fn(data);
    });
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
                let subs;
                if (!SUBS.has(name)) {
                    subs = new Set;
                    SUBS.set(name, subs);
                } else {
                    subs = SUBS.get(name);
                }
                subs.add(fn);
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
                    let subs = SUBS.get(name);
                    if (subs.has(fn)) {
                        subs.delete(fn);
                    }
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
            for (let module of MODULES) {
                module.triggerModuleEvent(payload);
            }
            triggerEvent(payload);
        }
    }

    mute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.mute(n));
        } else {
            if (MUTED.has(name)) return;
            MUTED.add(name);
        }
    }

    unmute(name) {
        if (Array.isArray(name)) {
            name.forEach(n => this.unmute(n));
        } else {
            if (!MUTED.has(name)) return;
            MUTED.delete(name);
        }
    }

}

export default new EventBus;