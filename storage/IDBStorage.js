
function openDB(name) {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(name);
        request.onupgradeneeded = function(event) {
            var db = request.result;
            if(!db.objectStoreNames.contains("data")){
                store = db.createObjectStore("data");
            }
        };
        request.onsuccess = function() {
            resolve(request.result);
        };
        request.onerror = function(e) {
            reject(e);
        }
    });
}
function getStoreWritable(db) {
	return db.transaction("data", "readwrite").objectStore("data");
}
function getStoreReadonly(db) {
	return db.transaction("data", "readonly").objectStore("data");
}
function writeData(store, key, value) {
	return new Promise(function(resolve, reject) {
		var request = store.add(value, key);
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

class IDBStorage {
    
	async set(name, key, value) {
		try {
			var db = await openDB(name);
			let store = getStoreWritable(db);
			await writeData(store, key, value);
			db.close();
		} catch(error) {
			// error handling
		}
	}

	async get(name, key, value) {
		try {
			var db = await openDB(name);
			let store = getStoreReadonly(db);
			var res = await readData(store, key);
			db.close();
			if (typeof res == "undefined" || res == null) {
				return value;
			}
			return res;
		} catch(error) {
			// error handling
		}
	}

	async has(name, key) {
		try {
			var db = await openDB(name);
			let store = getStoreReadonly(db);
			var res = await hasKey(store, key);
			db.close();
			return !!res;
		} catch(error) {
			// error handling
		}
	}

	async delete(name, key) {
		try {
			var db = await openDB(name);
			let store = getStoreWritable(db);
			var res = await deleteData(store, key);
			db.close();
			return !!res;
		} catch(error) {
			// error handling
		}
	}

    async clear() {
        // TODO
    }

	async keys(name) {
		try {
			var db = await openDB(name);
			let store = getStoreReadonly(db);
			var res = await getKeys(store);
			db.close();
			return !!res;
		} catch(error) {
			// error handling
		}
	}

    async getAll() {
        // TODO
    }

}

export default new IDBStorage;