import S from '../../values/strings'
import connect from './Forecast.connect'

import './Forecast.css'

function Forecast(selector) {
  const $box = document.querySelector(selector)

  return ({ days, locale, unitTemp }) => {
    if (!days) {
      $box.innerHTML = `
        <div class="loader-wrap">
          <div class="loader"></div>
        </div>
      `
      return
    }

    let html = ''

    html += `
      <h2 class="forecast__title">${S.forecastThreeDays[locale]}</h2>
      <div class="forecast__days">
    `

    days.forEach(({ date, day }) => {
      const parsedDate = new Date(Date.parse(date))
      const weekday = parsedDate.toLocaleDateString(locale, { weekday: 'long' })
      const monthAndDay = parsedDate.toLocaleDateString(locale, { month: 'long', day: 'numeric' })

      html += /* html */`
      <div class="forecast__day">
        <div class="forecast__name">${weekday}</div>
        <time class="forecast__date" datetime="2021-03-06 00:00+0300">${monthAndDay}</time>
        <img class="forecast__icon" src="${day.condition.icon}">
        <span class="forecast__temp temp-${unitTemp}">${day[`avgtemp_${unitTemp}`]}</span>
      </div>
      `
    })

    html += '</div>'

    $box.innerHTML = html
  }
}

export default connect(Forecast)
