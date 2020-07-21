import { sum } from "./sum";

function component(): Node {
  const element = document.createElement("div");

  element.innerHTML = "Hello world!" + "<br/>" + sum(2, 3);
  return element;
}

document.body.appendChild(component());
