import { apiRequest } from "./api";


export function login(datos){

 return apiRequest(
   "/auth/login",
   {
    method:"POST",
    body:JSON.stringify(datos)
   }
 );

}

export function autenticacion(datos){

 return apiRequest(
   "/auth/verify",
   {
    method:"POST",
    body:JSON.stringify(datos)
   }
 );

}

export function usuarioActual(){

 return apiRequest(
   "/auth/me"
 );

}

export function logout() {

    localStorage.removeItem(
        "access_token"
    );
}