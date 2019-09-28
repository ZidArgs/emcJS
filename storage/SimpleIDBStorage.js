let dbInstance = null;
function openDB() {
    return new Promise(function(resolve, reject) {
		if (dbInstance != null) {
			resolve(dbInstance);
		} else {
			let request = indexedDB.open("SimpleIDBStorage");
			request.onupgradeneeded = function(event) {
				let db = request.result;
				if(!db.objectStoreNames.contains("data")){
					store = db.createObjectStore("data");
				}
			};
			request.onsuccess = function() {
				dbInstance = request.result;
				resolve(dbInstance);
			};
			request.onerror = function(e) {
				reject(e);
			}
		}
    });
}
function getStoreWritable() {
	return dbInstance.transaction("data", "readwrite").objectStore("data");
}
function getStoreReadonly() {
	return dbInstance.transaction("data", "readonly").objectStore("data");
}

class SimpleIDBStorage {
    
	set(key, value) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreWritable().put(value, key);
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	get(key, value) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreReadonly().get(key);
			request.onsuccess = function(e) {
				let res = e.target.result;
				if (typeof res == "undefined") {
					resolve(value);
				} else {
					resolve(res);
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	has(key) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreReadonly().getKey(key);
			request.onsuccess = function(e) {
				resolve(e.target.result === key);
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	delete(key) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreWritable().delete(key);
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

    clear() {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreWritable().clear();
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
    }

	keys(filter) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreReadonly().getAllKeys();
			request.onsuccess = function(e) {
				let res = e.target.result;
				if (typeof filter == "string") {
					resolve(res.filter(key => key.startsWith(filter)));
				} else {
					resolve(res);
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

    getAll(filter) {
		return new Promise(async function(resolve, reject) {
			await openDB();
			let request = getStoreReadonly().openCursor();
			let res = {};
			request.onsuccess = function(e) {
				let el = e.target.result;
				if (el) {
					res[el.key] = el.value;
					el.continue();
				} else {
					if (typeof filter == "string") {
						resolve(res.filter(key => key.startsWith(filter)));
					} else {
						resolve(res);
					}
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
    }

}

export default new SimpleIDBStorage;