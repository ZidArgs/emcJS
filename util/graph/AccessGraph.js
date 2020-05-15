import NodeFactory from "./NodeFactory.js";

const NODES = new WeakMap();

export default class AccessGraph {

    constructor() {
        PROC.set(this, null);
        NODES.set(this, new Map());
    }

    load(config) {
        let nodes = NODES.get(this);
        for (let n in config) {
            let children = config[n];
            let node = NodeFactory.get(n);
            for (let c of children) {
                node.append(NodeFactory.get(c));
            }
            nodes.set(n, node);
        }
    }

    getEdges() {
        let nodes = NODES.get(this);
        let res = [];
        for (let name of nodes.keys()) {
            let children = nodes.get(name).children();
            for (let ch of children) {
                res.push([name, ch.name]);
            }
        }
        return res;
    }

    simulate(start, callback) {
        // TODO
    }

}