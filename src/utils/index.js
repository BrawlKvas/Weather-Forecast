export const createElement = (tag = 'div', classes) => {
  const $elem = document.createElement(tag)
  $elem.classList = classes
  return $elem
}

// eslint-disable-next-line no-param-reassign
export const changeBackgoundImage = (elem, url) => { elem.style.backgroundImage = `url(${url})` }
