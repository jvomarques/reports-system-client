import { ApiService } from '../../../../services/api.service';
import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageService } from '../../../../services/message.service';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'usuario-form.component.html'
})

@Injectable() 
export class UsuarioFormComponent {

  tipoTela:any;
  resourceForm: FormGroup;
  resPerfis:Array<any> = [];
  protected formBuilder: FormBuilder;

  messageService: MessageService = new MessageService();

  constructor(
    private service: ApiService,
    protected route: ActivatedRoute,
    private location: Location

  ) { }


  ngOnInit(){
    this.buildResourceForm();
    this.verificarTipoAcao();
    this.getPerfis();
  }

  buildResourceForm() {

    this.resourceForm = new FormGroup({
      'id': new FormControl(0),
      'nome': new FormControl(null, [Validators.required]),
      'login': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  validarForm(): boolean {
    console.log(this.resourceForm);
    return (this.resourceForm.valid) ? true : false;
  }

  verificarTipoAcao(){

    if (this.route.snapshot.url.length == 2) {
      if (this.route.snapshot.url[1].path === 'edit') {
        
        this.tipoTela = 'Editar';
        
        const id = this.route.snapshot.url[0].path;
        this.service.getById('usuario', id).subscribe(
          res => {
            console.log(res);
            this.resourceForm.patchValue({
              nome: res.nome,
              login: res.login,
              id: res.id
            })
          }
        )
      }
    } else {
      this.tipoTela = 'Cadastrar';
    }
  }

  salvar():void{
    if(this.validarForm())
    {
      console.log(this.resourceForm);
      this.service.post('usuario',this.resourceForm.value).subscribe(
        (res) => {
          console.log(res);
          this.messageService.successMessage('Sucesso', 'Solicitação processada com sucesso');
          this.location.back();
      }
     );
    }
    else{
      this.messageService.errorMessage("Atenção", "Formulário inválido.")
    }
  }

  atualizar():void{
    if(this.validarForm())
    {
      console.log(this.resourceForm);
      const id = this.route.snapshot.url[0].path;
      this.service.put('usuario/'+ id, this.resourceForm.value).subscribe(
        (res) => {
          console.log(res);
          this.messageService.successMessage('Sucesso', 'Solicitação processada com sucesso');
          this.location.back();
      }
     );
    }
    else{
      this.messageService.errorMessage("Atenção", "Formulário inválido.")
    }
  }

  protected getPerfis(){
    this.service.get('perfil').subscribe(
      res => {
        console.log(res);
        this.resPerfis = res;
      }
    )
  }

}
