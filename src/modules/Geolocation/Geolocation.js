import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { createElement } from '../../utils/index'
import S from '../../values/strings'

import './Geolocation.css'

const ACCESS_TOKEN = 'pk.eyJ1Ijoia29zc3RlbGxhIiwiYSI6ImNrbHl2cWIyMTE4MjYyb282cjRhaTF3MGQifQ.biyNx_wJAzyQuuXgP-4HOQ'

class Geolocation {
  constructor(selector) {
    this.$box = document.querySelector(selector)
    this.$map = createElement('div', 'geolocation__map')

    this.map = null
    this.marker = null
  }

  initMap(lng, lat, locale) {
    mapboxgl.accessToken = ACCESS_TOKEN
    this.map = new mapboxgl.Map({
      container: this.$map,
      style: 'mapbox://styles/mapbox/streets-v11',
      interactive: false,
      center: [lng, lat],
      zoom: this.zoom,
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map)

    this.map.on('load', () => {
      this.updateLocaleOnMap(locale)
    })
  }

  setLngLat(lng, lat, locale) {
    this.map.panTo([lng, lat])
    this.marker.setLngLat([lng, lat])

    this.$box
      .querySelector('.geolocation__coordinates')
      .textContent = `${lat} ${S.lat[locale]}. ${lng} ${S.lng[locale]}`
  }

  updateLocaleOnMap(locale) {
    this.map.getStyle().layers.forEach((layer) => {
      if (layer.id.indexOf('-label') > 0) {
        this.map.setLayoutProperty(
          layer.id,
          'text-field',
          ['get', `name_${locale}`],
        )
      }
    })
  }

  render(props) {
    this.$box.innerHTML = `
      <div class="geolocation__coordinates">${props.lat} ${S.lat[props.locale]}. ${props.lng} ${S.lng[props.locale]}</div>
    `
    this.$box.append(this.$map)

    if (!this.map) {
      this.initMap(props.lng, props.lat, props.locale)
    } else {
      this.setLngLat(props.lng, props.lat, props.locale)
      this.updateLocaleOnMap(props.locale)
    }
  }
}

export default Geolocation
