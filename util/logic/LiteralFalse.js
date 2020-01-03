import AbstractElement from "./AbstractElement.js";

export default class LiteralFalse extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "0";
    }

}

AbstractElement.registerReference("false", LiteralFalse);