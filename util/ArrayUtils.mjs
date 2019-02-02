function diff(a, b) {
    var c = new Set(b);
    return a.filter(d =>!c.has(d));
}
  
function symDiff(a, b) {
    return difference(a, b).concat(difference(b, a));
}

function intersect(a, b) {
    var c = new Set(b);
    return a.filter(d =>c.has(d));
}

export {diff, symDiff, intersect};