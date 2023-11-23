import { EntitieAndPersmisionAsociated } from "../interfaces/entitieAndPersmisionAsociated";

export function addPermissions(entity: string, permission: string, entidades: EntitieAndPersmisionAsociated[]) {
    // Buscar la entidad en el array
    const entidadExistente = entidades.find(entidad => entidad.entity === entity);
  
    if (entidadExistente) {
      // Si la entidad ya existe, añadir el permiso al array de permisos
      if (!entidadExistente.permissions.includes(permission)) {
        entidadExistente.permissions.push(permission);
      }
    } else {
      // Si la entidad no existe, crear una nueva entidad y añadir el permiso
      const nuevaEntidad: EntitieAndPersmisionAsociated = {
        entity: entity,
        permissions: [permission]
      };
      entidades.push(nuevaEntidad);
    }
  
    // Retornar el arreglo con las modificaciones
    return entidades;
  }
  
  
  