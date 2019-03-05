import DeepLogicAbstractElement from "../LogicAbstractElement.mjs";

const CHILDREN = new WeakMap;

export default class DeepLogicMax extends DeepLogicAbstractElement {

    update() {
        
    }

    loadLogic(logic) {
        if (!!logic) {
            let el = new (DeepLogicAbstractElement.getReference(logic.el.type));
            el.loadLogic(logic.el);
            this.appendChild(el);
            this.shadowRoot.getElementById("input").value = logic.value;
        }
    }
    
    registerChild(el) {
        if (el instanceof DeepLogicAbstractElement) {
            CHILDREN.get(this).set(el);
            el.onupdate = () => {
                VALUE.set(this, this.update());
                this.onupdate();
            }
        }
    }

}