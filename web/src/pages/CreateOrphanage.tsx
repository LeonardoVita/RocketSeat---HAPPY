import React, { ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import MapIcon from '../utils/mapicon'

import '../styles/pages/create-orphanage.css';
import api from "../services/api";


export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });

  const [name, setName] = React.useState('')
  const [about, setAbout] = React.useState('')
  const [instructions, setInstructions] = React.useState('')
  const [opening_hours, setOpeningHours] = React.useState('')
  const [open_on_weekends, setOpenOnWeekends] = React.useState(true)
  const [images, setImages] = React.useState<File[]>([])
  const [previewImages, setPreviewImages] = React.useState<string[]>([])

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files)
      return;

    const selectedImg = Array.from(e.target.files)

    setImages(selectedImg)

    const selectedImgPreview = selectedImg.map(image => {
      return (
        URL.createObjectURL(image)
      )
    })

    setPreviewImages(selectedImgPreview)
  }
  function handleMapClick(event: LeafletMouseEvent) {

    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    console.log({
      position,
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    })

    const res = await api.post('/orphanages', data)

    alert('Cadastro Realizado com sucesso!')
    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={e => handleSubmit(e)} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-22.8744843, -43.3004858]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 && <Marker interactive={false} icon={MapIcon} position={[position.latitude, position.longitude]} />
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <img key={image} src={image} alt={name} />
                    )
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={e => handleSelectImages(e)} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;