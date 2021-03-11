import reducer from './reducer'
import LocalStorage from '../services/localstorage'

const store = {
  listeners: [],

  state: {
    location: null,

    current: null,

    forecast: null,

    locale: LocalStorage.getLocale() || 'en',
    unitTemp: LocalStorage.getUnitTemp() || 'c',
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
      return action(this.dispatch.bind(this), this.state)
    }

    this.state = reducer(this.state, action)
    this.notify()

    return Promise.resolve()
  },
}

export default store

export const dispatch = store.dispatch.bind(store)
