import { AssignamentService } from './custom/assignament.services';
import { UserService } from './custom/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProyectService } from './custom/proyect.service';
import { TaskService } from './custom/task.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule,HttpClientModule],
    exports: [],
    providers: [
        UserService,
        ProyectService,
        TaskService,
        AssignamentService
    ],
})
export class ServicesModule {}