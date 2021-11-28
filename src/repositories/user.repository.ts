import db from "../database/db";
import User from "../models/user.model";

class UserRepository {
    //Tipo de retorno da função: Array de objetos User
    async findAllUsers():  Promise<User[]> {
        const query = `select uuid, username from application_user`

        const res = await db.query<User>(query)
        const users = res.rows
        return users || [];
    }

    async findById(uuid: string): Promise<User>{

        const query = 'SELECT uuid, username from application_user where uuid = $1'
        const values = [ uuid ]
        const res = await db.query(query,values)
        const [ user ] = res.rows

        return user
    }
}



/**
 * Esta sendo exportado uma instancia para manter o padrão singleton (apenas uma instancia)
 */
export default new UserRepository();