const STATE = new WeakMap();
const MAX = new WeakMap();
const MIN = new WeakMap();

export default class NumberState extends EventTarget {

    constructor(max, min) {
        super();
        if (typeof max != "number") max = 0;
        if (typeof min != "number") min = 0;
        STATE.set(this, 0);
        MAX.set(this, max);
        MIN.set(this, min);
    }

    convert(value) {
        if (typeof value != "number" || isNaN(value)) value = 0;
        const max = MAX.get(this);
        const min = MIN.get(this);
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        return value;
    }

    set max(value) {
        if (typeof value != "number") value = 0;
        const state = STATE.get(this);
        const min = MIN.get(this);
        if (value < min) {
            value = min;
        }
        MAX.set(this, value);
        if (state > value) {
            STATE.set(this, value);
            const event = new Event("value");
            event.data = value;
            this.dispatchEvent(event);
        }
    }

    get max() {
        return MAX.get(this);
    }

    set min(value) {
        if (typeof value != "number") value = 0;
        const state = STATE.get(this);
        const max = MAX.get(this);
        if (value > max) {
            value = max;
        }
        MIN.set(this, value);
        if (state < value) {
            STATE.set(this, value);
            const event = new Event("value");
            event.data = value;
            this.dispatchEvent(event);
        }
    }

    get min() {
        return MIN.get(this);
    }

    set value(value) {
        const state = STATE.get(this);
        value = this.convert(value);
        if (state != value) {
            STATE.set(this, value);
            const event = new Event("value");
            event.data = value;
            this.dispatchEvent(event);
        }
    }

    get value() {
        return STATE.get(this);
    }

}