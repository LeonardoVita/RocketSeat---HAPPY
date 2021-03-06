import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import MapIcon from '../utils/mapicon'
import mapMarkerImg from '../images/map-marker.svg'
import Api from '../services/api'

import '../styles/pages/orphanages-map.css'


interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}


export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = React.useState<Orphanage[]>([])


  React.useEffect(() => {

    async function fetchData() {

      const { data } = await Api.get('/orphanages')
      console.log(data)
      setOrphanages(data)
    }

    fetchData();
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Marcador Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Rio de Janeiro</strong>
          <span>rio de janeiro</span>
        </footer>
      </aside>

      <Map
        center={[-22.8744843, -43.3004858]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url=`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`/> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {
          orphanages.map((item) => {
            return (
              <Marker
                position={[item.latitude, item.longitude]}
                icon={MapIcon}
                key={item.id}
              >
                <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                  {item.name}
                  <Link to={`/orphanages/${item.id}`}>
                    <FiArrowRight size={20} color={"#fff"} />
                  </Link>
                </ Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage" >
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  )
}
