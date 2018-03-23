import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProyectService } from '../../@servicios/custom/proyect.service';
import { ProyectModel } from '../../@model/custom/proyect.model';

@Component({
    moduleId: module.id,
    selector: 'app-view-gantt',
    templateUrl: './view-gantt.component.html',
    styleUrls: ['./view-gantt.component.css']
})


export class ViewGanttComponent implements OnInit {
    proyects: ProyectModel[];
    cols: any[];
    constructor(private srvProyect: ProyectService, private router:Router ) {
        
    }

    ngOnInit() { 
        this.cols = [
            { field: 'idProyecto', header: 'Id' },
            { field: 'nombreProyecto', header: 'Nombre Proyecto' },
            { field: 'descripcion', header: 'Descripcion' },
            { field: 'fechaInicio', header: 'Fecha Inicio' },
            { field: 'fechaFin', header: 'Fecha Fin' },
            { field: 'porcentajeAvance', header: 'Porcentaje' },
            { field: 'userJP', header: 'Nombre JP' },
            { field: 'userEC', header: 'Nombre EC' }
        ];

        this.srvProyect.getAllProyect().subscribe(
            resp => {                
                this.proyects = resp.body.data;
            }, 
            error => {
                console.log(error);
            }
        );        
    }
    seeViewTask(obj: any){       
        this.router.navigate(['core/view-task/' + obj.idProyecto]);
    }
    
}