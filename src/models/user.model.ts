type User = {
    uuid?: string;
    username: string;
    email?:string;
    password?: string;
    reg_number?:string;
    user_type?:number
}

export default User;