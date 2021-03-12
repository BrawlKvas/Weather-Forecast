import { ImageApi } from '../../services/api/api'
import { changeBackgoundImage } from '../../utils'
import connect from './ControlPanel.connect'

import S from '../../values/strings'

import './ControlPanel.css'

const CHANGE_BACKGROUND = 'change_background'
const CHANGE_LOCALE = 'change_locale'
const CHANGE_UNIT_TEMP = 'change_unitTemp'

function ControlPanel(selector) {
  const $box = document.querySelector(selector)

  function setNoFound(value) {
    $box
      .querySelector('.control__no-found')
      .classList.toggle('d-none', !value)
  }

  function setLoading(value) {
    $box
      .querySelector('.control__loader')
      .classList.toggle('d-none', !value)
  }

  return ({
    locale,
    unitTemp,
    changeLocale,
    changeUnitTemp,
    changeLocation,
  }) => {
    $box.innerHTML = /* html */`
      <div class="control__btns">
        <button class="control__btn" data-action="${CHANGE_BACKGROUND}">
          ${S.changeBackgound[locale]}
        </button>

        <button class="control__btn" data-action="${CHANGE_LOCALE}">
          ${locale.toUpperCase()}
        </button>
        
        <button class="control__btn temp-${unitTemp}" data-action="${CHANGE_UNIT_TEMP}"></button>
      </div>

      <form class="control__form">
        <input 
          type="text" 
          name="placename" 
          placeholder="${S.cityOrDistrict[locale]}" 
        />

        <button class="control__btn-search">${S.search[locale]}</button>

        <div class="control__no-found d-none">${S.noFound[locale]}</div>
        
        <div class="loader control__loader d-none"></div>

      </form>
    `
    $box
      .querySelector('.control__btns')
      .addEventListener('click', ({ target }) => {
        switch (target.dataset.action) {
          case CHANGE_BACKGROUND:
            ImageApi.getRandom()
              .then(({ urls }) => changeBackgoundImage(document.body, urls.full))
            break

          case CHANGE_LOCALE:
            changeLocale(locale === 'en' ? 'ru' : 'en')
            break

          case CHANGE_UNIT_TEMP:
            changeUnitTemp(unitTemp === 'c' ? 'f' : 'c')
            break

          default:
        }
      })

    $box
      .querySelector('.control__form')
      .addEventListener('submit', (e) => {
        e.preventDefault()
        setLoading(true)
        changeLocation(e.target.placename.value)
          .catch(() => setNoFound(true))
          .finally(() => setLoading(false))
        setNoFound(false)
      })
  }
}

export default connect(ControlPanel)
