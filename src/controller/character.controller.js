import { CharacterModel } from "../models/mysql/character.model.js"
import { validateChar, validatePartialChar } from "../schemas/character.js"

export class CharacterController {

    static async getAll (req, res) {
        const { power } = req.query
        
        const characters = await CharacterModel.getAll({ power })
        
        res.json(characters)
    }

    static async getById (req, res) {
        const { id } = req.params
        
        const char = await CharacterModel.getById({ id })
            
        if (char) {
            return res.json(char)
        } 
        else {
            res.status(404).json({ message: 'Character Not Found' })
        }
    }

    static async create (req, res) {
        const result = validateChar(req.body)
            
        if (result.error) {
            return res.status(400).json({ error: JSON.stringify(result.error.message) })
        }
        
        const newChar = await CharacterModel.create(result.data)  
            
        res.status(201).json({ newChar })
    }

    static async update (req, res) {
        const { id } = req.params
        console.log(req.body);
        const result = validatePartialChar(req.body)
        


        if (result.error) {
            return res.status(400).json({ error: JSON.stringify(result.error.message) })
        }
    
        const updateChar = await CharacterModel.update({id,input: result.data})
    
        return res.json(updateChar)
    }

    static async delete (req, res) {
        const { id } = req.params
    
        const result = await CharacterModel.delete(id)

        if (result === false) {
            return res.status(404).json({ message: 'Character Not Found' })
        }

        res.json({ message: 'Character Deleted' })
    }
}