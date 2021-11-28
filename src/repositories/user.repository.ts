import User from "../models/user.model";

class UserRepository {
    //Tipo de retorno da função: Array de objetos User
    findAllUsers():  User[] {
        return [];
    }

}



/**
 * Esta sendo exportado uma instancia para manter o padrão singleton (apenas uma instancia)
 */
export default new UserRepository();