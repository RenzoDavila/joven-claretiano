import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { IBlogRequest } from '../../../data/requests/blog-request';
import { GeneralService } from '../../../services/general/general.service';

@Component({
  selector: 'app-blog-crear-editar',
  templateUrl: './blog-crear-editar.component.html',
  styleUrls: ['./blog-crear-editar.component.sass']
})
export class BlogCrearEditarComponent {
  id: string | null;
  form: FormGroup;
  formModal: FormGroup;
  modal: boolean = false;
  multimediaSelected: boolean = false;
  multimedia: string | ArrayBuffer | null = null;
  file: File | undefined;
  maxDescriptions: number = 9;
  descriptions: number = 0;
  imgsArray:any = [];
  blogRequest: IBlogRequest = {
    title: "",
    views:  0,
    content: [{
        description: 1,
        text: "",
        multimediaType: "", //N=none I=imagen V=video
        multimediaPosition: "", //F=full L=left R=right
        imagePath: ""
    }],
    tag: "",
    fecha: "",
  };
  tags!: [];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private generalService: GeneralService,
    private aRoute: ActivatedRoute,
    private router: Router) {
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        description: ['', Validators.required],
        description1: [''],
        description2: [''],
        description3: [''],
        description4: [''],
        description5: [''],
        description6: [''],
        description7: [''],
        description8: [''],
        description9: [''],
        required: [''],
      });
      this.formModal = this.fb.group({
        descriptionSelect: ['', Validators.required],
        multimediaInput: ['', Validators.required],
        file: [''],
        multimedia: [''],
      });
      this.id = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.initialize();
    this.esEditar();
  }

  initialize(){
    this.getTags();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
        console.log("tags", data)
        this.tags = data
      },

      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    this.esEditar();
    setTimeout(() => {
      document.getElementById("titulo")?.focus();
    }, 10);
  }

  onDelete(desc: string){
    this.descriptions = this.descriptions - 1
    this.imgsArray = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != desc);
    this.form.get(desc)?.clearValidators();
    this.form.get(desc)?.setValue("")
  }

  onAdd(){
    this.descriptions = this.descriptions + 1
    for (let index = 1; index <= this.descriptions; index++) {
      this.form.get('description'+index)?.addValidators(Validators.required);
    }
  }

  focus(){
    document.getElementById("description")?.focus();
    setTimeout(() => {
      document.getElementById("description"+this.descriptions)?.focus();
    }, 10);


  }

  esEditar() {
    if (this.id !== null) {
      this.blogService.getBlog(this.id).subscribe(
        (data) => {
          console.log("data", data)

          // this.form.get('titulo')?.setValue(0);

          this.form.setValue({
            titulo: 'XDXDXD',
            description: 'description1',
            description1: '',
            description2: '',
            description3: '',
            description4: '',
            description5: '',
            description6: '',
            description7: '',
            description8: '',
            description9: '',
            // fecha_inscripcion: Fecha.formatDate_yyyymmdd(dateTime.toISOString()),
          });

        },

        (error) => {
          console.log(error);
        }
      );
    }
  }

  onMultimediaSelected(event: any): void {
    this.multimedia = null
    this.file = undefined

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.multimedia = reader.result;
      reader.readAsDataURL(this.file);
      this.multimediaSelected = true;
    }
  }

  onMultimediaSave(){
    this.formModal.get('file')?.setValue(this.file)
    this.formModal.get('multimedia')?.setValue(this.multimedia)

    const listFiltered = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect == this.formModal.controls['descriptionSelect'].value);

    this.imgsArray.map((img:any) => {
      if(img.descriptionSelect == this.formModal.controls['descriptionSelect'].value){
        img.descriptionSelect = this.formModal.controls['descriptionSelect'].value
        img.multimediaInput = this.formModal.controls['multimediaInput'].value
        img.file = this.formModal.controls['file'].value
        img.multimedia = this.formModal.controls['multimedia'].value
      }
    });

    if(listFiltered.length == 0){
      this.imgsArray.push(this.formModal.value);
    }

    this.multimediaSelected = false;
    this.modal = false;

    this.formModal.get('descriptionSelect')?.setValue("")
    this.formModal.get('multimediaInput')?.setValue("")
    this.formModal.get('file')?.setValue("")
    this.formModal.get('multimedia')?.setValue("")

  }

  openModal(){
    this.modal = true
    setTimeout(() => {
      document.getElementById("descriptionSelect")?.focus();
    }, 50);
  }

  imageExist(description: string){
    const descFiltered = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect === description);
    if (descFiltered.length != 0) {
      return true;
    }else {
      return false;
    }
  }

  getImage(description: string){
    const descFiltered = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect === description);
    return descFiltered[0].multimedia;
  }

  dropImg(description: string){
    this.imgsArray = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != description);
  }

  onSubmit() {
    this.blogRequest.title = this.form.controls['titulo'].value
  }

}
