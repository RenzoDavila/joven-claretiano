import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/public/services/user/user.service';
import { UserCrudService } from '../../../services/user-crud/user-crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-crear-editar',
  templateUrl: './usuario-crear-editar.component.html',
  styleUrls: ['./usuario-crear-editar.component.sass']
})
export class UsuarioCrearEditarComponent {
  fd = new FormData();
  id: string | null;
  form: FormGroup;
  eye: boolean = false;
  disabledOnSubmit: boolean = false;
  readOnlyFlags:any = {};

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private userService: UserService,
    private userCrudService: UserCrudService,
    private router: Router,
    private toastr: ToastrService,
    ){
    this.form = this.fb.group({
      codigo: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: ['N'],
      pass: ['', Validators.required],
      ver: [false],
      crear: [false],
      editar: [false],
      eliminar: [false],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.esEditar();
  }

  onSubmit() {
    this.disabledOnSubmit = true;
    if (this.id !== null) {
      this.userCrudService.editUser(this.id, this.form.value).subscribe(
        (data) => {
          console.log("creado", data.body);
          this.toastr.success(`Usuario: "${data.body.codigo}"`, data.message);
          this.router.navigateByUrl('/dashboard/users');
        },
        (error) => {
          this.toastr.error(error, 'Tenemos un problema');
          this.router.navigateByUrl('/dashboard/users');
        }
      );
    }
    else{
      this.userCrudService.saveUser(this.form.value).subscribe(
        (data) => {
          console.log("creado", data);
          this.toastr.success(`Usuario: "${data.body.codigo}"`, data.message);
          this.router.navigateByUrl('/dashboard/users');
        },
        (error) => {
          this.toastr.error(error, 'Tenemos un problema');
          this.router.navigateByUrl('/dashboard/users');
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.userService.getUser(this.id).subscribe(
        (data) => {
          console.log("es editar", data)
          this.form.setValue({
            codigo: data.codigo,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            estado: data.estado,
            pass: data.password,
            ver: data.ver,
            crear: data.crear,
            editar: data.editar,
            eliminar: data.eliminar,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  cambiarCodigo(){
    let codigo = "";

    const nombres = this.form.get('nombres')?.value;
    const apellidos = this.form.get('apellidos')?.value;

    var arrayNombres = nombres.split(" ");
    var arrayApellidos = apellidos.split(" ");

    arrayNombres.map((item:any, index:any) => {
      codigo = (codigo.concat(item.charAt(0))).toLowerCase();

      if(index + 1 == arrayNombres.length){
        codigo = (codigo.concat(arrayApellidos[arrayApellidos.length - 1])).toLowerCase();
      }
    });

    this.form.get('codigo')?.setValue(codigo)
  }

  verPass() {
    this.eye = true;
    var p: any = document.getElementById('pass');
    p.setAttribute('type', 'text');
  }

  ocultarPass() {
    this.eye = false;
    var p: any = document.getElementById('pass');
    p.setAttribute('type', 'password');
  }

  changeEstado(estado: any){
    switch (estado) {
      case 'N':
        this.form.get('ver')?.setValue(false);
        this.form.get('crear')?.setValue(false);
        this.form.get('editar')?.setValue(false);
        this.form.get('eliminar')?.setValue(false);
        break;
      case 'A':
        this.form.get('ver')?.setValue(true);
        this.form.get('crear')?.setValue(true);
        this.form.get('editar')?.setValue(true);
        this.form.get('eliminar')?.setValue(true);
        break;
      case 'SA':
        this.form.get('ver')?.setValue(true);
        this.form.get('crear')?.setValue(true);
        this.form.get('editar')?.setValue(true);
        this.form.get('eliminar')?.setValue(true);
        break;
    }
  }
}
