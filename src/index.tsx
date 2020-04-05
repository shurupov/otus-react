const sumModule = require('./sum')

function component () {
  const element = document.createElement('div')

  element.innerHTML = 'Hello world!' +
        '<br/>' +
        sumModule(2, 3)
  return element
}

document.body.appendChild(component())
