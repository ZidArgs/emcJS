class Logic {

    checkLogic(logic, custom) {
        if (!logic || logic == null || typeof logic !== "object") return true;
        switch(logic.type) {
            case "and":
                if (!logic.el.length) return true;
                for (let i = 0; i < logic.el.length; ++i) {
                    var el = logic.el[i];
                    if (!!el && el != null) {
                        if (!this.checkLogic(el, custom)) return false;
                    }
                }
                return true;
            case "or":
                if (!logic.el.length) return true;
                for (let i = 0; i < logic.el.length; ++i) {
                    var el = logic.el[i];
                    if (!!el && el != null) {
                        if (this.checkLogic(el, custom)) return true;
                    }
                }
                return false;
            case "not":
                return !this.checkLogic(logic.el, custom);
            case "equal":
                return this.checkLogic(logic.el, custom) == logic.value;
            case "min":
                return this.checkLogic(logic.el, custom) >= logic.value;
            case "max":
                return this.checkLogic(logic.el, custom) <= logic.value;
            default:
                if (typeof custom === "function") {
                    return custom(logic);
                }
                return false;
        }
    }

}

export default new Logic;