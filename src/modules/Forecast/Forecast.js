import S from '../../values/strings'

import './Forecast.css'

class Forecast {
  constructor(selector) {
    this.$box = document.querySelector(selector)
  }

  render(props) {
    if (!props.days) {
      this.$box.innerHTML = '<div class="loader-wrap"><div class="loader"></div></div>'
      return
    }

    let html = ''

    html += `
      <h2 class="forecast__title">${S.forecastThreeDays[this.locale]}</h2>
      <div class="forecast__days">
    `

    props.days.forEach(({ date, day }) => {
      const parsedDate = new Date(Date.parse(date))
      const weekday = parsedDate.toLocaleDateString(props.locale, { weekday: 'long' })
      const monthAndDay = parsedDate.toLocaleDateString(props.locale, { month: 'long', day: 'numeric' })

      html += /* html */`
      <div class="forecast__day">
        <div class="forecast__name">${weekday}</div>
        <time class="forecast__date" datetime="2021-03-06 00:00+0300">${monthAndDay}</time>
        <img class="forecast__icon" src="${day.condition.icon}">
        <span class="forecast__temp temp-value">${day.avgtemp_c}</span> // TODO c/f
      </div>
      `
    })

    html += '</div>'

    this.$box.innerHTML = html
  }
}

export default Forecast
