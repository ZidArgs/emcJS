function arrayDiff(a, b) {
    if (!Array.isArray(a) ||!Array.isArray(b)) {
        throw new TypeError("only arrays are comparable");
    }
    var c = new Set(b);
    return a.filter(d =>!c.has(d));
}
  
function arraySymDiff(a, b) {
    if (!Array.isArray(a) ||!Array.isArray(b)) {
        throw new TypeError("only arrays are comparable");
    }
    return difference(a, b).concat(difference(b, a));
}

function arrayIntersect(a, b) {
    if (!Array.isArray(a) ||!Array.isArray(b)) {
        throw new TypeError("only arrays are comparable");
    }
    var c = new Set(b);
    return a.filter(d =>c.has(d));
}

function deepEquals(a, b) {
	if (Object.is(a,b)) {
		return true;
    }
	if (a instanceof Date && b instanceof Date) {
		return a.getTime() == b.getTime();
    }
	let keys_a = Object.keys(a);
	if (keys_a.length != Object.keys(b).length) {
		return false;
    }
	return keys_a.every(i => b.hasOwnProperty(i) && deepEquals(a[i], b[i]));
}

export {arrayDiff, arraySymDiff, arrayIntersect, deepEquals};