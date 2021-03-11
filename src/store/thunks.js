import { GeocodingAPI, LocationApi, WeatherApi } from '../services/api'
import LocalStorage from '../services/localstorage'
import {
  setCurrent,
  setForecast,
  setLocale,
  setLocation,
  setUnitTemp,
} from './actions'

export const initApp = () => async (dispatch, { locale }) => {
  const { loc } = await LocationApi.getLocation()
  const [lat, lng] = loc.split(',')

  GeocodingAPI.forwardGeocoding(lat, lng, locale)
    .then(({ results }) => dispatch(setLocation({ ...results[0].components, lat, lng })))

  WeatherApi.getForecast(3, lat, lng, locale)
    .then(({ current, forecast }) => {
      dispatch(setCurrent(current))
      dispatch(setForecast(forecast))
    })
}

export const changeUnitTemp = (unit) => (dispatch) => {
  dispatch(setUnitTemp(unit))
  LocalStorage.setUnitTemp(unit)
}

export const changeLocale = (newLocale) => async (dispatch, { location }) => {
  const { lng, lat } = location
  GeocodingAPI.forwardGeocoding(lat, lng, newLocale)
    .then(({ results }) => dispatch(setLocation({ ...results[0].components, lat, lng })))

  WeatherApi.getForecast(3, lat, lng, newLocale)
    .then(({ current, forecast }) => {
      dispatch(setCurrent(current))
      dispatch(setForecast(forecast))
    })

  dispatch(setLocale(newLocale))

  LocalStorage.setLocale(newLocale)
}

export const changeLocation = (query) => async (dispatch, { locale }) => {
  const { results } = await GeocodingAPI.reverseGeocoding(query.trim(), locale)

  if (!results.length) {
    throw new Error('No found')
  }

  const { components, geometry } = results[0]

  dispatch(setLocation({ ...components, ...geometry }))
  dispatch(setCurrent(null))
  dispatch(setForecast(null))

  const { current, forecast } = await WeatherApi.getForecast(3, geometry.lat, geometry.lng, locale)

  dispatch(setCurrent(current))
  dispatch(setForecast(forecast))
}
