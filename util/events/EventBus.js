import EventBusAbstractModule from "./EventBusAbstractModule.js";

const ALLS = new Set();
const SUBS = new Map();

const MODULES = new Map();

function triggerEvent(data = {name:"",data:{}}) {
    if (SUBS.has(data.name)) {
        for (const fn of SUBS.get(data.name)) {
            fn(data);
        }
    }
    for (const fn of ALLS) {
        fn(data);
    }
}

function checkList(list, value) {
    if (list == null) return true;
    if (!!value && typeof value == "string") {
        if (Array.isArray(list)) {
            return list.some((needle) => checkList(needle, value));
        }
        if (typeof list == "string") {
            return list === value;
        }
        if (list instanceof RegExp) {
            return list.test(value);
        }
    }
    return false;
}

function checkLists(whitelist, blacklist, name) {
    const whitelistResult = whitelist == null || checkList(whitelist, name);
    const blacklistResult = blacklist == null || !checkList(blacklist, name);
    return whitelistResult && blacklistResult;
}

class EventBus {

    checkLists(module, name) {
        const options = MODULES.get(module);
        const whitelist = options.whitelist;
        const blacklist = options.blacklist;
        return checkLists(whitelist, blacklist, name);
    }

    addModule(module, options = {}) {
        if (module instanceof EventBusAbstractModule) {
            MODULES.set(module, options);
            module.onModuleEvent = payload => {
                if (checkLists(options.whitelist, options.blacklist, payload.name)) {
                    triggerEvent(payload);
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
                    const subs = new Set;
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
        const payload = {
            name: name,
            data: data
        };
        triggerEvent(payload);
        MODULES.forEach((options, module) => {
            if (checkLists(options.whitelist, options.blacklist, name)) {
                module.triggerModuleEvent(payload);
            }
        });
    }

}

export default new EventBus;
