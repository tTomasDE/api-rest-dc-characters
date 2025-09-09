import express from 'express'
import cors from 'cors'
import { characterRouter } from '../src/routes/characters.js'

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.use('/characters', characterRouter)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})