import * as C from './constants'

export default (state, { type, payload }) => {
  switch (type) {
    case C.SET_LOCATION:
      return {
        ...state,
        location: payload,
      }

    case C.SET_CURRENT:
      return {
        ...state,
        current: payload,
      }

    case C.SET_FORECAST:
      return {
        ...state,
        forecast: payload,
      }

    case C.SET_UNIT_TEMP:
      return {
        ...state,
        unitTemp: payload,
      }

    case C.SET_LOCALE:
      return {
        ...state,
        locale: payload,
      }

    default:
      return state
  }
}
