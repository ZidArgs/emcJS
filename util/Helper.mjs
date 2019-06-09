function arrayDiff(a, b) {
    if (!Array.isArray(a) ||!Array.isArray(b)) {
        throw new TypeError("only arrays are comparable");
    }
    let c = new Set(b);
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
    let c = new Set(b);
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

const CANVAS = document.createElement("canvas");
const SERIALIZER = new XMLSerializer();
function svg2png(svg) {
    return new Promise(function(resolve, reject) {
        CANVAS.setAttribute("width", svg.getAttribute("width"));
        CANVAS.setAttribute("height", svg.getAttribute("height"));
        let url = 'data:image/svg+xml;base64,' + btoa(SERIALIZER.serializeToString(svg));
        let ctx = CANVAS.getContext("2d");
        let img = new Image();
        img.addEventListener("load", function() {
            ctx.drawImage(img, 0, 0);
            resolve(CANVAS.toDataURL("image/png"));
        });
        img.src = url;
    });
}

export {arrayDiff, arraySymDiff, arrayIntersect, deepEquals, svg2png};