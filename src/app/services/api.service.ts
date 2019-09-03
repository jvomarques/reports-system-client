import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { LogService } from './log.service';
import { HttpClient } from 'selenium-webdriver/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API = `${environment.API}`+'/api';
  protected httpClient: HttpClient;
  protected headers: HttpHeaders;

  constructor(private http: Http, 
    private router: Router,

    ) { 

    }

  get(url: string) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(this.getHeadersAuthorization()), 
    };
    
    return this.http.get(`${this.API}/${url}`, requestOptions).pipe(
      map((res: Response) => res.json()))
  }

  getById(url: string, id:any) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(this.getHeadersAuthorization()), 
    };
    
    return this.http.get(`${this.API}/${url}/`+id, requestOptions).pipe(
      map((res: Response) => res.json()))
  }
  

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {
    const headers = new Headers();
    const jwt = localStorage.getItem('token');

    if(jwt != null){
      const authRequest = `Bearer ${jwt['accessToken']}`;
      headers.append('Authorization', authRequest);
    }

    const requestOptions = new RequestOptions({
      url: `${this.API}/${url}`,
      method: method,
      headers: headers
    });

    if (body) 
      requestOptions.body = body;

    const request = new Request(requestOptions);
    return this.http.request(request)
      .pipe(
        map((res: Response) => res.json()))
      .pipe(catchError((res: Response) => this.erroHandler(res)));
  }

  erroHandler(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log('ERRO', error);

    if (error.statusCode === 401) {
      console.log('401', 'redirect');
      localStorage.clear();
      this.router.navigate(['/login'], {
        queryParams: { redirectUrl: this.router.routerState.snapshot.url },
      })
    }
    if (error.statusCode >= 500 || error.statusCode == 0) {
      console.log('500', 'server error');
    //   this.uiService.exibirErro500();
    }

    return throwError(error);
  }


  protected getHeadersAuthorization():any {
    const token = localStorage.getItem('token');

    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'bearer ' + token
    }

    return header;
  }

}
