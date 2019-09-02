import { ApiService } from '../../../../services/api.service';
import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageService } from '../../../../services/message.service';

@Component({
  templateUrl: 'usuario-form.component.html'
})

@Injectable() 
export class UsuarioFormComponent {

  tipoTela:any;
  resourceForm: FormGroup;
  protected formBuilder: FormBuilder;

  messageService: MessageService = new MessageService();

  constructor(
    private service: ApiService,
    protected route: ActivatedRoute

  ) { }

  salvar():void{
    console.log(this.resourceForm);
    this.service.post('usuario',this.resourceForm.value).subscribe(
      (res) => {
        console.log(res);
        this.messageService.successMessage('Sucesso', 'Solicitação processada com sucesso');

    }
   );

  }


  ngOnInit(){
    this.setTituloTipoTela();
    this.buildResourceForm();
  }

  buildResourceForm() {

    this.resourceForm = new FormGroup({
      'nome': new FormControl(null, [Validators.required]),
      'login': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  validarForm(): boolean {
    return (this.resourceForm.valid) ? true : false;
  }


  protected setTituloTipoTela() {
    
    if (this.route.snapshot.url.length == 2) {
      if (this.route.snapshot.url[1].path === 'edit') {
        this.tipoTela = 'Editar';
      }
    } else {
      this.tipoTela = 'Cadastrar';
    }
  }
}
