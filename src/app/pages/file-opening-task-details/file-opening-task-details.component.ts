import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../_services/api.service';
import * as urls from '../../_services/ServiceUrls';

@Component({
  selector: 'ls-file-opening-task-details',
  templateUrl: './file-opening-task-details.component.html',
  styleUrls: ['./file-opening-task-details.component.scss']
})
export class FileOpeningTaskDetailsComponent implements OnInit {
  siteLabel: any;
  employeeList : any;
  page: number = 0;
  pagesCount: number = 0;
  loading = false;
  clients: any;
  totalCount: number = 0;

  searchTask: ISearchTaskVM = {
    employeeId : 0, clientId :0, page: 0, pageSize: 10
  }

  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router) 
  { 
    this.getAllEmployee();
    this.searchMembership(0);

  }
 
  FileOpeaningDetails(){
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigateByUrl('file-opening-details/'+id);
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
  getAllEmployee(){
    this.apiservice.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
        this.employeeList = res;
    });
  }
  searchMembership(page) {
    $('#global-loader').fadeIn('fast');
    page = page || 0;
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.searchTask.page = page;
    this.searchTask.clientId = id;
    this.searchTask.employeeId = Number(this.searchTask.employeeId);

    this.apiservice.PostData(urls.UrlModel.FileRequest.SearchTask, this.searchTask).subscribe(res => {
       this.clients = res.items;

        console.log(res);
    //     //this.loading = false;
        $('#global-loader').fadeOut('slow');
        this.page = res.page;
        this.pagesCount = res.totalPages;
        this.totalCount = res.totalCount;
        
    });
  }
  resetSearch() {
    this.searchTask=
      {
       page: 0,
        pageSize: 10,
        employeeId: 0,
        clientId: 0,
      }
    this.searchMembership(0);
  }
  ngOnInit(): void
  {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  } 

}


export interface ISearchTaskVM {
  employeeId : number;
  clientId : number;
  pageSize: number;
  page: number;
}