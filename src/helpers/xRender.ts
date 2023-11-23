export function checkPermission(entity: string, permiso: string, data: any[], rolName: string): boolean {
  // Verificar si roles es un array válido
  if (!Array.isArray(data)) {
    return false;
  }

  // Buscar el rol específico por nombre
  const role = data.find((role) => role.name === rolName);
  if (!role) {
    return false;
  }

  // Verificar si el permiso existe en el rol
  const permission = `${entity}:${permiso}`;
  return role.permissions.includes(permission);
}