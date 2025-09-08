/* eslint-disable no-undef */
import express from 'express'
import { characters } from '../src/db/characters-dc.js'
import { validateChar, validatePartialChar } from './schemas/character.js'
import cors from 'cors'

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.json('Hola a todos')
})

app.get('/characters', (req, res) => {
  const { power } = req.query
  if (power) {
    const filteredChars = characters.filter((char) => char.power.some(pow => pow.toLowerCase() === power.toLowerCase()))
    return res.json(filteredChars)
  }
  res.json(characters)
})

app.get('/characters/:id', (req, res) => {
  const { id } = req.params
  const char = characters.find(ch => ch.id === id)
  if (char) {
    return res.json(char)
  } else {
    res.status(404).json({ message: 'Character Not Found' })
  }
})

app.post('/characters', (req, res) => {
  const result = validateChar(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.stringify(result.error.message) })
  }

  const newChar = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // solo en memoria

  characters.push(newChar)

  res.status(201).json({ newChar })
})

app.patch('/characters/:id', (req, res) => {
  const { id } = req.params

  const result = validatePartialChar(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.stringify(result.error.message) })
  }

  const charIndex = characters.findIndex((char) => char.id === id)

  if (charIndex === -1) {
    return res.status(404).json({ message: 'Character Not Found' })
  }

  const updateChar = {
    ...characters[charIndex],
    ...result.data
  }
  characters[charIndex] = updateChar

  return res.json(updateChar)
})

app.delete('/characters/:id', (req, res) => {
  const { id } = req.params

  const charIndex = characters.findIndex((char) => char.id === id)

  if (charIndex < 0) {
    return res.status(400).json({ message: 'Character not found' })
  }

  characters.splice(charIndex, 1)

  res.json({ message: 'Character Deleted' })
})

app.put('/characters/:id', (req, res) => {
  const { id } = req.params

  const result = validateChar(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.stringify(result.error) })
  }

  const charIndex = characters.findIndex((char) => char.id === id)

  if (charIndex < 0) {
    return res.status(404).json({ message: 'Character Not Found' })
  }

  const newChar = {
    id,
    ...result.data
  }

  characters[charIndex] = newChar

  return res.status(200).json({ newChar })
})
