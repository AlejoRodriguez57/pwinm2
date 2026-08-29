import { apiRequest } from "./api";

// tipoPropiedad
export function obtenerTiposPropiedad(){

 return apiRequest(
   "/catalogos/tipos-propiedad/"
 );

}

export function crearTiposPropiedad(data){

  return apiRequest(
    `/catalogos/tipos-propiedad/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarTiposPropiedad(id){

  return apiRequest(
    `/catalogos/tipos-propiedad/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarTiposPropiedad(id, data){

  return apiRequest(
    `/catalogos/tipos-propiedad/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}

// Ubicaciones
export function obtenerUbicaciones(){

 return apiRequest(
   "/catalogos/ubicaciones/"
 );

}

export function crearUbicaciones(data){

  return apiRequest(
    `/catalogos/ubicaciones/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarUbicaciones(id){

  return apiRequest(
    `/catalogos/ubicaciones/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarUbicaciones(id, data){

  return apiRequest(
    `/catalogos/ubicaciones/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}

// Operaciones
export function obtenerOperaciones(){

 return apiRequest(
   "/catalogos/operaciones/"
 );

}

export function crearOperaciones(data){

  return apiRequest(
    `/catalogos/operaciones/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarOperaciones(id){

  return apiRequest(
    `/catalogos/operaciones/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarOperaciones(id, data){

  return apiRequest(
    `/catalogos/operaciones/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}

// Estado
export function obtenerEstados(){

 return apiRequest(
   "/catalogos/estados/"
 );

}

export function crearEstados(data){

  return apiRequest(
    `/catalogos/estados/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarEstados(id){

  return apiRequest(
    `/catalogos/estados/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarEstados(id, data){

  return apiRequest(
    `/catalogos/estados/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}

// tiposMedia
export function obtenerTiposMedia(){

 return apiRequest(
   "/catalogos/tipos-media/"
 );

}

export function crearTiposMedia(data){

  return apiRequest(
    `/catalogos/tipos-media/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}


export function eliminarTiposMedia(id){

  return apiRequest(
    `/catalogos/tipos-media/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarTiposMedia(id, data){

  return apiRequest(
    `/catalogos/tipos-media/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );

}

export function obtenerRoles(){

 return apiRequest(
   "/catalogos/roles/"
 );

}

