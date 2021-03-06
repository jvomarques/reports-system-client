import { ApiService } from '../../../../services/api.service';
import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageService } from '../../../../services/message.service';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'atividade-form.component.html'
})

@Injectable() 
export class AtividadeFormComponent {

  tipoTela:any;
  resourceForm: FormGroup;
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
  }

  buildResourceForm() {

    this.resourceForm = new FormGroup({
      'id': new FormControl(0),
      'descricao': new FormControl(null, [Validators.required]),
      'dataInicio': new FormControl(null, [Validators.required]),
      'dataFim': new FormControl(null, [Validators.required]),
    });

  }

  validarForm(): boolean {
    return (this.resourceForm.valid) ? true : false;
  }

  verificarTipoAcao(){

    if (this.route.snapshot.url.length == 2) {
      if (this.route.snapshot.url[1].path === 'edit') {
        
        this.tipoTela = 'Editar';
        
        const id = this.route.snapshot.url[0].path;
        this.service.getById('atividade', id).subscribe(
          res => {
            console.log(res);
            this.resourceForm.patchValue({
              id: res.id,
              descricao: res.descricao,
            })
          }
        )
      }
    } else {
      this.tipoTela = 'Cadastrar';
    }

    console.log(this.tipoTela);
  }

  salvar():void{
    if(this.validarForm())
    {
      console.log(this.resourceForm);
      this.service.post('atividade',this.resourceForm.value).subscribe(
        (res) => {
          console.log(res);
          this.registrarLog('atividade-post','put')

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
      this.service.put('atividade/'+ id, this.resourceForm.value).subscribe(
        (res) => {
          console.log(res);
          this.registrarLog('atividade-form','put')

          this.messageService.successMessage('Sucesso', 'Solicitação processada com sucesso');
          this.location.back();
      }
     );
    }
    else{
      this.messageService.errorMessage("Atenção", "Formulário inválido.")
    }
  }

  limpar():void{
    this.resourceForm.reset();
  }

  registrarLog(paginaAcessada: any, acao: any){

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let now = new Date();

    let body = {
      acao: acao, 
      paginaAcessada: paginaAcessada,
      data: now, 
      idUsuario: usuario.id
    }
    this.service.post('log', body).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}
