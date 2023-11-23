import { Rol } from "../interfaces/rol";

export const roles:Rol[] = [
  {
    id: "1",
    name: "Admin",
    permissions: ["PROJECT:WRITE", "STORE:READ", "ACCOUNT:READ_ACCESS"]
  },
  {
    id: "2",
    name: "Manager",
    permissions: ["PROJECT:READ", "STORE:WRITE", "ACCOUNT:WRITE_ACCESS"]
  },
  {
    id: "3",
    name: "Employee",
    permissions: ["PROJECT:READ", "STORE:READ", "ACCOUNT:READ"]
  },
  {
    id: "4",
    name: "Guest",
    permissions: ["PROJECT:READ", "STORE:READ", "LEVEL:READ"]
  },
  {
    id: "5",
    name: "SuperAdmin",
    permissions: ["PROJECT:WRITE", "STORE:WRITE", "ACCOUNT:READ_ACCESS", "LEVEL:READ_ACCESS"]
  }
];