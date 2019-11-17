import LogicAbstractElement from "../LogicAbstractElement.js";

export default class LogicTrue extends LogicAbstractElement {

    loadLogic(logic) {}

    toString() {
        return "true";
    }

}

LogicAbstractElement.registerReference("true", LogicTrue);