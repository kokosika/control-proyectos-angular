import { AppNgPrimeModule } from './../app.ng-prime.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { CoreComponent } from './core.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ViewGanttComponent } from './view-gantt/view-gantt.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import {DayPilotModule} from "daypilot-pro-angular";

@NgModule({
    declarations: [
        CoreComponent,
        ViewGanttComponent,
        ViewTaskComponent
    ],
    imports: [ CommonModule, RouterModule, SidebarModule,FooterModule , NavbarModule, AppNgPrimeModule,DayPilotModule ],
    exports: [
        CoreComponent,
        ViewGanttComponent,
        ViewTaskComponent

    ],
    providers: [],
})
export class CoreModule {}