import Compiler from "./Compiler.js";

function resolveCircle(values, path = [], visited = new Set(), start = values.keys().next().value) {
    if (values.has(start)) {
        path.push(start);
        if (visited.has(start)) {
            return true;
        }
        visited.add(start);
        let value = values.get(start);
        for (let requirement of value.requires) {
            if (resolveCircle(values, path, visited, requirement)) {
                return true;
            }
        }
        visited.delete(start);
        path.pop();
    }
    return false;
}

function sortLogic(logic) {
    let value_old = new Map(logic);
    logic.clear();
    let len = 0;
    while (!!value_old.size && value_old.size != len) {
        len = value_old.size;
        value_old.forEach((value, key) => {
            for (let requirement of value.requires) {
                if (value_old.has(requirement)) {
                    return;
                }
            }
            logic.set(key, value);
            value_old.delete(key);
        });
    }
    if (value_old.size > 0) {
        let path = [];
        resolveCircle(value_old, path);
        throw new Error(`LOGIC LOOP:\n${path.join("\n=> ")}`);
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
const DEBUG = new WeakMap();

export default class Processor {

    constructor(debug = false) {
        LOGIC.set(this, new Map());
        MEM_I.set(this, new Map());
        MEM_O.set(this, new Map());
        DEBUG.set(this, !!debug);
    }
    
    loadLogic(value) {
        if (typeof value == "object" && !Array.isArray(value)) {
            let debug = DEBUG.get(this);
            let logic = LOGIC.get(this);
            let mem_o = MEM_O.get(this);
            if (debug) {
                console.group("LOGIC BUILD");
                console.time("build time");
            }
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
            if (debug) {
                console.timeEnd("build time");
                console.groupEnd("LOGIC BUILD");
            }
            this.execute();
        }
    }

    setLogic(name, value) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC BUILD");
            console.time("build time");
        }
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
        if (debug) {
            console.timeEnd("build time");
            console.groupEnd("LOGIC BUILD");
        }
        this.execute();
    }

    execute() {
        let res = {};
        let logic = LOGIC.get(this);
        let mem_i = MEM_I.get(this);
        let mem_o = MEM_O.get(this);
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC EXECUTION");
            console.log("input", mapToObj(mem_i));
            console.log("executing logic...");
            console.time("execution time");
        }
        let val = valueGetter.bind(this, mem_i);
        logic.forEach((v, k) => {
            let r = !!v(val);
            mem_i.set(k, r);
            if (r != mem_o.get(k)) {
                mem_o.set(k, r);
                res[k] = r;
            }
        });
        if (debug) {
            console.log("success");
            console.timeEnd("execution time");
            console.log("output", mapToObj(mem_i));
            console.log("changes", res);
            console.groupEnd("LOGIC EXECUTION");
        }
        return res;
    }

    set(key, value) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC MEMORY CHANGE");
            console.log("change", `${key} => ${value}`);
        }
        let mem_i = MEM_I.get(this);
        mem_i.set(key, value);
        if (debug) {
            console.groupEnd("LOGIC MEMORY CHANGE");
        }
    }

    setAll(values) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC MEMORY CHANGE");
            console.log("changes", values);
        }
        let mem_i = MEM_I.get(this);
        if (values instanceof Map) {
            values.forEach((v, k) => mem_i.set(k, v));
        } else if (typeof values == "object" && !Array.isArray(values)) {
            for (let k in values) {
                let v = values[k];
                mem_i.set(k, v);
            }
        }
        if (debug) {
            console.groupEnd("LOGIC MEMORY CHANGE");
        }
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