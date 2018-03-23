import { GenericResponseModel } from './../../@model/generic-response.model';
import { Observable } from 'rxjs/Observable';
import { ProyectModel } from './../../@model/custom/proyect.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';

@Injectable()
export class ProyectService extends BaseService {
    actionUrl = 'proyect';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param user 
     */
    public getAllProyect(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);        
    }
}