import S from '../../values/strings'

import connect from './CurrentWeather.connect'

import './CurrentWeather.css'

const formatterOption = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

function CurrentWeather(selector) {
  const $box = document.querySelector(selector)

  let formatter = null
  let loop = null

  function updateDate() {
    $box.querySelector('.fact__datatime').textContent = formatter.format(new Date())
  }

  return (props) => {
    clearInterval(loop)

    if (!props.isReady) {
      $box.innerHTML = `
        <div class="loader-wrap">
          <div class="loader"></div>
        </div>
      `
      return
    }

    loop = setInterval(updateDate, 1000)

    formatter = new Intl.DateTimeFormat(props.locale, formatterOption)
    const date = formatter.format(new Date())

    $box.innerHTML = /* html */`
      <h3 class="fact__location">${props.city ? `${props.city},` : ''} ${props.country}</h3>
      <time class="fact__datatime">${date}</time>

      <div class="fact__temp-wrap">
        <div class="fact__temp">
          <span class="temp-${props.unitTemp}">${props.temp}</span>
        </div>

        <img class="fact__icon" src="${props.icon}">

        <div class="fact__feelings">
          <div class="fact__condition">${props.text}</div>
          <div class="fact__feels-like">
            ${S.feelsLike[props.locale]}
            <span class="temp-${props.unitTemp}">${props.feelslike}</span>
          </div>
        </div>
      </div>

      <div class="fact__props">
        <div class="prop fact__wind-speed">
          <img src="./../src/image/wind.svg">
          ${(props.wind / 3.6).toFixed(1)} ${S.metersPerSecond[props.locale]}
        </div>
        <div class="prop fact__humidity">
          <img src="./../src/image/rain.svg">
          ${props.humidity}%
        </div>
        <div class="prop fact__pressure">
          <img src="./../src/image/compass.svg">
          ${props.pressure} ${S.millimetersOfMercury[props.locale]}
        </div>
      </div>
    `
  }
}

export default connect(CurrentWeather)
