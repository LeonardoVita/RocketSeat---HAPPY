import Leaflet from 'leaflet'

import mapMarkerImg from '../images/map-marker.svg'


const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [50, 58],
  iconAnchor: [25, 58],
  popupAnchor: [170, 12]
})

export default mapIcon;