import reducer from './reducer'

const store = {
  listeners: [],

  state: {
    location: {
      city: 'Saint-Peterburg',
      country: 'Russia',
    },

    current: {
      temp_c: 11.9,
      temp_f: 53.4,
      condition: {
        text: 'Moderate or heavy rain shower',
        icon: '//cdn.weatherapi.com/weather/64x64/day/356.png',
      },
      wind_mph: 4.9,
      wind_kph: 7.9,
      precip_mm: 3.3,
      humidity: 52,
      feelslike_c: 11.2,
      feelslike_f: 52.2,
    },

    forecast: null,
    locale: 'en',
    lat: null,
    lng: null,
    unitTemp: 'c',
  },

  getState() {
    return this.state
  },

  subscribe(f) {
    this.listeners.push(f)
  },

  notify() {
    this.listeners.forEach((listener) => listener(this.state))
  },

  dispatch(action) {
    if (typeof action === 'function') { // THUNK
      action(this.dispatch.bind(this), this.state)
    }

    this.state = reducer(this.state, action)
    this.notify()
  },
}

export default store

export const dispatch = store.dispatch.bind(store)
