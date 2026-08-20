import { apiRequest } from "./api";

export function obtenerMedia(){

  return apiRequest(
    `/media/`
  );

}

export function obtenerMediaPropiedad(id){

  return apiRequest(
    `/media/propiedad${id}`
  );

}


export function crearMedia(data){

  return apiRequest(
    "/media/",
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarMedia(id){

  return apiRequest(
    `/media/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarMedia(id, data){

  return apiRequest(
    `/media/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}