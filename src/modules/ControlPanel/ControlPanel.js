import { ImageApi } from '../../services/api/api'
import { changeBackgoundImage } from '../../utils'

import * as S from '../../values/strings'

import './ControlPanel.css'

const CHANGE_BACKGROUND = 'change_background'

class ControlPanel {
  constructor(selector) {
    this.$box = document.querySelector(selector)
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

  render({ locale }) {
    this.$box.innerHTML = /* html */`
      <div class="control__btns">
        <button class="control__btn" data-action="change_background">${S.changeBackgound[locale]}</button>
        <button class="control__btn">${S.changeLanguage[locale]}</button>
        <button class="control__btn">${S.changeTemperatureUnit[locale]}</button>
      </div>

      <form class="control__form">
        <input type="text" name="placename" placeholder="${S.cityOrDistrict[locale]}">
      </form>
    `

    this.$box
      .querySelector('.control__btns')
      .addEventListener('click', this.clickHandler.bind(this))
  }
}

export default ControlPanel
