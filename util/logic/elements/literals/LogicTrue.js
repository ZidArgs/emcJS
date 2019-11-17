import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicTrue extends LogicAbstractElement {

    update() {
        // nothing
    }

    get value() {
        return 1;
    }

    set value(val) {
        // nothing
    }

    loadLogic(logic) {}

    toString() {
        return "true";
    }

}

LogicAbstractElement.registerReference("true", LogicTrue);