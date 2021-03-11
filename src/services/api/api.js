import * as C from './constants'

async function request(...args) {
  const res = await fetch(...args)

  if (!res.ok) {
    throw new Error(`Bad request ${res.url}`)
  }

  return res.json()
}

export const LocationApi = {
  getLocation() {
    return request(`
      ${C.LOCATION_API_BASE_URL}json?token=${C.LOCATION_API_TOKEN}
    `)
  },
}

export const WeatherApi = {
  getForecast(days = 3, lat, lng, lang = 'en') {
    return request(`
      ${C.WEATHER_API_BASE_URL}forecast.json?key=${C.WEATHER_API_TOKEN}&q=${lat},${lng}&days=${days}&lang=${lang}
    `)
  },
}

export const ImageApi = {
  getRandom() {
    return request(`
      ${C.IMAGE_API_BASE_URL}photos/random?orientation=landscape&per_page=1&query=Wallpapers&client_id=${C.IMAGE_API_TOKEN}
    `)
  },
}

export const GeocodingAPI = {
  reverseGeocoding(placename, lang = 'en') {
    return request(`
      ${C.GEOCODING_API_BASE_URL}json?q=${placename}&key=${C.GEOCODING_API_TOKEN}&language=${lang}
    `)
  },

  forwardGeocoding(lat, lng, lang = 'en') {
    return request(`
      ${C.GEOCODING_API_BASE_URL}json?q=${lat},${lng}&key=${C.GEOCODING_API_TOKEN}&language=${lang}
    `)
  },
}
