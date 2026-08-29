import { apiRequest } from "./api";


export function obtenerPropiedades() {

  return apiRequest(
    "/propiedades/"
  );

}

export function obtenerPropiedadesConMedia(){

  return apiRequest(
    "/propiedades/con_media/",
  );

}


export function obtenerPropiedadPorId(id) {

  return apiRequest(
    `/propiedades/${id}`
  );

}

export function obtenerPropiedadPorIdConMedia(id) {

  return apiRequest(
    `/propiedades/${id}/con_media`
  );

}


export function buscarPropiedades(filtros) {

  const params = new URLSearchParams();


  Object.entries(filtros)
    .forEach(([key,value]) => {

      if(value !== "" && value !== null){

        params.append(
          key,
          value
        );

      }

    });


  return apiRequest(
    `/propiedades/buscar?${params}`
  );

}


export function crearPropiedad(data){

  return apiRequest(
    "/propiedades/",
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function editarPropiedad(id,data){

  return apiRequest(
    `/propiedades/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarPropiedad(id){

  return apiRequest(
    `/propiedades/${id}`,
    {
      method:"DELETE"
    }
  );

}