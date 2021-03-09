import S from '../../values/strings'

import './Forecast.css'

class Forecast {
  constructor(selector, option = {}) {
    this.$box = document.querySelector(selector)

    this.state = option.state || null

    this.locale = option.locale || 'en'

    this.unitTemp = option.unitTemp || 'c'
  }

  init() {
    this.render()
  }

  setState(state) {
    this.state = state
    this.render()
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

    const days = this.state.forecastday

    let html = ''

    html += `
      <h2 class="forecast__title">${S.forecastThreeDays[this.locale]}</h2>
      <div class="forecast__days">
    `

    days.forEach(({ date, day }) => {
      const parsedDate = new Date(Date.parse(date))
      const weekday = parsedDate.toLocaleDateString(this.locale, { weekday: 'long' })
      const monthAndDay = parsedDate.toLocaleDateString(this.locale, { month: 'long', day: 'numeric' })

      html += /* html */`
      <div class="forecast__day">
        <div class="forecast__name">${weekday}</div>
        <time class="forecast__date" datetime="2021-03-06 00:00+0300">${monthAndDay}</time>
        <img class="forecast__icon" src="${day.condition.icon}">
        <span class="forecast__temp temp-value">${day[`avgtemp_${this.unitTemp}`]}</span>
      </div>
      `
    })

    html += '</div>'

    this.$box.innerHTML = html
  }
}

export default Forecast
