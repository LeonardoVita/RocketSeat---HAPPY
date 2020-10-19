import React from "react";
import { useParams } from 'react-router-dom'
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
// import { FaWhatsapp } from "react-icons/fa";

import MapIcon from '../utils/mapicon'
import Api from '../services/api'


import Sidebar from '../components/Sidebar'
import '../styles/pages/orphanage.css';

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: string
  images: Array<{
    url: string,
    id: number
  }>

}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {

  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = React.useState<Orphanage>()
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)


  React.useEffect(() => {

    async function fetchData() {

      const { data } = await Api.get(`/orphanages/${params.id}`)
      console.log(data)
      setOrphanage(data)
    }

    fetchData();
  }, [params.id])

  if (orphanage === undefined) {
    console.log('entrou')
    return <h1>Carregando...</h1>
  }

  return (
    <div id="page-orphanage">

      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {
              orphanage.images.map((image, index) => {
                return (
                  <button
                    className={activeImageIndex === index ? 'active' : ''}
                    type="button"
                    key={image.id}
                    onClick={(() => setActiveImageIndex(index))}
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </button>
                )
              })
            }
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={MapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends close-on-weekends">
                    <FiInfo size={32} color="#ff6690" />
                não atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}