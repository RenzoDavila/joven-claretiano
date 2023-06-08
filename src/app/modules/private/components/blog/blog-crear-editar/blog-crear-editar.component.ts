import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { IBlogRequest } from '../../../data/requests/blog-request';
import { GeneralService } from '../../../services/general/general.service';
import { IBlogContentRequest } from '../../../data/requests/blog-content-request copy';
import { BlogCrudService } from '../../../services/blog-crud/blog-crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-crear-editar',
  templateUrl: './blog-crear-editar.component.html',
  styleUrls: ['./blog-crear-editar.component.sass']
})
export class BlogCrearEditarComponent {
  fd = new FormData();
  id: string | null;
  form: FormGroup;
  formModal: FormGroup;
  modal: boolean = false;
  multimediaSelected: boolean = false;
  multimedia: string | ArrayBuffer | null = null;
  file: File | undefined;
  files:any = [];
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
        file: ""
    }],
    tag: "",
    fecha: new Date(),
  };
  tags!:any [];
  disabledOnSubmit: boolean = false

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private blogCrudService: BlogCrudService,
    private generalService: GeneralService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,) {
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        tagSelect: ['645fd9bb7613ca2100243b13', Validators.required],
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
        multimediaPosition: ['', Validators.required],
        file: [''],
        multimedia: [''],
      });
      this.id = this.aRoute.snapshot.paramMap.get('id');
      this.fd = new FormData();
    }

  ngOnInit() {
    this.initialize();
    this.esEditar();
  }

  initialize(){
    this.getTags();
    this.fd = new FormData();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
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
    let file:any = this.file
    file.descriptionSelect = this.formModal.controls['descriptionSelect'].value
    this.files.push(file)

    const listFiltered = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect == this.formModal.controls['descriptionSelect'].value);

    this.imgsArray.map((img:any) => {
      if(img.descriptionSelect == this.formModal.controls['descriptionSelect'].value){
        img.descriptionSelect = this.formModal.controls['descriptionSelect'].value
        img.multimediaInput = this.formModal.controls['multimediaInput'].value
        img.position = this.formModal.controls['multimediaPosition'].value
        img.file = this.formModal.controls['file'].value
        img.multimedia = this.formModal.controls['multimedia'].value

      }
    });

    if(listFiltered.length == 0){
      this.imgsArray.push(this.formModal.value);
    }

    this.multimediaSelected = false;
    this.modal = false;
    this.blogRequest.files = this.files

    this.formModal.get('descriptionSelect')?.setValue("")
    this.formModal.get('multimediaInput')?.setValue("")
    this.formModal.get('file')?.setValue("")
    this.formModal.get('multimedia')?.setValue("")
    this.formModal.get('multimediaPosition')?.setValue("")

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
    this.files = this.files.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != description);
    this.blogRequest.files = this.files
  }

  onSubmit() {
    this.disabledOnSubmit = true
    let content: IBlogContentRequest = {};
    let arrayContent:any = [];
    let count = 1

    const description = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect === "description");

    content.description = count
    content.text = this.form.controls['description'].value
    content.file = ""
    content.multimediaPosition = ""
    content.multimediaType =  "N"

    if(description.length > 0){
      content.file = description[0].file
      content.multimediaPosition = description[0].multimediaPosition
      content.multimediaType =  "I"
    }
    arrayContent.push(content)

    for (let i = 1; i < 10; i++) {
      let obj:IBlogContentRequest = {}
      let desc = this.form.controls['description'+i].value;
      if(desc){
        count = count + 1
        obj.description = count
        obj.text = desc
        obj.file = ""
        obj.multimediaPosition = ""
        obj.multimediaType =  "N"

        this.imgsArray.map((img:any, index: any) => {
          if(img.descriptionSelect == 'description'+i){
            obj.file = img.file
            obj.multimediaPosition = img.multimediaPosition
            obj.multimediaType =  "I"
          }
        });

        arrayContent.push(obj)
      }

    }

    this.blogRequest.title = this.form.controls['titulo'].value
    this.blogRequest.views = 0
    this.blogRequest.content = arrayContent
    this.blogRequest.tag = this.form.controls['tagSelect'].value
    this.blogRequest.fecha = new Date()

    this.fd.append('title', this.form.controls['titulo'].value);
    this.fd.append('views', "0");
    this.fd.append('tag', this.form.controls['tagSelect'].value);
    this.fd.append('fecha', (new Date()).toString());


    let countContent = 0;
    arrayContent.map((content:any, index: any) => {
      this.fd.append(`content[${index}][description]`, content.description);
      this.fd.append(`content[${index}][text]`, content.text);
      this.fd.append(`content[${index}][multimediaType]`, content.multimediaType);
      this.fd.append(`content[${index}][multimediaPosition]`, content.multimediaPosition);
      if(content.file.descriptionSelect){
        this.fd.append(`content[${index}][file]`, `files${countContent}`);
        countContent = countContent + 1
      }else{
        this.fd.append(`content[${index}][file]`, ``);
      }
    });

    if (this.blogRequest.files) {
      this.blogRequest.files.sort((a:any, b:any) => {
        let fa = a.descriptionSelect!.toLowerCase(),
            fb = b.descriptionSelect!.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });

      for (let i = 0; i < this.blogRequest.files.length; i++) {
        this.fd.append(`files${i}`, this.blogRequest.files[i]);
        if(i+1 == this.blogRequest.files.length){
          this.blogCrudService.saveJugador(this.fd).subscribe(
            (data) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.success('Se a creado satisfactoriamente', `El blog "${data.blog.title}"`);
            },

            (error) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.error(error, 'Tenemos un problema');
            }
          );
        }
      }
    }else{
      this.blogCrudService.saveJugador(this.fd).subscribe(
        (data) => {
          this.router.navigateByUrl('/dashboard/blogs');
          this.toastr.success(data.message, `El blog "${data.blog.title}"`);
        },

        (error) => {
          console.log("error", error)
          this.router.navigateByUrl('/dashboard/blogs');
          this.toastr.error(error.error, 'Error');
        }
      );
    }

  }
}
