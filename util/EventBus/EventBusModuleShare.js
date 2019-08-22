import EventBusAbstractModule from "./EventBusAbstractModule.js";
import Path from "../Path.js";

const MUTED = new Set;

let WORKER = null;
if ("SharedWorker" in window) {
    WORKER = (new SharedWorker(Path.getAbsolute(import.meta.url, "./EventBusModuleShare.worker.js"), 'EventWorker')).port;
}

class EventBusModuleShare extends EventBusAbstractModule {

    constructor() {
        super();
        if (!!WORKER) {
            WORKER.onmessage = function(e) {
                let payload = e.data;
                if (!MUTED.has(payload.name)) {
                    this.onModuleEvent(payload);
                }
            }.bind(this);
            WORKER.start();
        }
    }

    onModuleEvent(payload) {
        // nothing
    }

    triggerModuleEvent(payload) {
        if (!!WORKER) {
            if (!MUTED.has(payload.name)) {
                WORKER.postMessage(payload);
            }
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

export default new EventBusModuleShare;