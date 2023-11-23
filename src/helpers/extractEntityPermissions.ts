import { EntitieAndPersmisionAsociated } from "../interfaces/entitieAndPersmisionAsociated";
import { Rol } from "../interfaces/rol";

export function extractEntityPermissions(roles:Rol[]) {
    const entityPermissions: EntitieAndPersmisionAsociated[] = [];
  
    roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        const [entity, access] = permission.split(":");
        const existingEntity = entityPermissions.find((item) => item.entity === entity);
  
        if (existingEntity) {
          if (!existingEntity.permissions.includes(access)) {
            existingEntity.permissions.push(access);
          }
        } else {
          entityPermissions.push({ entity, permissions: [access] });
        }
      });
    });
  
    return entityPermissions;
  }
  