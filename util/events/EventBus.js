import EventBusAbstractModule from "./EventBusAbstractModule.js";

const ALLS = new Set();
const SUBS = new Map();

const MODULES = new Map();

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

    addModule(module, options = {}) {
        if (module instanceof EventBusAbstractModule) {
            MODULES.set(module, options);
            module.onModuleEvent = payload => {
                if (!Array.isArray(options.whitelist) || options.whitelist.indexOf(name) >= 0) {
                    if (!Array.isArray(options.blacklist) || options.blacklist.indexOf(name) < 0) {
                        triggerEvent(payload);
                    }
                }
            };
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
        let payload = {
            name: name,
            data: data
        };
        triggerEvent(payload);
        MODULES.forEach((options, module) => {
            if (!Array.isArray(options.whitelist) || options.whitelist.indexOf(name) >= 0) {
                if (!Array.isArray(options.blacklist) || options.blacklist.indexOf(name) < 0) {
                    module.triggerModuleEvent(payload);
                }
            }
        });
    }

}

export default new EventBus;