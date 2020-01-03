import AbstractElement from "./AbstractElement.js";

export default class LiteralTrue extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "1";
    }

}

AbstractElement.registerReference("true", LiteralTrue);