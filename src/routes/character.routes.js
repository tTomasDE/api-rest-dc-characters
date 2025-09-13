import { Router } from 'express'
import { CharacterController } from '../controller/character.controller.js'

export const characterRouter = Router()

characterRouter.get('/', CharacterController.getAll)
characterRouter.get('/:id', CharacterController.getById)
characterRouter.post('/', CharacterController.create)
characterRouter.patch('/:id', CharacterController.update)
characterRouter.delete('/:id', CharacterController.delete)