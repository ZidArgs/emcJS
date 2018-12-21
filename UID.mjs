const ids = new Set();

function nextID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

class UID {

    generate(prefix = "UID") {
        let id = prefix + "-" + nextID();
        while (ids.has(id)) {
            id = prefix + "-" + nextID();
        }
        ids.add(id);
        return id;
    }

}

export default new UID;