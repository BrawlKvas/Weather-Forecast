import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { createElement } from '../../utils/index'
import S from '../../values/strings'
import connect from './Geolocation.connect'

import './Geolocation.css'

const ACCESS_TOKEN = 'pk.eyJ1Ijoia29zc3RlbGxhIiwiYSI6ImNrbHl2cWIyMTE4MjYyb282cjRhaTF3MGQifQ.biyNx_wJAzyQuuXgP-4HOQ'

function Geolocation(selector) {
  const $box = document.querySelector(selector)
  const $map = createElement('div', 'geolocation__map')

  let map = null
  let marker = null

  function setLngLat(lng, lat, locale) {
    map.panTo([lng, lat])
    marker.setLngLat([lng, lat])

    $box
      .querySelector('.geolocation__coordinates')
      .textContent = `${parseFloat(lat).toFixed(2)} ${S.lat[locale]}. ${parseFloat(lng).toFixed(2)} ${S.lng[locale]}`
  }

  function updateLocaleOnMap(locale) {
    if (!map.style.stylesheet) { return }

    map.getStyle().layers.forEach((layer) => {
      if (layer.id.indexOf('-label') > 0) {
        map.setLayoutProperty(
          layer.id,
          'text-field',
          ['get', `name_${locale}`],
        )
      }
    })
  }

  function initMap(lng, lat, locale) {
    mapboxgl.accessToken = ACCESS_TOKEN

    map = new mapboxgl.Map({
      container: $map,
      style: 'mapbox://styles/mapbox/streets-v11',
      interactive: false,
      center: [lng, lat],
      zoom: 8,
    })

    map.addControl(new mapboxgl.NavigationControl())

    marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map)

    map.on('load', () => {
      updateLocaleOnMap(locale)
    })
  }

  return ({ lat, lng, locale }) => {
    $box.innerHTML = `
      <div class="geolocation__coordinates">
        ${parseFloat(lat).toFixed(2)} ${S.lat[locale]}. ${parseFloat(lng).toFixed(2)} ${S.lng[locale]}
      </div>
    `
    $box.append($map)

    if (map === null) {
      initMap(lng, lat, locale)
    } else {
      setLngLat(lng, lat, locale)
      updateLocaleOnMap(locale)
    }
  }
}

export default connect(Geolocation)
