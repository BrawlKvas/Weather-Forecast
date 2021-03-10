import * as C from './constants'

export const setUnitTemp = (payload) => ({ type: C.SET_UNIT_TEMP, payload })
export const setLocale = (payload) => ({ type: C.SET_LOCALE, payload })
export const setForecast = (payload) => ({ type: C.SET_FORECAST, payload })
export const setLocation = (payload) => ({ type: C.SET_LOCATION, payload })
export const setCurrent = (payload) => ({ type: C.SET_CURRENT, payload })
