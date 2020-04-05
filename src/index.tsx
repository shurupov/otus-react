const sum = require("./sum");

function component() {
    const element = document.createElement('div');

    element.innerHTML = "Hello world!";
    let a: number = sum(2, 3);
    return element;
}

document.body.appendChild(component());