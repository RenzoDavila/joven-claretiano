import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/modules/public/services/tag/tag.service';
import { TagCrudService } from '../../../services/tag-crud/tag-crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tag-crear-editar',
  templateUrl: './tag-crear-editar.component.html',
  styleUrls: ['./tag-crear-editar.component.sass']
})
export class TagCrearEditarComponent {
  fd = new FormData();
  id: string | null;
  form: FormGroup;
  eye: boolean = false;
  disabledOnSubmit: boolean = false;
  readOnlyFlags:any = {} ;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private tagService: TagService,
    private tagCrudService: TagCrudService,
    private router: Router,
    private toastr: ToastrService,
    ){
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      color: [''],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.esEditar();
  }

  onSubmit() {
    let color:any = document.getElementById("color");
    this.form.get('color')?.setValue(color.value);
    if (this.id !== null) {
      this.tagCrudService.editTag(this.id, this.form.value).subscribe(
        (data) => {
          console.log("editado", data.body);
          // this.toastr.success(`Usuario: "${data.body.codigo}"`, data.message);
          this.router.navigateByUrl('/dashboard/tags');
        },
        (error) => {
          this.toastr.error(error, 'Tenemos un problema');
          this.router.navigateByUrl('/dashboard/tags');
        }
      );
    }
    else{
      this.tagCrudService.saveTag(this.form.value).subscribe(
        (data) => {
          console.log("creado", data.body);
          // this.toastr.success(`Usuario: "${data.body.codigo}"`, data.message);
          this.router.navigateByUrl('/dashboard/tags');
        },
        (error) => {
          this.toastr.error(error, 'Tenemos un problema');
          this.router.navigateByUrl('/dashboard/tags');
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.tagService.getTag(this.id).subscribe(
        (data) => {
          this.form.setValue({
            title: data.title,
            description: data.description,
            color: data.color,
          });
          let s:any = document.getElementById('color');
          s!.value = data.color
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
