import { Rol } from "../interfaces/rol";

export function obtenerArrayOfEntities(arr:Rol[]) {
    const primeraPalabraUnica = arr.flatMap(obj => obj.permissions.map(permiso => permiso.split(':')[0]));
  const permisosUnicos = [...new Set(primeraPalabraUnica)];
  return permisosUnicos;
  }