import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import createElement from '../../utils/index'
import S from '../../values/strings'

import './Geolocation.css'

const ACCESS_TOKEN = 'pk.eyJ1Ijoia29zc3RlbGxhIiwiYSI6ImNrbHl2cWIyMTE4MjYyb282cjRhaTF3MGQifQ.biyNx_wJAzyQuuXgP-4HOQ'

class Geolocation {
  constructor(selector, option = {}) {
    this.$box = document.querySelector(selector)
    this.$map = createElement('div', 'geolocation__map paper')

    this.map = null
    this.marker = null

    this.lng = option.lng || 0
    this.lat = option.lat || 0
    this.zoom = option.zoom || 8

    this.locale = option.locale || 'en'
  }

  init() {
    this.render()

    mapboxgl.accessToken = ACCESS_TOKEN
    this.map = new mapboxgl.Map({
      container: this.$map,
      style: 'mapbox://styles/mapbox/streets-v11',
      interactive: false,
      center: [this.lng, this.lat],
      zoom: this.zoom,
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.marker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map)

    this.map.on('load', () => {
      this.updateLocaleOnMap()
    })
  }

  setLngLat(lng, lat) {
    this.lng = lng
    this.lat = lat

    this.map.panTo([lng, lat])
    this.marker.setLngLat([lng, lat])

    this.$box
      .querySelector('.geolocation__coordinates')
      .textContent = `${this.lat} с.ш. ${this.lng} в.д`
  }

  setLocale(locale) {
    this.locale = locale
    this.updateLocaleOnMap()
  }

  updateLocaleOnMap() {
    this.map.getStyle().layers.forEach((layer) => {
      if (layer.id.indexOf('-label') > 0) {
        this.map.setLayoutProperty(
          layer.id,
          'text-field',
          ['get', `name_${this.locale}`],
        )
      }
    })
  }

  render() {
    this.$box.innerHTML = `
      <div class="geolocation__coordinates">${this.lat} ${S.lat[this.locale]}. ${this.lng} ${S.lng[this.locale]}</div>
    `
    this.$box.append(this.$map)
  }
}

export default Geolocation
