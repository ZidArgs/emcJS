import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicFalse extends LogicAbstractElement {

    update() {
        // nothing
    }

    get value() {
        return 0;
    }

    set value(val) {
        // nothing
    }

    loadLogic(logic) {}

    toString() {
        return "false";
    }

}

LogicAbstractElement.registerReference("false", LogicFalse);