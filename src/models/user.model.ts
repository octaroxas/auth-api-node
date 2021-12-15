type User = {
    uuid?: string;
    username: string;
    email?:string;
    password?: string;
    reg_number?:string;
    user_type?:number;
    profile_pic?:string; 
    profile_cover?:string;
}

export default User;