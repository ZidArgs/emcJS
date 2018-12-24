const dl = document.createElement("a");
dl.style = "display: none";

const ul = document.createElement("input");
ul.setAttribute("type", "file");
ul.style = "display: none";

function loadPromise(resolve, reject) {
    ul.onchange = loadChange.bind(this, resolve, reject);
    ul.onerror = reject;
    ul.click();
}

function loadChange(resolve, reject) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = loadOnload.bind(this, resolve);
    reader.onabort = resolve;
    reader.onerror = reject;
    reader.readAsDataURL(file);
};

function loadOnload(resolve, e) {
    resolve(e.target.result);
}

class FileSystem {

    load() {
        return new Promise(loadPromise);
    }

    save(data, fileName) {
        var url = window.URL.createObjectURL(new Blob([data], {type: "octet/stream"}));
        dl.href = url;
        dl.download = fileName;
        dl.click();
        window.URL.revokeObjectURL(url);
    }

}

export default new FileSystem;