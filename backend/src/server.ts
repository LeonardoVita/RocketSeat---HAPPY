import express from 'express'
import path from 'path'
import cors from 'cors'

import 'express-async-errors'

import './database/connection'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)

/*
  3 formas de usar o banco de dados no api
  Driver Nativo: sqlite.query(SELECT * FROM USERS)
  query builder: usando o Knex.js knex('users').select('*').where('name','Diego'))
  ORM (Object Relational Mapping): Mapea o banco de dados pra classes em js
*/





