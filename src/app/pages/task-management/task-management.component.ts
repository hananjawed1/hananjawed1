import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../_services';
 import { ITaskAddVM, PriorityLevel, InspectionType, ManageTaskStatus } from '../add-task-management/add-task-management.component';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

  objSearchTaskList: ITaskSerachList = { status:0,  page : 0, pageSize: 10, empId : 0 }

  taskRequest: TaskManagementRequestSummary =
  {
      new: 0, atLocation: 0, completed: 0, returned: 0
  }

  siteLabel: any;
  tasks: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;
  totalCount: number = 0;
  statusName : string;
  empArray = [];

  StatusForTask = ManageTaskStatus;
  PriorityLevel = PriorityLevel;
  InspectionType = InspectionType;

  public exporting = false;

  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
      private authenticationService: AuthenticationService, public toast: ToastService) {
      this.getAllEmployee();
      this.getTaskManagementCount();
  }


  

  ngOnInit(): void {
      this.searchTask(this.objSearchTaskList.page);
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  resetSearch() {
      this.objSearchTaskList = { status: 0, page: 0, pageSize: 10,  empId : 0 }
      this.searchTask(0); 
  }  
  
  getAllEmployee(){
      this.apiservice.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
        res.forEach(element => {
          this.empArray.push({'id' : element.employeeId, 'name' : element.user.name})
        });
      });
  }

  getTaskManagementCount() {
    // this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.apiservice.PostData(urls.UrlModel.TaskManagement.TaskRequest, {  })
        .subscribe(res => {
            this.taskRequest = res;
            // this.loading = false;
            $('#global-loader').fadeOut('slow'); 
        });
    }

  changeDate() {
      if (this.objSearchTaskList.createdOn + '' == '') {
          this.objSearchTaskList.createdOn = null;
      }
      this.searchTask(0);
  }

  ApprovalForClient(){
    this.apiservice.getData(urls.UrlModel.FileRequest.ApprovalForClient).subscribe(res => {
      console.log(res);
      this.tasks = res;
      console.log(this.tasks);
      this.toast.success('Refresh Intial approval for all client','success');
   });
  }
  
  range() {
      var step = 2;
      var doubleStep = step * 2;
      var start = Math.max(0, this.page - step);
      var end = start + 1 + doubleStep;
      if (end > this.pagesCount) { end = this.pagesCount; }
      var ret = [];
      for (var i = start; i != end; ++i) {
          ret.push(i);
      }
      return ret;
  }

  searchTask(page) {
      this.loading = true;
      page = page || 0;
      this.loading = true;
      this.objSearchTaskList.page = page;
      this.objSearchTaskList.empId = Number(this.objSearchTaskList.empId);
      this.objSearchTaskList.status = Number(this.objSearchTaskList.status);

      this.apiservice.PostData(urls.UrlModel.TaskManagement.TaskList, this.objSearchTaskList)
      .subscribe(res => {
          console.log(res.items);
          this.tasks = res.items;
          this.page = res.page;                
          this.pagesCount = res.totalPages;
          this.totalCount = res.totalCount;
          this.loading = false;
      })
  }

  goto(url, data) {
      this.router.navigate([url, data.membershipId]);
  }
}

export interface ITaskSerachList{
  status: number,
  page: number,
  pageSize: number,
  empId : number,
  createdOn?: Date,
}

// tslint:disable-next-line: interface-over-type-literal
export interface TaskManagementRequestSummary {
    new: number,
    atLocation: number,
    completed: number,
    returned: number,
};




