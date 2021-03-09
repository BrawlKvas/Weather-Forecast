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

    this.unitTemp = option.unitTemp || 'c'

    this.formatter = new Intl.DateTimeFormat(this.locale, formatterOption)

    this.loop = null
  }

  init() {
    this.render()
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

  setUnitTemp(value) {
    if (value !== 'c' && value !== 'f') {
      throw new Error('Wrong unit of temp')
    }

    this.unitTemp = value
  }

  render() {
    if (!this.state) {
      this.$box.innerHTML = '<div class="loader-wrap"><div class="loader"></div></div>'
      return
    }

    if (this.loop) {
      clearInterval(this.loop)
    }

    this.loop = setInterval(this.updateDate.bind(this), 1000)

    const { location, current } = this.state
    const { condition } = current

    const date = this.formatter.format(new Date())

    this.$box.innerHTML = /* html */`
      <h3 class="fact__location">${location.city}, ${location.country}</h3>
      <time class="fact__datatime">${date}</time>

      <div class="fact__temp-wrap">
        <div class="fact__temp">
          <span class="temp-value">${current[`temp_${this.unitTemp}`]}</span>
        </div>

        <img class="fact__icon" src="${condition.icon}">

        <div class="fact__feelings">
          <div class="fact__condition">${condition.text}</div>
          <div class="fact__feels-like">
            ${S.feelsLike[this.locale]}
            <span class="temp-value">${current.feelslike_c}</span>
          </div>
        </div>
      </div>

      <div class="fact__props">
        <div class="prop fact__wind-speed">
          <img src="./../src/image/wind.svg">
          ${(current.wind_kph / 3.6).toFixed(1)} ${S.metersPerSecond[this.locale]}
        </div>
        <div class="prop fact__humidity">
          <img src="./../src/image/rain.svg">
          ${current.humidity}%
        </div>
        <div class="prop fact__pressure">
          <img src="./../src/image/compass.svg">
          ${current.precip_mm} ${S.millimetersOfMercury[this.locale]}
        </div>
      </div>
    `
  }
}

export default CurrentWeather
