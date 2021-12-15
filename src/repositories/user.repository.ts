import db from "../database/db";
import User from "../models/user.model";
import  DatabaseError from "./../models/errors/database.error.model";

class UserRepository {
    //Tipo de retorno da função: Array de objetos User
    async findAllUsers():  Promise<User[]> {
        const query = `select uuid, username from Usuario`

        const res = await db.query<User>(query)
        const users = res.rows
        return users || [];
    }

    async findById(uuid: string): Promise<User>{

        const query = 'SELECT uuid, username, email, user_type, profile_pic, profile_cover from Usuario where uuid = $1'
        const values = [ uuid ]
        const res = await db.query(query,values)
        const [ user ] = res.rows

        return user
    }

    async create(user: User): Promise<string> {
        
        const { username, password, email, reg_number, user_type } = user

        const query = `insert into Usuario(username, password, email, reg_number, user_type) values($1, crypt($2,'secret-hash'),$3,$4,$5) RETURNING uuid`

        const values = [username, password, email, reg_number, user_type]

        const { rows }  = await db.query<{uuid: string}>(query, values)

        const [ newUser ] = rows

        return newUser.uuid;

    }

    async update(user: User): Promise<void> {
        const { username, password, uuid } = user;

        const query = `update Usuario 
            set username = $1, password = crypt($2,'secret-hash') 
            where uuid = $3`

        const values = [username, password, uuid]
        db.query(query, values)
    }

    async remove(uuid: string): Promise<void>{

        try {

            const query = `
            delete from Usuario
            where uuid = $1
        `
        const values = [uuid]
        await db.query(query, values)

        } catch(err) {
            throw new DatabaseError("Não foi possivel excluir")
            console.log(err)
        }
    }

    async getUserByCredentials(email: string, password: string): Promise<User | null>{
        try {
            const query = `
            SELECT uuid, username, email, user_type FROM Usuario WHERE email=$1 AND password = crypt($2,'secret-hash');
        `
        const values = [email, password]

        const { rows } = await db.query<User>(query,values)
        const [user] = rows
        return !user? null: user;

        } catch(err) {
            throw new DatabaseError('Erro ao buscar usuario a partir das credenciais informadas' +  err)
        }
    }
}

/**
 * Esta sendo exportado uma instancia para manter o padrão singleton (apenas uma instancia)
 */
export default new UserRepository();