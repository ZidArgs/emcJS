import "./elements/literals/LogicFalse.js";
import "./elements/literals/LogicTrue.js";
import "./elements/literals/LogicValue.js";
import "./elements/LogicAbstractElement.js";
import "./elements/operators/LogicAnd.js";
import "./elements/operators/LogicNand.js";
import "./elements/operators/LogicNor.js";
import "./elements/operators/LogicNot.js";
import "./elements/operators/LogicOr.js";
import "./elements/operators/LogicXor.js";
import "./elements/restrictors/LogicMax.js";
import "./elements/restrictors/LogicMin.js";
import LogicAbstractElement from "./elements/LogicAbstractElement.js";

const LOGICS = new Map();
const VALUES = new Map();
const VALUES_REGEX = /values.get\("([^"]+)"\)/g;

class LogicExec {
    
    loadLogic(logic) {
        console.time("logic build");
        buildLogic(logic);
        sortLogic();
        console.timeEnd("logic build");
    }

    execute(state) {
        for (let i in state) {
            VALUES.set(i, state[i]);
        }
        let res = {};
        LOGICS.forEach((v, k) => {
            let r = !!v.fn(VALUES);
            if (r != VALUES.get(k)) {
                VALUES.set(k, r);
                res[k] = r;
            }
        });
        return res;
    }

    getValues() {
        let obj = {};
        VALUES.forEach((v,k) => {obj[k] = v});
        return obj;
    }

}

function sortLogic() {
    let logic_old = new Map(LOGICS);
    LOGICS.clear();
    let len = 0;
    while (!!logic_old.size && logic_old.size != len) {
        len = logic_old.size;
        next_rule:
        for (let rule of logic_old) {
            for (let i of rule[1].requires) {
                if (logic_old.has(i)) {
                    continue next_rule;
                }
            }
            LOGICS.set(rule[0], rule[1]);
            logic_old.delete(rule[0]);
        }
    }
    if (logic_old.size > 0) {
        console.error("LOOPS");
    }
}

function buildLogic(logic) {
    if (typeof logic == "object" && !Array.isArray(logic)) {
        for (let l in logic) {
            if (logic[l] == null) {
                LOGICS.delete(l);
                VALUES.delete(l);
            } else {
                let buf = LogicAbstractElement.buildLogic(logic[l]);
                let req = new Set();
                while (true) {
                    let m = VALUES_REGEX.exec(buf);
                    if (m == null) break;
                    req.add(m[1]);
                }
                LOGICS.set(l, {
                    fn: new Function('values', 'return ' + buf),
                    requires: req,
                    name: l
                });
                VALUES.set(l, false);
            }
        }
    }
}

export default new LogicExec();