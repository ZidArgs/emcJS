import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

export default class DeepLogicTrue extends DeepLogicAbstractElement {

    constructor() {
        super();
        onupdate(true);
    }

}