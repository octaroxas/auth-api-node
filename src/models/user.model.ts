type User = {
    id?: string;
    name: string;
    email?:string;
    passwrd?: string;
    description_text:string;
    reg_number?:string;
    user_type?:number;
    profile_pic?:string; 
    profile_cover?:string;
}

export default User;