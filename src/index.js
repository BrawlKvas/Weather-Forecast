import CurrentWeather from './modules/CurrentWeather'
// import Forecast from './modules/Forecast'
// import Geolocation from './modules/Geolocation'
import { dispatch } from './store/store'

import { setLocation, setCurrent, setForecast } from './store/actions'

import './index.css'
import { LocationApi, GeocodingAPI, WeatherApi } from './services/api/api'

const currentWeather = new CurrentWeather('.fact')
// const geolocation = new Geolocation('.geolocation-wrap')
// const weatherForecast = new Forecast('.forecast')

const initApp = () => async (dispatch, { locale }) => {
  const { loc } = await LocationApi.getLocation()
  const [lat, lng] = loc.split(',')

  const { results } = await GeocodingAPI.forwardGeocoding(lat, lng, locale)

  dispatch(setLocation({ ...results[0].components, ...results[0].geometry }))

  const { current, forecast } = await WeatherApi.getForecast(3, lat, lng, locale)

  dispatch(setCurrent(current))
  dispatch(setForecast(forecast))
}

dispatch(initApp())
