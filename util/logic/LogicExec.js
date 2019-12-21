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

const LOGICS = new WeakMap();
const VALUES = new WeakMap();
const VALUES_REGEX = /values.get\("([^"]+)"\)/g;

export default class LogicExec {

    constructor() {
        LOGICS.set(this, new Map());
        VALUES.set(this, new Map());
    }
    
    loadLogic(logic) {
        if (typeof logic == "object" && !Array.isArray(logic)) {
            let logics = LOGICS.get(this);
            let values = VALUES.get(this);
            console.time("logic build");
            for (let name in logic) {
                if (logic[name] == null) {
                    logics.delete(name);
                    values.delete(name);
                } else {
                    let fn = buildLogic(logic[name]);
                    Object.defineProperty(fn, 'name', {value: name});
                    logics.set(name, fn);
                    values.set(name, false);
                }
            }
            sortLogic(logics);
            console.timeEnd("logic build");
            return this.execute();
        }
    }

    execute(state) {
        let logics = LOGICS.get(this);
        let values = VALUES.get(this);
        for (let i in state) {
            values.set(i, state[i]);
        }
        let res = {};
        logics.forEach((v, k) => {
            let r = !!v(values);
            if (r != values.get(k)) {
                values.set(k, r);
                res[k] = r;
            }
        });
        return res;
    }

    getValues() {
        let values = VALUES.get(this);
        let obj = {};
        values.forEach((v,k) => {obj[k] = v});
        return obj;
    }

}

function sortLogic(logics) {
    let logic_old = new Map(logics);
    logics.clear();
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
            logics.set(rule[0], rule[1]);
            logic_old.delete(rule[0]);
        }
    }
    if (logic_old.size > 0) {
        console.error("LOOPS");
    }
}

function buildLogic(logic) {
    let buf = LogicAbstractElement.buildLogic(logic);
    let req = new Set();
    while (true) {
        let m = VALUES_REGEX.exec(buf);
        if (m == null) break;
        req.add(m[1]);
    }
    let fn = new Function('values', `return ${buf}`);
    Object.defineProperty(fn, 'requires', {value: req});
    return fn;
}