const SEQUENCES = new WeakMap();

export default class Sequence {

    constructor() {
        SEQUENCES.set(this, []);
    }

    next(callback) {
        if (typeof callback == "function") {
            SEQUENCES.get(this).push(callback);
        }
        return this;
    }

    async run() {
        let sequence = SEQUENCES.get(this);
        while (sequence.length) {
            const step = sequence.shift();
            await step();
        }
    }

    static next(callback) {
        return (new Sequence()).next(callback);
    }

}