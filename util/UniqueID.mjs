const COUNTER = {};

function nextID(prefix) {
    return `0000000000${COUNTER.hasOwnProperty(prefix)?++COUNTER[prefix]:COUNTER[prefix]=0}`.slice(-10);
}

class UniqueID {

    generate(prefix = "unique-id") {
        return `${prefix}-${nextID()}`;
    }

}

export default new UniqueID;