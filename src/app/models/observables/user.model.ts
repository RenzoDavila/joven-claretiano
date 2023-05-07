import { Permisos } from "./permisos.model";

export class User {
  codigo!:string;
  nombre!:string;
  password!:string;
  estado!:string;
  permisos!:Permisos;
}
