import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicFalse extends LogicAbstractElement {

    loadLogic(logic) {}

    toString() {
        return "false";
    }

}

LogicAbstractElement.registerReference("false", LogicFalse);