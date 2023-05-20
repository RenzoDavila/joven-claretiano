export class IBlogContentRequest {
  description?: number;
  text?: string;
  multimediaType?: string; //N=none I=imagen V=video
  multimediaPosition?: string; //F=full L=left R=right
  file?: any;
}
