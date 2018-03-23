import { GenericResponseModel } from './../../@model/generic-response.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService extends BaseService {
    actionUrl = 'tasks';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param user 
     */
    public getAllTask(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }
}