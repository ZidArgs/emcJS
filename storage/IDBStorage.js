let dbInstance = null;

function openDB() {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open("data");
        request.onupgradeneeded = function(event) {
            var db = request.result;
            if(!db.objectStoreNames.contains("data")){
                store = db.createObjectStore("data");
            }
        };
        request.onsuccess = function() {
			dbInstance = request.result;
            resolve();
        };
        request.onerror = function(e) {
            reject(e);
        }
    });
}
function getStoreWritable() {
	return dbInstance.transaction("data", "readwrite").objectStore("data");
}
function getStoreReadonly() {
	return dbInstance.transaction("data", "readonly").objectStore("data");
}
function writeData(store, key, value) {
	return new Promise(function(resolve, reject) {
		var request = store.put(value, key);
		request.onsuccess = function(e) {
			resolve();
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function readData(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.get(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function deleteData(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.delete(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function hasKey(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.getKey(key);
		request.onsuccess = function(e) {
			resolve(e.target.result === key);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function getKeys(store) {
	return new Promise(function(resolve, reject) {
		var request = store.getAllKeys();
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}

function getAll(store) {
	return new Promise(function(resolve, reject) {
		// TODO
		var request = store.getAll();
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}

class IDBStorage {
    
	async set(key, value) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreWritable();
			await writeData(store, key, value);
		} catch(error) {
			// error handling
		}
	}

	async get(key, value) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await readData(store, key);
			if (typeof res == "undefined" || res == null) {
				return value;
			}
			return res;
		} catch(error) {
			// error handling
		}
	}

	async has(key) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await hasKey(store, key);
			return !!res;
		} catch(error) {
			// error handling
		}
	}

	async delete(key) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreWritable();
			var res = await deleteData(store, key);
			return !!res;
		} catch(error) {
			// error handling
		}
	}

    async clear() {
        // TODO
    }

	async keys() {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await getKeys(store);
			return !!res;
		} catch(error) {
			// error handling
		}
	}

    async getAll() {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await getAll(store);
			return !!res;
		} catch(error) {
			// error handling
		}
    }

}

export default new IDBStorage;