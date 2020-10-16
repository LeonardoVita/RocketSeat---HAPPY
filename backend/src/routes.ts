import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'


const routes = Router()
const upload = multer(uploadConfig)

// routes.get('/params/:route', (req, res) => {
//   console.log(req.query)
//   console.log(req.params)
//   console.log(req.body)
//   console.log(req.headers)
//   return res.json({ name: "leonardo vita", city: "Rio de Janeiro" })
// })

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

export default routes