import Compiler from "./Compiler.js";

function sortLogic(logic) {
    let value_old = new Map(logic);
    logic.clear();
    let len = 0;
    while (!!value_old.size && value_old.size != len) {
        len = value_old.size;
        next_rule:
        for (let rule of value_old) {
            for (let i of rule[1].requires) {
                if (value_old.has(i)) {
                    continue next_rule;
                }
            }
            logic.set(rule[0], rule[1]);
            value_old.delete(rule[0]);
        }
    }
    if (value_old.size > 0) {
        console.error("LOOPS");
    }
}

function mapToObj(map) {
    let res = {};
    map.forEach((v, k) => {
        res[k] = v;
    });
    return res;
}

function valueGetter(mem, key) {
    if (mem.has(key)) {
        return mem.get(key);
    }
}

const LOGIC = new WeakMap();
const MEM_I = new WeakMap();
const MEM_O = new WeakMap();

export default class Processor {

    constructor() {
        LOGIC.set(this, new Map());
        MEM_I.set(this, new Map());
        MEM_O.set(this, new Map());
    }
    
    loadLogic(value) {
        if (typeof value == "object" && !Array.isArray(value)) {
            console.group("LOGIC BUILD");
            let logic = LOGIC.get(this);
            let mem_o = MEM_O.get(this);
            console.time("build time");
            for (let name in value) {
                if (value[name] == null) {
                    logic.delete(name);
                    mem_o.delete(name);
                } else {
                    let fn = Compiler.compile(value[name]);
                    Object.defineProperty(fn, 'name', {value: name});
                    logic.set(name, fn);
                    mem_o.set(name, false);
                }
            }
            sortLogic(logic);
            console.timeEnd("build time");
            this.execute();
            console.groupEnd("LOGIC BUILD");
        }
    }

    setLogic(name, value) {
        console.group("LOGIC BUILD");
        console.time("build time");
        let logic = LOGIC.get(this);
        if (typeof value == "undefined" || value == null) {
            logic.delete(name);
            mem_o.delete(name);
        } else {
            let fn = Compiler.compile(value);
            Object.defineProperty(fn, 'name', {value: name});
            logic.set(name, fn);
            mem_o.set(name, false);
        }
        sortLogic(logic);
        console.timeEnd("build time");
        this.execute();
        console.groupEnd("LOGIC BUILD");
    }

    execute() {
        let res = {};
        let logic = LOGIC.get(this);
        let mem_i = MEM_I.get(this);
        let mem_o = MEM_O.get(this);
        console.group("LOGIC EXECUTION");
        console.log("input", mapToObj(mem_i));
        console.log("executing logic...");
        console.time("execution time");
        let val = valueGetter.bind(this, mem_i);
        logic.forEach((v, k) => {
            let r = !!v(val);
            mem_i.set(k, r);
            if (r != mem_o.get(k)) {
                mem_o.set(k, r);
                res[k] = r;
            }
        });
        console.log("success");
        console.timeEnd("execution time");
        console.log("output", mapToObj(mem_i));
        console.log("changes", res);
        console.groupEnd("LOGIC EXECUTION");
        return res;
    }

    set(key, value) {
        console.group("LOGIC MEMORY CHANGE");
        console.log("change", `${key} => ${value}`);
        let mem_i = MEM_I.get(this);
        mem_i.set(key, value);
        console.groupEnd("LOGIC MEMORY CHANGE");
    }

    setAll(values) {
        console.group("LOGIC MEMORY CHANGE");
        console.log("changes", values);
        let mem_i = MEM_I.get(this);
        if (values instanceof Map) {
            values.forEach((v, k) => mem_i.set(k, v));
        } else if (typeof values == "object" && !Array.isArray(values)) {
            for (let k in values) {
                let v = values[k];
                mem_i.set(k, v);
            }
        }
        console.groupEnd("LOGIC MEMORY CHANGE");
    }

    get(ref) {
        let mem_o = MEM_O.get(this);
        if (mem_o.has(ref)) {
            return mem_o.get(ref);
        }
        return false;
    }

    getAll() {
        let mem_o = MEM_O.get(this);
        let obj = {};
        mem_o.forEach((v,k) => {obj[k] = v});
        return obj;
    }

    has(ref) {
        let mem_o = MEM_O.get(this);
        if (mem_o.has(ref)) {
            return true;
        }
        return false;
    }

}