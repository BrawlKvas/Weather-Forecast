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

class CurrentWeather {
  constructor(selector) {
    this.$box = document.querySelector(selector)

    this.state = {
      formatter: null,
      loop: null,
    }
  }

  updateDate() {
    this.$box.querySelector('.fact__datatime').textContent = this.state.formatter.format(new Date())
  }

  render(props) {
    if (props.isLoading) {
      this.$box.innerHTML = '<div class="loader-wrap"><div class="loader"></div></div>'
      return
    }

    clearInterval(this.loop)
    this.state.loop = setInterval(this.updateDate.bind(this), 1000)

    this.state.formatter = new Intl.DateTimeFormat(props.locale, formatterOption)
    const date = this.state.formatter.format(new Date())

    this.$box.innerHTML = /* html */`
      <h3 class="fact__location">${props.city}, ${props.country}</h3>
      <time class="fact__datatime">${date}</time>

      <div class="fact__temp-wrap">
        <div class="fact__temp">
          <span class="temp-value">${props.temp}</span>
        </div>

        <img class="fact__icon" src="${props.icon}">

        <div class="fact__feelings">
          <div class="fact__condition">${props.text}</div>
          <div class="fact__feels-like">
            ${S.feelsLike[props.locale]}
            <span class="temp-value">${props.feelslike}</span>
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
