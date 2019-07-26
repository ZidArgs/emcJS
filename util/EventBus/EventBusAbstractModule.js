class EventBusAbstractModule {

    constructor() {
        if (new.target === EventBusAbstractModule) {
            throw new TypeError("can not construct abstract class");
        }
    }

    onModuleEvent(payload) {
        throw new TypeError("can not call abstract method");
    }

    triggerModuleEvent(payload) {
        throw new TypeError("can not call abstract method");
    }

}

export default EventBusAbstractModule;