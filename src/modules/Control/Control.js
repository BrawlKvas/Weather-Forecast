import './Control.css'

class Control {
  constructor(selector) {
    this.$box = document.querySelector(selector)
  }

  render() {
    this.$box.innerHTML = `
      <div class="control__btns">
        <button class="btn control__btn">Фон</button>
        <button class="btn control__btn">RU</button>
        <button class="btn control__btn">F</button>
      </div>

      <div class="control__input input-field">
        <input type="text" placeholder="Город или район">
      </div>
    `
  }
}

export default Control
