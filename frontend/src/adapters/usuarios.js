import { apiRequest } from "./api";


export function obtenerUsuarios(){

 return apiRequest(
   "/usuarios/"
  );

}

export function obtenerUsuariosPorId(id){

 return apiRequest(
   `/usuarios/${id}`,
          {
      method:"get"
    }
 );

}

export function crearUsuarios(data){

  return apiRequest(
    `/usuarios/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}

export function eliminarUsuarios(id){

  return apiRequest(
    `/usuarios/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarUsuarios(id, data){

  return apiRequest(
    `/usuarios/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );
}
