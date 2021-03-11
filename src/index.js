import CurrentWeather from './modules/CurrentWeather'
import Forecast from './modules/Forecast'
import Geolocation from './modules/Geolocation'
import ControlPanel from './modules/ControlPanel'
import { initApp } from './store/thunks'
import { dispatch } from './store/store'
import { ImageApi } from './services/api'
import { changeBackgoundImage } from './utils'

import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  CurrentWeather('.fact')
  Forecast('.forecast')
  ControlPanel('.control')
  Geolocation('.geolocation-wrap')

  dispatch(initApp())

  ImageApi.getRandom()
    .then(({ urls }) => changeBackgoundImage(document.body, urls.full))
})
