import { IBlogContentRequest } from "./blog-content-request copy";

export class IBlogRequest {
  title?:string;
  views?:number;
  content?: [IBlogContentRequest];
  tag?: string;
  fecha?: string;
}
