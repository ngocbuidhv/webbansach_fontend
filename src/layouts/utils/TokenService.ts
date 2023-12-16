import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem('token');
interface JwtPayload{
    sub: string
    idUser: string;
  }

export function daDangNhap() {
    if(token){
        return true;
    }else{
        return false;
    }
}
export function getIdUser(){
    if(token){
        const data = jwtDecode(token) as JwtPayload;
       return data.idUser;
    }
}
export function getUserName(){
    if(token){
        const data = jwtDecode(token) as JwtPayload;
        return data.sub;
    }
}