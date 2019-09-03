import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 

  resourceForm: FormGroup;

  constructor(private authService: AuthService){

  }

  ngOnInit(){
    this.buildResourceForm();
  }

  login():void {
    if(this.validarForm)
      this.authService.login(this.resourceForm.get('login').value, this.resourceForm.get('senha').value);
  }

  buildResourceForm() {

    this.resourceForm = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'senha': new FormControl(null, [Validators.required]),
    });

  }

  validarForm(): boolean {
    return (this.resourceForm.valid) ? true : false;
  }
}
