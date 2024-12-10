import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

// falta el CORS PRE-Flight
// crear header OPTIONS

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

// metodo declarativo que equivale a => app.use(express.json())
/*
app.use((req, res, next) => {
   if (req.method !== 'POST') return next()
   if (req.headers['content-type'] !== 'application/json') return next()

   // solo llegan request que son POST y que tienen el header Content-Type: application/json
   let body = ''

   // escuchar el evento data
   req.on('data', chunk => {
     body += chunk.toString()
   })

   req.on('end', () => {
     const data = JSON.parse(body)
     data.timestamp = Date.now()
     // mutar la request y meter la información en el req.body
     req.body = data
     next()
   })
 })

*/
