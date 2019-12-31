import AbstractElement from "../AbstractElement.js";

export default class LiteralFalse extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "false";
    }

}

AbstractElement.registerReference("false", LiteralFalse);