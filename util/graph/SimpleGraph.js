import NodeFactory from "./NodeFactory.js";

const NODES = new WeakMap();

export default class AccessGraph {

    constructor() {
        NODES.set(this, new Map());
    }

    load(config) {
        let nodes = NODES.get(this);
        for (let cfg in config) {
            let children = config[cfg];
            let node = NodeFactory.get(cfg);
            for (let child in children) {
                let condition = children[child];
                node.append(NodeFactory.get(child));
            }
            nodes.set(cfg, node);
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

    /* broad search */
    traverse(startNode) {
        let reachableNodes = new Set();
        let queue = [];
        queue.push(NODES.get(this).get(startNode));
        while(!!queue.length) {
            let node = queue.shift();
            reachableNodes.add(node.getName())
            for (let ch in node.getTargets()) {
                let child = node.getEdge(ch).getTarget();
                if(!reachableNodes.has(ch)) {
                    queue.push(child);
                }
            }
        }
        return reachableNodes;
    }

}