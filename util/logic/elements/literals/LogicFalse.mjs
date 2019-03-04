import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

export default class DeepLogicFalse extends DeepLogicAbstractElement {

    constructor() {
        super();
        onupdate(false);
    }

}