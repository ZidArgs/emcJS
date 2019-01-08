const dl = document.createElement("a");
dl.style.position = "absolute !important";
dl.style.display = "none !important";
dl.style.opacity = "0 !important";
dl.style.visibility = "hidden !important";

const ul = document.createElement("input");
ul.setAttribute("type", "file");
ul.style.position = "absolute !important";
ul.style.display = "none !important";
ul.style.opacity = "0 !important";
ul.style.visibility = "hidden !important";

class FileSystem {

    load() {
        return new Promise((resolve, reject) => {
            ul.onchange = e => {
                let reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onabort = resolve;
                reader.onerror = reject;
                reader.readAsDataURL(e.files[0]);
            };
            ul.onerror = reject;
            ul.click();
        });
    }

    save(data, fileName) {
        let url = window.URL.createObjectURL(new Blob([data], {type: "octet/stream"}));
        dl.href = url;
        dl.download = fileName;
        document.body.appendChild(dl);
        dl.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(dl);
    }

}

export default new FileSystem;