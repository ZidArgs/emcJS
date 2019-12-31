import AbstractElement from "../AbstractElement.js";

export default class LogicFalse extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "false";
    }

}

AbstractElement.registerReference("false", LogicFalse);