const CHILD = new WeakMap();
const NAME = new WeakMap();

class Node {

    constructor(name) {
        CHILD.set(this, new Map());
        NAME.set(this, name);
    }

    get name() {
        return NAME.get(this);
    }

    append(node) {
        if (node instanceof Node) {
            let child = CHILD.get(this);
            child.set(node.name, node);
        }
    }

    children() {
        let child = CHILD.get(this);
        return child.keys();
    }

    get(name) {
        let child = CHILD.get(this);
        return child.get(name);
    }
    
}

/* node factory */
const NODES = new Map();

class NodeFactory {

    get(name) {
        if (NODES.has(name)) {
            return NODES.get(name);
        }
        let node = new Node(name);
        NODES.set(name, node);
    }

}

export default new NodeFactory();