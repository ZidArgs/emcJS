const subscriptions = new Map;
const muted = new Set;
let log = false;

class EventBus {

    on(name, callback) {
        let subs;
        if (!subscriptions.has(name)) {
            subs = new Set;
            subscriptions.set(name, subs);
        } else {
            subs = subscriptions.get(name);
        }
        subs.add(callback);
    }

    post(name, ...args) {
        if (log) console.log(`[EVENT] ${name}(${args.join(', ')})`);
        if (muted.has(name)) return;
        if (subscriptions.has(name)) {
            subscriptions.get(name).forEach(fn => fn(...args));
        }
    }

    mute(name) {
        muted.add(name);
    }

    unmute(name) {
        muted.delete(name);
    }

    logEvents(v) {
        log = !!v;
    }

}

export default new EventBus;