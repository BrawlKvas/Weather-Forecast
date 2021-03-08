import CurrentWeather from './modules/CurrentWeather'
import Forecast from './modules/Forecast'
import Geolocation from './modules/Geolocation'
// import Control from './modules/Control'

import './index.css'
import { LocationApi } from './services/api'

const currentWeather = new CurrentWeather('.fact', { locale: 'ru' })

currentWeather.init()

setTimeout(() => currentWeather.setState({
  location: 'Округ Сампсониевское, Санкт-Петербург',
  condition: 'Снег',
  temp: -1,
  feelLike: -9,
  wind: 2.4,
  humidity: 89,
  pressure: 720,
}), 2000)

const forecast = new Forecast('.forecast', {
  state: {
    days: [
      { name: 'Понедельник', temp: -1, icon: '//cdn.weatherapi.com/weather/64x64/night/326.png' },
      { name: 'Вторник', temp: 0, icon: '//cdn.weatherapi.com/weather/64x64/day/395.png' },
      { name: 'Среда', temp: 2, icon: '//cdn.weatherapi.com/weather/64x64/night/320.png' },
    ],
  },
})

forecast.init()

const geolocation = new Geolocation('.geolocation-wrap', { locale: 'ru' })

geolocation.init()

LocationApi.getLocation()
  .then((data) => {
    const [lat, lng] = data.loc.split(',')
    geolocation.setLngLat(lng, lat)
  })

// const control = new Control('.control')

// control.render()
