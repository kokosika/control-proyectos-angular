import { GenericResponseModel } from './../@model/generic-response.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {
    urlServer = 'http://localhost:9999/api/';
    headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    constructor(protected http: HttpClient) {}
  /**
   * Get Http call
   * @param actionUrl url action
   * @param data params input
   */
    protected Get(actionUrl: string, data: any): Observable<HttpResponse<GenericResponseModel>> {
        if ( data == null ) {
        return this.http.get<GenericResponseModel>(
            this.urlServer + actionUrl,
            { observe: 'response'} );
        }
        return this.http.get<GenericResponseModel>(
        this.urlServer + actionUrl,
        { observe: 'response' , params : { data } , headers : this.headers});
    }

    /**
     * Post Http call
     * @param actionUrl url action
     * @param data body or params input
     */
    protected Post(actionUrl: string, data: any): Observable<HttpResponse<GenericResponseModel>> {
        return this.http.post<GenericResponseModel>(
        this.urlServer + actionUrl,
        JSON.stringify(data),
        { observe : 'response', headers: this.headers});
    }

    /**
     * Put Http call
     * @param actionUrl url action
     * @param id indentificate id put
     * @param data body
     */
    protected Put(actionUrl: string, id: any, data: any): Observable<HttpResponse<GenericResponseModel>> {
        return this.http.put<GenericResponseModel>(
        this.urlServer + actionUrl,
        JSON.stringify(data),
        { observe : 'response' , params : { id: id } , headers : this.headers});
    }

    /**
     * Delete Http call
     * @param actionUrl url action
     * @param id object identificate
     */
    protected Delete(actionUrl: string, id: any): Observable<HttpResponse<GenericResponseModel>> {
        return this.http.delete<GenericResponseModel>(
        this.urlServer + actionUrl,
        { observe: 'response' , params : { id : id}  , headers : this.headers});
    }
}