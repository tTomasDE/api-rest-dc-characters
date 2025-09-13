import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'charactersdc'
}

const connection = await mysql.createConnection(config)

export class CharacterModel {

    static async getAll ({ power }) {
        if (power) {
            const lowerCasePower = power.toLowerCase();
            
            const [powers] = await connection.query(
                `SELECT id, power FROM power WHERE LOWER(power) = ?;`,[lowerCasePower]
            )

            if (powers === 0){
                return []
            }

            const [{id}] = powers

            const [filtered] = await connection.query(
                `SELECT BIN_TO_UUID(c.id) as id, c.nameChar as name, c.realName as realName
                 FROM character_dc c
                 JOIN characterxpowers cxp
                 ON c.id = cxp.character_id
                 WHERE cxp.power_id = ?;`,[id]
            )

            return filtered;
        }

        const [characters] = await connection.query(
            `SELECT BIN_TO_UUID(c.id) as id, c.nameChar as name, c.realName as realName, GROUP_CONCAT(p.power) as power
             FROM character_dc c
             JOIN characterxpowers cxp
             ON c.id = cxp.character_id
             JOIN power p
             ON p.id = cxp.power_id
             GROUP BY id, name, realName`)
        
        const result = characters.map(char => ({
            ...char,
            power: char.power ? char.power.split(",") : []
        }))  
        return result;
    }

    static async getById ({ id }) {
       const [result] = await connection.query(
        'SELECT BIN_TO_UUID(id) as id, nameChar as name, realName FROM character_dc WHERE id = UUID_TO_BIN(?)',[id])

       return result;
    }

    static async create ({ input }) {
       const [result] = await connection.query(
        'INSERT INTO '
       )
    }

    static async delete ({ id }) {  
      await connection.query(`DELETE FROM character_dc WHERE id = UUID_TO_BIN(?)`,[{id}])
      return true;
    }

    static async update ({ id, input }) {
        
      const [result] = await connection.query(
        `UPDATE character_dc SET nameChar = ? WHERE id = UUID_TO_BIN(?)`,
        [input.name, id]
      )

      return result
    }
}