import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/modules/public/services/blog/blog.service';
import { IBlogRequest } from '../../../data/requests/blog-request';
import { GeneralService } from '../../../services/general/general.service';
import { IBlogContentRequest } from '../../../data/requests/blog-content-request copy';
import { BlogCrudService } from '../../../services/blog-crud/blog-crud.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

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
  disabledOnSubmit: boolean = false;
  urlServer = environment.server;

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
        descPath: [''],
        descPathPosition: [''],
        descPathType: ['N'],
        description1: [''],
        descPath1: [''],
        descPathPosition1: [''],
        descPathType1: ['N'],
        description2: [''],
        descPath2: [''],
        descPathPosition2: [''],
        descPathType2: ['N'],
        description3: [''],
        descPath3: [''],
        descPathPosition3: [''],
        descPathType3: ['N'],
        description4: [''],
        descPath4: [''],
        descPathPosition4: [''],
        descPathType4: ['N'],
        description5: [''],
        descPath5: [''],
        descPathPosition5: [''],
        descPathType5: ['N'],
        description6: [''],
        descPath6: [''],
        descPathPosition6: [''],
        descPathType6: ['N'],
        description7: [''],
        descPath7: [''],
        descPathPosition7: [''],
        descPathType7: ['N'],
        description8: [''],
        descPath8: [''],
        descPathPosition8: [''],
        descPathType8: ['N'],
        description9: [''],
        descPath9: [''],
        descPathPosition9: [''],
        descPathType9: ['N'],
        dateCreated: [''],
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
  }

  initialize(){
    this.getTags();
    this.fd = new FormData();
  }

  getTags(){
    this.generalService.getTags().subscribe(
      (data) => {
        console.log("data", data)
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

  onDelete(desc: string, descPath: string){
    this.descriptions = this.descriptions - 1
    this.imgsArray = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != desc);
    this.form.get(desc)?.clearValidators();
    this.form.get(desc)?.setValue('');
    this.form.get(descPath)?.setValue('');
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
          this.form.setValue({
            titulo: data.title,
            tagSelect: data.tag,
            description: "",
            description1: "",
            description2: "",
            description3: "",
            description4: "",
            description5: "",
            description6: "",
            description7: "",
            description8: "",
            description9: "",
            descPath: "",
            descPath1: "",
            descPath2: "",
            descPath3: "",
            descPath4: "",
            descPath5: "",
            descPath6: "",
            descPath7: "",
            descPath8: "",
            descPath9: "",
            descPathPosition: "",
            descPathPosition1: "",
            descPathPosition2: "",
            descPathPosition3: "",
            descPathPosition4: "",
            descPathPosition5: "",
            descPathPosition6: "",
            descPathPosition7: "",
            descPathPosition8: "",
            descPathPosition9: "",
            descPathType: "N",
            descPathType1: "N",
            descPathType2: "N",
            descPathType3: "N",
            descPathType4: "N",
            descPathType5: "N",
            descPathType6: "N",
            descPathType7: "N",
            descPathType8: "N",
            descPathType9: "N",
            dateCreated: [''],
          });

          if(data.content[0]){
            this.form.get("description")?.setValue(data.content[0].text);
            if(data.content[0].imagePath) {
              this.form.get("descPath")?.setValue(data.content[0].imagePath);
              this.form.get("descPathPosition")?.setValue(data.content[0].multimediaPosition);
              this.form.get("descPathType")?.setValue(data.content[0].multimediaType);
            }
          };

          if(data.content[1]){
            this.form.get("description1")?.setValue(data.content[1].text);
            if(data.content[1].imagePath) {
              this.form.get("descPath1")?.setValue(data.content[1].imagePath);
              this.form.get("descPathPosition1")?.setValue(data.content[1].multimediaPosition);
              this.form.get("descPathType1")?.setValue(data.content[1].multimediaType);
            }
          };

          if(data.content[2]){
            this.form.get("description2")?.setValue(data.content[2].text);
            if(data.content[2].imagePath) {
              this.form.get("descPath2")?.setValue(data.content[2].imagePath);
              this.form.get("descPathPosition2")?.setValue(data.content[2].multimediaPosition);
              this.form.get("descPathType2")?.setValue(data.content[2].multimediaType);
            }
          };

          if(data.content[3]){
            this.form.get("description3")?.setValue(data.content[3].text);
            if(data.content[3].imagePath) {
              this.form.get("descPath3")?.setValue(data.content[3].imagePath);
              this.form.get("descPathPosition3")?.setValue(data.content[3].multimediaPosition);
              this.form.get("descPathType3")?.setValue(data.content[3].multimediaType);
            }
          };

          if(data.content[4]){
            this.form.get("description4")?.setValue(data.content[4].text);
            if(data.content[4].imagePath) {
              this.form.get("descPath4")?.setValue(data.content[4].imagePath);
              this.form.get("descPathPosition4")?.setValue(data.content[4].multimediaPosition);
              this.form.get("descPathType4")?.setValue(data.content[4].multimediaType);
            }
          };

          if(data.content[5]){
            this.form.get("description5")?.setValue(data.content[5].text);
            if(data.content[5].imagePath) {
              this.form.get("descPath5")?.setValue(data.content[5].imagePath);
              this.form.get("descPathPosition5")?.setValue(data.content[5].multimediaPosition);
              this.form.get("descPathType5")?.setValue(data.content[5].multimediaType);
            }
          };

          if(data.content[6]){
            this.form.get("description6")?.setValue(data.content[6].text);
            if(data.content[6].imagePath) {
              this.form.get("descPath6")?.setValue(data.content[6].imagePath);
              this.form.get("descPathPosition6")?.setValue(data.content[6].multimediaPosition);
              this.form.get("descPathType6")?.setValue(data.content[6].multimediaType);
            }
          };

          if(data.content[7]){
            this.form.get("description7")?.setValue(data.content[7].text);
            if(data.content[7].imagePath) {
              this.form.get("descPath7")?.setValue(data.content[7].imagePath);
              this.form.get("descPathPosition7")?.setValue(data.content[7].multimediaPosition);
              this.form.get("descPathType7")?.setValue(data.content[7].multimediaType);
            }
          };

          if(data.content[8]){
            this.form.get("description8")?.setValue(data.content[8].text);
            if(data.content[8].imagePath) {
              this.form.get("descPath8")?.setValue(data.content[8].imagePath);
              this.form.get("descPathPosition8")?.setValue(data.content[8].multimediaPosition);
              this.form.get("descPathType8")?.setValue(data.content[8].multimediaType);
            }
          };

          if(data.content[9]){
            this.form.get("description9")?.setValue(data.content[9].text);
            if(data.content[9].imagePath) {
              this.form.get("descPath9")?.setValue(data.content[9].imagePath);
              this.form.get("descPathPosition9")?.setValue(data.content[9].multimediaPosition);
              this.form.get("descPathType9")?.setValue(data.content[9].multimediaType);
            }
          };

          this.form.get("dateCreated")?.setValue(data.dateCreated);
          this.descriptions = data.content.length - 1;

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

  getImage(description: string, descPath: string){
    this.form.get(descPath)?.setValue('');
    const descFiltered = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect === description);
    return descFiltered[0].multimedia;
  }

  dropImg(description: string){
    this.imgsArray = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != description);
    this.files = this.files.filter((t: { descriptionSelect: string; }) => t.descriptionSelect != description);
    this.blogRequest.files = this.files;
  }

  dropImgPath(num: string){
    this.form.get("descPath" + num)?.setValue('');
    this.form.get("descPathPosition" + num)?.setValue('');
    this.form.get("descPathType" + num)?.setValue('N');
  }

  onSubmit() {
    this.disabledOnSubmit = true
    let content: IBlogContentRequest = {};
    let arrayContent:any = [];
    let count = 1

    const description = this.imgsArray.filter((t: { descriptionSelect: string; }) => t.descriptionSelect === "description");

    content.description = count
    content.text = this.form.controls['description'].value
    content.descPath = this.form.controls['descPath'].value
    content.file = ""
    content.multimediaPosition = this.form.controls['descPathPosition'].value
    content.multimediaType =  this.form.controls['descPathType'].value

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
        obj.descPath = this.form.controls['descPath'+i].value;
        obj.file = ""
        obj.multimediaPosition = this.form.controls['descPathPosition'+i].value;
        obj.multimediaType =  this.form.controls['descPathType'+i].value;

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
    if(this.id !== null){
      this.fd.append('dateEdited', (new Date()).toString());
      this.fd.append('dateCreated', this.form.controls['dateCreated'].value);
      this.fd.append('state', "E");
    }else{
      this.fd.append('dateEdited', (new Date()).toString());
      this.fd.append('dateCreated', (new Date()).toString());
      // this.fd.append('dateEdited', (moment(new Date()).add(2, 'd')).toString());
      // this.fd.append('dateCreated', (moment(new Date()).add(2, 'd')).toString());
      // this.fd.append('dateEdited', (moment(new Date()).subtract(1, 'd')).toString());
      // this.fd.append('dateCreated', (moment(new Date()).subtract(1, 'd')).toString());
      this.fd.append('state', "C");
    }


    let countContent = 0;
    arrayContent.map((content:any, index: any) => {
      this.fd.append(`content[${index}][description]`, content.description);
      this.fd.append(`content[${index}][text]`, content.text);
      this.fd.append(`content[${index}][multimediaType]`, content.multimediaType);
      this.fd.append(`content[${index}][multimediaPosition]`, content.multimediaPosition);
      this.fd.append(`content[${index}][descPath]`, content.descPath);
      if(content.file.descriptionSelect){
        this.fd.append(`content[${index}][file]`, `files${countContent}`);
        countContent = countContent + 1
      }else{
        this.fd.append(`content[${index}][file]`, ``);
      }
    });

    if(this.blogRequest.files){
      if ((this.blogRequest.files).length != 0) {
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
            if(this.id !== null){
              this.blogCrudService.editBlog(this.id, this.fd).subscribe(
                (data) => {
                  this.router.navigateByUrl('/dashboard/blogs');
                  this.toastr.success('Se ha creado satisfactoriamente', `El blog "${data.blog.title}"`);
                },

                (error) => {
                  this.router.navigateByUrl('/dashboard/blogs');
                  this.toastr.error(error, 'Tenemos un problema');
                }
              );
            }else{
              this.blogCrudService.saveBlog(this.fd).subscribe(
                (data) => {
                  this.router.navigateByUrl('/dashboard/blogs');
                  this.toastr.success('Se ha creado satisfactoriamente', `El blog "${data.blog.title}"`);
                },

                (error) => {
                  this.router.navigateByUrl('/dashboard/blogs');
                  this.toastr.error(error, 'Tenemos un problema');
                }
              );
            }
          }
        }
      }else{
        if(this.id !== null){
          this.blogCrudService.editBlog(this.id, this.fd).subscribe(
            (data) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.success(data.message, `El blog "${data.blog.title}"`);
            },

            (error) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.error(error.error, 'Error');
            }
          );
        }else{
          this.blogCrudService.saveBlog(this.fd).subscribe(
            (data) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.success(data.message, `El blog "${data.blog.title}"`);
            },

            (error) => {
              this.router.navigateByUrl('/dashboard/blogs');
              this.toastr.error(error.error, 'Error');
            }
          );
        }
      }
    }else{
      if(this.id !== null){
        this.blogCrudService.editBlog(this.id, this.fd).subscribe(
          (data) => {
            this.router.navigateByUrl('/dashboard/blogs');
            this.toastr.success(data.message, `El blog "${data.blog.title}"`);
          },

          (error) => {
            this.router.navigateByUrl('/dashboard/blogs');
            this.toastr.error(error.error, 'Error');
          }
        );
      }else{
        this.blogCrudService.saveBlog(this.fd).subscribe(
          (data) => {
            this.router.navigateByUrl('/dashboard/blogs');
            this.toastr.success(data.message, `El blog "${data.blog.title}"`);
          },

          (error) => {
            this.router.navigateByUrl('/dashboard/blogs');
            this.toastr.error(error.error, 'Error');
          }
        );
      }
    }

  }
}
