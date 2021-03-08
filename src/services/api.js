const IPINFO_TOKEN = '902410c2d24650'
const WEATHERAPI_TOKEN = '66dfe924f21f43d295a133915210703'
const UNSPLASH_TOKEN = 'nHsGPEg8EiRZnDmSkefr_HVlAPOUK-E4vYOUy5xRbZI'
const OPEN_CAGE_TOKEN = 'c7f9fd28eb604eb39a5c4c52bc1922eb'

export const LocationApi = {
  getLocation() {
    return fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`)
      .then((res) => res.json())
  },
}

export const WeatherApi = {
  getForecast({
    days = 3,
    latitude,
    longitude,
    lang = 'en',
  }) {
    return fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_TOKEN}&q=${latitude},${longitude}&days=${days}&lang=${lang}`,
    )
      .then((res) => res.json())
  },
}

export const ImageApi = {
  getRandom() {
    return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${UNSPLASH_TOKEN}`)
      .then((res) => res.json())
  },
}

export const GeocodingAPI = {
  geocode(placename, lang) {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${placename}&key=${OPEN_CAGE_TOKEN}&language=${lang}`)
      .then((res) => res.json())
  },
}
