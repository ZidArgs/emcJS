class TXTLoader {

    load(file) {
        return fetch(new Request(file, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "text/plain",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            }),
            mode: 'cors',
            cache: 'default'
        })).then(function(r) {
            return r.text();
        }.bind(this));
    }

    loadAll(files) {
        var data = [];
        for (let i in files) {
            data.push(TXTLoader.load(files[i]));
        }
        return Promise.all(data);
    }

}

export default new TXTLoader;