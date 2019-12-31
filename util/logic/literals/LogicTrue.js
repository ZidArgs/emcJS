import AbstractElement from "../AbstractElement.js";

export default class LogicTrue extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "true";
    }

}

AbstractElement.registerReference("true", LogicTrue);