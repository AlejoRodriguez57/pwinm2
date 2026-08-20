import { apiRequest } from "./api";


export function obtenerEmpleados(){

 return apiRequest(
   "/empleados/"
  );

}

export function obtenerEmpleadosPorId(id){

 return apiRequest(
   `/empleados/${id}`,
          {
      method:"get"
    }
 );

}

export function crearEmpleados(data){

  return apiRequest(
    `/empleados/`,
    {
      method:"POST",
      body:JSON.stringify(data)
    }
  );

}

export function eliminarEmpleados(id){

  return apiRequest(
    `/empleados/${id}`,
    {
      method:"DELETE"
    }
  );

}

export function editarEmpleados(id, data){

  return apiRequest(
    `/empleados/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(data)
    }
  );
}

export function obtenerEmpleadoPorPropiedad(id) {
  return apiRequest(
    `/empleados/ArticuloPropiedadAsesor/${id}`,
    {
      method: "GET",
    }
  );
}