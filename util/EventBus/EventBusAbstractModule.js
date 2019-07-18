class EventBusAbstractModule {

    constructor() {
        if (new.target === EventBusAbstractModule) {
            throw new TypeError("can not construct abstract class");
        }
    }

    onmessage(payload) {
        throw new TypeError("can not call abstract method");
    }

    trigger(payload) {
        throw new TypeError("can not call abstract method");
    }

}

export default EventBusAbstractModule;