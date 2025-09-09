import { characters } from "../../../db/characters-dc.js";

export class CharacterModel {

    static async getAll ({ power }) {
        if (power) {
            const filteredChars = characters.filter((char) => char.power.some(pow => pow.toLowerCase() === power.toLowerCase()))
            return filteredChars;
        }
        return characters;
    }

    static async getById ({ id }) {
        const char = characters.find(ch => ch.id === id)
        return char;
    }

    static async create ({ input }) {
        const newChar = {
            id: crypto.randomUUID(),
            ...input
        }
        characters.push(newChar)
        return newChar;
    }

    static async delete ({ id }) {
        const charIndex = characters.findIndex((char) => char.id === id)
    
        characters.splice(charIndex, 1)

        return true;
    }

    static async update ({ id, input }) {
        const charIndex = characters.findIndex((char) => char.id === id)
        if (charIndex < 0) {
            return false;
        }
        characters[charIndex] = {
            ...characters[charIndex],
            ...input
        }
        
        return characters[charIndex];
    }
}