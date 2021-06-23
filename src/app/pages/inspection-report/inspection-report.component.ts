import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'ls-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.scss']
})
export class InspectionReportComponent implements OnInit {

  clientDetails : any;
  loading = false;
  currentDate : any;
  siteLabel: any;
  mySubscription: Subscription;
  isPrint = false;
  inspectionTaskList : any;

  constructor(public api: APIService, public activeRoute: ActivatedRoute) {
    //window.print();
      this.currentDate = new Date();
      var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.getClientDetails(id);
      this.getInspectTaskListByClientId(id);
  }

  ngOnInit(): void
  {
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.api.getAppLabel(IsActive);
          }
      )
  }

  getInspectTaskListByClientId(id){
   
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.GetInspectForReportByClientId + '?clientId=' + id).subscribe(res => {
        if(res != null){
          console.log(res);
            this.inspectionTaskList = res;
        }else{
            this.inspectionTaskList = null;
        }
         this.mySubscription = interval(2000).subscribe((x => {
          this.doStuff();
      }));
    });
    this.loading = false;
}

  getClientDetails(id) {
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id).subscribe(res => {
        this.clientDetails = res;
        this.loading = false;

       
    });
  }



  doStuff() {
    if (this.isPrint == false) {
      this.isPrint = true;
      window.print();
    }
  }
 }
