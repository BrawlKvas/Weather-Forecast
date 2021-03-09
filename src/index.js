import CurrentWeather from './modules/CurrentWeather'
import Forecast from './modules/Forecast'
import Geolocation from './modules/Geolocation'
import ControlPanel from './modules/ControlPanel'

import { LocationApi, GeocodingAPI, WeatherApi } from './services/api/api'

import './index.css'

const currentWeather = new CurrentWeather('.fact', { locale: 'ru' })
const geolocation = new Geolocation('.geolocation-wrap', { locale: 'ru' })
const weatherForecast = new Forecast('.forecast', { locale: 'ru' })

currentWeather.init()
geolocation.init()
weatherForecast.init()

LocationApi.getLocation()
  .then((data) => {
    const [lat, lng] = data.loc.split(',')
    geolocation.setLngLat(lng, lat)
    GeocodingAPI.forwardGeocoding(lat, lng, 'ru')
      .then(({ results }) => {
        WeatherApi.getForecast(3, lat, lng, 'ru')
          .then(({ current, forecast }) => {
            currentWeather.setState({ location: results[0].components, current })
            weatherForecast.setState({ forecastday: forecast.forecastday })
          })
      })
  })

const control = new ControlPanel('.control')

control.init()

// ImageApi.getRandom()
//   .then(({ urls }) => { document.body.style.backgroundImage = `url(${urls.full})` })
