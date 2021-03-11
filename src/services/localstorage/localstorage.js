const STORAGE_LOCALE = 'weather-forecast/locale'
const STORAGE_UNIT_TEMP = 'weather-forecast/unitTemp'

const LocalStorage = {
  getLocale() {
    return localStorage.getItem(STORAGE_LOCALE)
  },

  setLocale(locale) {
    localStorage.setItem(STORAGE_LOCALE, locale)
  },

  getUnitTemp() {
    return localStorage.getItem(STORAGE_UNIT_TEMP)
  },

  setUnitTemp(unit) {
    localStorage.setItem(STORAGE_UNIT_TEMP, unit)
  },
}

export default LocalStorage
