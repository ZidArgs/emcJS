export default class DeepLogicAbstractElement {

    constructor() {
        if (new.target === DeepLogicAbstractElement) {
            throw new TypeError("can not construct abstract class");
        }
    }

    onupdate() {}

}