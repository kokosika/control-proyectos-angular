import { OccupationModel } from './../../@model/custom/occupation.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { TaskService } from '../../@servicios/custom/task.service';
import { TaskModel } from '../../@model/custom/task.model';
import { AssignamentService } from '../../@servicios/custom/assignament.services';

declare var JSGantt:any;
declare var DayPilot: any;
@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
    @ViewChild('gatt') gant: ElementRef;
    routerParamId: any;
    taskItem: TaskModel[];
    config: any;
    events: any;
    occupation: OccupationModel[];
    constructor(private elementRef: ElementRef, private route: ActivatedRoute, private srvTask: TaskService,private srvAssignament: AssignamentService ) { 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.gantt();
                //this.generateResource();
            }
        );
    }
    ngOnInit() { }

    gantt(){
        
        // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
        // Parameters                     (pID, pName,                  pStart,       pEnd,        pStyle,         pLink (unused)  pMile, pRes,       pComp, pGroup, pParent, pOpen, pDepend, pCaption, pNotes, pGantt)
        this.srvTask.getAllTask(this.routerParamId).subscribe(
            resp => {
                var element = this.gant.nativeElement;        
                var g = new JSGantt.GanttChart(element, 'day');
                g.setCaptionType('Complete');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
                g.setQuarterColWidth(36);
                g.setUseToolTip(0);
                g.setDateTaskDisplayFormat('day dd month yyyy'); // Shown in tool tip box
                g.setDayMajorDateDisplayFormat('mon yyyy - Week ww') // Set format to display dates in the "Major" header of the "Day" view
                g.setWeekMinorDateDisplayFormat('dd mon') // Set format to display dates in the "Minor" header of the "Week" view
                g.setShowTaskInfoLink(1); // Show link in tool tip (0/1)
                g.setShowEndWeekDate(0); // Show/Hide the date for the last day of the week in header for daily view (1/0)
                g.setUseSingleCell(10000); // Set the threshold at which we will only use one cell per table row (0 disables).  Helps with rendering performance for large charts.
                g.setFormatArr('Day'); 
                
                this.taskItem = resp.body.data;
                const data = [];
                this.taskItem.map((task) => {
                    task.pGantt = g;
                    task.pStyle = 'gtaskblue';
                    g.AddTaskItem(new JSGantt.TaskItem(
                        task.pId,
                        task.pName,
                        task.pStart,
                        task.pEnd,
                        task.pStyle,
                        task.pLink,
                        task.pMile,
                        task.pRes,
                        task.pComp,
                        task.pGroup,
                        task.pParent,
                        task.pOpen,
                        task.pDepend,
                        task.pCaption,
                        task.pNotes,
                        task.pGantt
                    ));                    
                });
                g.Draw();
            }
        );
        
    }

    ngAfterContentInit() {
        this.generateResource();
    }

    generateResource(){
        this.srvAssignament.getAllOccupation(this.routerParamId).subscribe(resp => {  
            console.log (resp.body.data);          
            this.config = {                    
                startDate: '2018-01-01', 
                days: 365,
                scale: 'Day',
                timeHeaders: [
                    { groupBy: "Month", format: "MMM yyyy" },
                    { groupBy: "Cell", format: "d" }
                ], 
                eventHeight: 30,
                treeEnabled: true,
                treePreventParentUsage: true,
                resources: resp.body.data,
                
                heightSpec: 'Max',
                height: 500,
                eventMovingStartEndEnabled: true,
                eventResizingStartEndEnabled: true,
                timeRangeSelectingStartEndEnabled: true,
                //scrollTo: '2018-03-01'
            };            
            //this.events = [{text: "100%",start: "2018-01-04T00:00:00",end: "2018-01-06T00:00:00",id: 1,resource: "1"}]
            this.srvAssignament.getAssePorcForUser(this.routerParamId).subscribe(resp => {
                this.events = resp.body.data;      
            });
        });
    }
}