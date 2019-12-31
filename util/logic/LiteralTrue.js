import AbstractElement from "../AbstractElement.js";

export default class LiteralTrue extends AbstractElement {

    loadLogic(logic) {}

    toString() {
        return "true";
    }

}

AbstractElement.registerReference("true", LiteralTrue);