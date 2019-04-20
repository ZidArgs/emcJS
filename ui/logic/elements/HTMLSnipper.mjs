const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const tempImg = document.createElement('img');
tempImg.addEventListener('load', onTempImageLoad);

function onTempImageLoad(e){
    ctx.drawImage(e.target, 0, 0);
    window.open(canvas.toDataURL(), "_blank");
    //targetImg.src = canvas.toDataURL();
}

const SERIALIZER = new XMLSerializer();

class HTMLSnipper {

    snip(el) {
        if (!(el instanceof HTMLElement)) {
            throw new Error("Only HTMLElements can be snipped");
        }
        let w = el.clientWidth;
        let h = el.clientHeight;
        canvas.width = w;
        canvas.height = h;
        tempImg.src = html2svg(el, w, h);
    }

}

export default new HTMLSnipper;

function html2svg(clonedNode, width, height) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    const foreignObject = document.createElementNS(xmlns, 'foreignObject');

    svg.setAttributeNS('', 'width', `${width}`);
    svg.setAttributeNS('', 'height', `${height}`);

    foreignObject.setAttributeNS('', 'width', '100%');
    foreignObject.setAttributeNS('', 'height', '100%');
    foreignObject.setAttributeNS('', 'x', '0');
    foreignObject.setAttributeNS('', 'y', '0');
    foreignObject.setAttributeNS('', 'externalResourcesRequired', 'true');

    svg.appendChild(foreignObject);
    foreignObject.appendChild(clonedNode);

    let html = encodeURIComponent(SERIALIZER.serializeToString(svg));
    return `data:image/svg+xml;charset=utf-8,${html}`;
}

/**
 * conclusion:
 * for custom elements there has to at least exist some svg to apply to them
 * so we have to register all styling we might want to use to the svg
 * this means, thet this is only usable on the logic elements themselfes
 * 
 * logic elements have to register a bare minimum of css rules to apply to the svg
 * the style element will be generated on the fly and appended to the svg
 * logic elements need to be cloned, before they are added to the svg
 */

/*
!function() {
    const SERIALIZER = new XMLSerializer();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const tempImg = document.createElement('img');
    tempImg.addEventListener('load', onTempImageLoad);

    tempImg.style.border = "solid 10px red";
    document.body.appendChild(tempImg);

    function onTempImageLoad(e){
        ctx.drawImage(e.target, 0, 0);
        console.log(canvas.toDataURL());
    }
    function html2svg(clonedNode, width, height) {
        const xmlns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(xmlns, 'svg');
        const foreignObject = document.createElementNS(xmlns, 'foreignObject');

        svg.setAttributeNS('', 'width', `${width}`);
        svg.setAttributeNS('', 'height', `${height}`);

        foreignObject.setAttributeNS('', 'width', '100%');
        foreignObject.setAttributeNS('', 'height', '100%');
        foreignObject.setAttributeNS('', 'x', '0');
        foreignObject.setAttributeNS('', 'y', '0');
        foreignObject.setAttributeNS('', 'externalResourcesRequired', 'true');

        svg.appendChild(foreignObject);
        foreignObject.appendChild(clonedNode);

        let html = encodeURIComponent(SERIALIZER.serializeToString(svg));
        return `data:image/svg+xml;charset=utf-8,${html}`;
    }
    function snip(el) {
        if (!(el instanceof HTMLElement)) {
            throw new Error("Only HTMLElements can be snipped");
        }
        let w = el.clientWidth;
        let h = el.clientHeight;
        canvas.width = w;
        canvas.height = h;
        tempImg.src = html2svg(el, w, h);
    }
    snip(temp1);
}();
*/