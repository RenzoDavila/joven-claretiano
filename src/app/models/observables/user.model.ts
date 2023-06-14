import { Permisos } from "./permisos.model";

export class User {
  codigo!:string;
  nombre!:string;
  password!:string;
  estado!:string;
  ver!:boolean;
  crear!:boolean;
  editar!:boolean;
  eliminar!:boolean;
  // permisos!:Permisos;
}
