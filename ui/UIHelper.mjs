/**
 * 
 * helper module for easy creation of html elements 
 * 
 */

function createOption(value, content = value, style = {}) {
    let opt = document.createElement('option');
    opt.setAttribute('value', value);
    if (content instanceof HTMLElement) {
        opt.appendChild(content);
    } else {
        opt.innerHTML = content;
    }
    for (let i in style) {
        opt.style[i] = style[i];
    }
    return opt;
}

export {createOption};