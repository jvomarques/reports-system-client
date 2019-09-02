import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BaseModel } from '../models/baseModel';

declare var $: any;
export class BaseService<T extends BaseModel> {

  protected http: HttpClient;
  protected headers: HttpHeaders;
  protected cookieservice: CookieService;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn?: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.cookieservice = injector.get(CookieService);
  }


  getResource(): Observable<any> {
    this.headers = this.HeadersAuthorization();
    return this.http.get(this.apiPath, { headers: this.headers }).pipe(
    )
  }

  getAll(object?: T): Observable<any> {
    this.headers = this.HeadersAuthorization();
    if (object != null) {
// tslint:disable-next-line: max-line-length
      var queryString = Object.keys(object).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(object[k])); return a }, []).join('&');
    }
    
    return this.http.get(this.apiPath + ((!queryString) ? ("") : ("?" + queryString)), { headers: this.headers }).pipe(
      finalize(() => $('#loading2').fadeOut())
    );
  }

  getById(id: number, object?: T, subRoute?: string): Observable<any> {
    this.headers = this.HeadersAuthorization();
    $('#loading2').fadeIn();
    if (object != null) {
  // tslint:disable-next-line: max-line-length
      var queryString = Object.keys(object).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(object[k])); return a }, []).join('&');
    }
  // tslint:disable-next-line: max-line-length
    return this.http.get(this.apiPath + id + ((!queryString) ? ('') : ('?' + queryString)) + ((!subRoute) ? ("") : ('/' + subRoute)), { headers: this.headers }).pipe(
      finalize(() => $('#loading2').fadeOut()),
    );
  }

  getByMultiParams(paramsArray?: Array<any>, subRoute?: string): Observable<any> {
    this.headers = this.HeadersAuthorization();
    $('#loading2').fadeIn();

    let paramsStr: string = '';
    for (let i = 0; i < paramsArray.length; i++) {
      paramsStr = paramsStr + paramsArray[i]+ '/' ;      
    }     
    
    return this.http.get(this.apiPath + ((!subRoute) ? ("") : (subRoute + '/')) + paramsStr, { headers: this.headers }).pipe(
      finalize(() => $('#loading2').fadeOut()),
    );
  }

  create(resource: T): Observable<any> {
    this.headers = this.HeadersAuthorization();
    $('#loading2').fadeIn();
    let retorno: any;
    return this.http.post(this.apiPath, resource, { headers: this.headers }).pipe(
      map((data) => retorno = data),
      finalize(() => $('#loading2').fadeOut())
    )
  }

  update(resource: T): Observable<any> {
    this.headers = this.HeadersAuthorization();
    $('#loading2').fadeIn();
    let firstObject = Object.keys(resource)[0];
    const url = `${this.apiPath}${resource[firstObject]}`;
    return this.http.put(url, resource, { headers: this.headers }).pipe(
      map(() => resource),
      finalize(() => $('#loading2').fadeOut())
    )
  }

  delete(id: number): Observable<any> {
    this.headers = this.HeadersAuthorization();
    $('#loading2').fadeIn();
    const url = `${this.apiPath}${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      map(() => null),
      finalize(() => $('#loading2').fadeOut())
    )
  }

  /**
  * Busca header para inserir nas requisições com autorização necessária
  *  */
  protected HeadersAuthorization(): HttpHeaders {
    const tceAuthToken = this.cookieservice.get('TceoAuth');
    if (tceAuthToken) {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + tceAuthToken
      });
      return headers;
    };
  }


  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): any {
    const resources: any = [];
    return resources;
  }
}
