import { EntitieAndPersmisionAsociated } from "../interfaces/entitieAndPersmisionAsociated";

export function filtrarPermisosPorEntidad(entityName: string, entidades: EntitieAndPersmisionAsociated[]) {
  const permisosFiltrados: string[] = [];

  // Iterar sobre las entidades y buscar los permisos asociados a la entidad específica
  entidades.forEach(entidad => {
    if (entidad.entity === entityName) {
      permisosFiltrados.push(...entidad.permissions);
    }
  });

  // Eliminar duplicados y retornar los permisos filtrados
  return permisosFiltrados;
}

