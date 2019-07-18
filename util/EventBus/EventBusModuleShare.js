import EventBusAbstractModule from "./EventBusAbstractModule.js";
import Path from "../Path.js";

const WORKER = (new SharedWorker(Path.getAbsolute(import.meta.url, "./EventWorker.js"), 'EventWorker')).port;

class EventBusModuleShare extends EventBusAbstractModule {

    constructor() {
        super();
        WORKER.onmessage = function(e) {
            this.onmessage(e.data);
        }.bind(this);
        WORKER.start();
    }

    onmessage(payload) {
        // nothing
    }

    trigger(payload) {
        WORKER.postMessage(payload);
    }

}

export default new EventBusModuleShare;