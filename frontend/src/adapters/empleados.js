import { apiRequest } from "./api";


export function obtenerEmpleados(){

 return apiRequest(
   "/empleados/"
  );

}

export function obtenerEmpleadoPorId(id){

 return apiRequest(
   `/empleados/${id}`,
          {
      method:"get"
    }
 );

}

export function crearEmpleado(data){

  return apiRequest(
    `/empleados/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}

export function eliminarEmpleado(id){

  return apiRequest(
    `/empleados/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarEmpleado(id, data){

  return apiRequest(
    `/empleados/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );
}

export function obtenerEmpleadoPorPropiedad(id){

  return apiRequest(
    `/empleados/ArticuloPropiedadEmpleado/${id}`,
        {
          method:"get"
        }
  );
}

export function obtenerEmpleadoYUsuario() {
    return apiRequest(
        `/empleados/empleadoYUsuario/`
    );
}

export function crearEmpleadoYUsuario(data) {
    return apiRequest(
        `/empleados/empleadoYUsuario/`,
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );
}

export function eliminarEmpleadosYUsuario(id) {
    return apiRequest(
        `/empleados/empleadoYUsuario/${id}`,
        {
            method: "DELETE"
        }
    );
}

export function editarEmpleadosYUsuario(id, data) {
    return apiRequest(
        `/empleados/empleadoYUsuario/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data)
        }
    );
}