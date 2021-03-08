import S from '../../values/strings'

import './Forecast.css'

class Forecast {
  constructor(selector, option = {}) {
    this.$box = document.querySelector(selector)

    this.state = option.state || null

    this.locale = option.locale || 'en'
  }

  init() {
    this.render()
  }

  setState(state) {
    this.state = state
    this.render()
  }

  render() {
    const { days } = this.state

    let html = ''

    html += `
      <h2 class="forecast__title">${S.forecastThreeDays[this.locale]}</h2>
      <div class="forecast__days">
    `

    days.forEach((item) => {
      html += /* html */`
      <div class="forecast__day">
        <div class="forecast__name">${new Date().toLocaleDateString(this.locale, { weekday: 'long' })}</div>
        <time class="forecast__date" datetime="2021-03-06 00:00+0300">${new Date().toLocaleDateString(this.locale, { month: 'long', day: 'numeric' })}</time>
        <img class="forecast__icon" src="${item.icon}">
        <span class="forecast__temp temp-value">${item.temp}</span>
      </div>
      `
    })

    html += '</div>'

    this.$box.innerHTML = html
  }
}

export default Forecast
