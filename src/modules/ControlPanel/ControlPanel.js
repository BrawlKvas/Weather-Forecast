import { ImageApi } from '../../services/api/api'
import { changeBackgoundImage } from '../../utils'
import './ControlPanel.css'

const CHANGE_BACKGROUND = 'change_background'

class ControlPanel {
  constructor(selector) {
    this.$box = document.querySelector(selector)
  }

  init() {
    this.render()

    this.$box
      .querySelector('.control__btns')
      .addEventListener('click', this.clickHandler.bind(this))
  }

  clickHandler({ target }) {
    switch (target.dataset.action) {
      case CHANGE_BACKGROUND:
        ImageApi.getRandom()
          .then(({ urls }) => changeBackgoundImage(document.body, urls.full))
        this.test = 11
        break

      default:
    }
  }

  render() {
    this.$box.innerHTML = /* html */`
      <div class="control__btns">
        <button class="control__btn" data-action="change_background">Сменить фон</button>
        <button class="control__btn">Сменить язык</button>
        <button class="control__btn">Сменить единицу температуры</button>
      </div>

      <form class="control__form">
        <input type="text" name="placename" placeholder="Город или район">
      </form>
    `
  }
}

export default ControlPanel
