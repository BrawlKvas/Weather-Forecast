import S from '../../values/strings'

import './CurrentWeather.css'

const formatterOption = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

class CurrentWeather {
  constructor(selector, option = {}) {
    this.$box = document.querySelector(selector)

    this.state = option.state || null

    this.locale = option.locale || 'en'

    this.formatter = new Intl.DateTimeFormat(this.locale, formatterOption)

    this.loop = null
  }

  init() {
    if (!this.state) {
      this.$box.innerHTML = '<div class="loader-wrap"><div class="loader"></div></div>'
    } else {
      this.render()
    }
  }

  setState(state) {
    this.state = state
    this.render()
  }

  updateDate() {
    this.$box.querySelector('.fact__datatime').textContent = this.formatter.format(new Date())
  }

  setLocale(locale) {
    this.locale = locale
    this.formatter = new Intl.DateTimeFormat(this.locale, formatterOption)
  }

  render() {
    if (this.loop) {
      clearInterval(this.loop)
    }

    this.loop = setInterval(this.updateDate.bind(this), 1000)

    const {
      location,
      temp,
      feelLike,
      wind,
      humidity,
      condition,
      pressure,
    } = this.state

    this.$box.innerHTML = /* html */`
      <h3 class="fact__location">${location}</h3>
      <time class="fact__datatime">${this.formatter.format(new Date())}</time>

      <div class="fact__temp-wrap">
        <div class="fact__temp">
          <span class="temp-value">${temp}</span>
        </div>

        <img class="fact__icon" src="//cdn.weatherapi.com/weather/64x64/night/326.png">

        <div class="fact__feelings">
          <div class="fact__condition">${condition}</div>
          <div class="fact__feels-like">
            ${S.feelsLike[this.locale]}
            <span class="temp-value">${feelLike}</span>
          </div>
        </div>
      </div>

      <div class="fact__props">
        <div class="prop fact__wind-speed">
          <img src="./../src/image/wind.svg">
          ${wind} м/с
        </div>
        <div class="prop fact__humidity">
          <img src="./../src/image/rain.svg">
          ${humidity}%
        </div>
        <div class="prop fact__pressure">
          <img src="./../src/image/compass.svg">
          ${pressure} мм рт. ст.
        </div>
      </div>
    `
  }
}

export default CurrentWeather
