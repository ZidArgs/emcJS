
const CANVAS = document.createElement("canvas");
const SERIALIZER = new XMLSerializer();

class Helper {

    compareVersions(a = "", b = "", s = ".") {
        let c = a.split(s);
        let d = b.split(s);
        let e = parseInt(c.shift());
        let f = parseInt(d.shift());
        while (!!e && !!f) {
            if (e != f) {
                return e < f;
            }
            e = parseInt(c.shift());
            f = parseInt(d.shift());
        }
        return !!f;
    }

    arrayDiff(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            throw new TypeError("only arrays are comparable");
        }
        let c = new Set(b);
        return a.filter(d =>!c.has(d));
    }
      
    arraySymDiff(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            throw new TypeError("only arrays are comparable");
        }
        return difference(a, b).concat(difference(b, a));
    }
    
    arrayIntersect(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            throw new TypeError("only arrays are comparable");
        }
        let c = new Set(b);
        return a.filter(d =>c.has(d));
    }
    
    objectSort(a, b) {
        if (typeof a != "object" || Array.isArray(a)) {
            throw new TypeError("only objects are sortable");
        }
        if (typeof b != "function") {
            b = undefined;
        }
        let c = {};
        let d = Object.keys(a).sort(b);
        for (let e of d) {
            c[e] = a[e];
        }
        return c;
    }
    
    deepEquals(a, b) {
        if (Object.is(a,b)) {
            return true;
        }
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() == b.getTime();
        }
        let c = Object.keys(a);
        if (c.length != Object.keys(b).length) {
            return false;
        }
        return c.every(i => b.hasOwnProperty(i) && this.deepEquals(a[i], b[i]));
    }
    
    svg2png(svg) {
        return new Promise(function(resolve, reject) {
            if (!svg instanceof SVGElement) {
                reject(new TypeError("only svg elements can be converted to png"));
            }
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

}

export default new Helper;