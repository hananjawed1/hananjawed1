import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/_services/api.service';
import * as urls from '../../_services/ServiceUrls';

@Component({
  selector: 'ls-view-file-opening',
  templateUrl: './view-file-opening.component.html',
  styleUrls: ['./view-file-opening.component.scss']
})
export class ViewFileOpeningComponent implements OnInit {

  searchClients: ISearchFileRequestVM = {
    status: 0, phoneNumber: '', page: 0,
    pageSize: 10,
    businessType: 0,
    date: null,
    requestType: 0,
    tradeLicenceNumber: '',
    applicationNumber: '',
    entityName:''
}

fileOpeningStatus: any;
requestTypes: any;
businessTypes: any;
loading = false;
clients: any;
page: number = 0;
pagesCount: number = 0;
siteLabel: any;
constructor(public apiservice: APIService,
    public activeRoute: ActivatedRoute) {
    this.getFileOpeningStatus();
    this.getBusinessType();
    this.getRequestTypes();

    this.searchMembership(0);
}

resetSearch() {
    this.searchClients  = {
        status: 0, phoneNumber: '', page: 0,
        pageSize: 10,
        businessType: 0,
        date: null,
        requestType: 0,
        tradeLicenceNumber: '',
        applicationNumber: '',
        entityName:''
    }
    this.searchMembership(0);
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

changeDate() {
    if (this.searchClients.date + '' == '') {
        this.searchClients.date = null;
    }
    this.searchMembership(0);
}

searchMembership(page) { 
  page = page || 0;
  //this.loading = true;
  this.searchClients.page = page;
  this.searchClients.status = Number(this.searchClients.status);
  this.searchClients.requestType = Number(this.searchClients.requestType);
  this.searchClients.businessType = Number(this.searchClients.businessType);
  if(this.searchClients.entityName.length >= 3 || this.searchClients.tradeLicenceNumber.length >= 3){
    $('#global-loader').fadeIn('fast');
   this.apiservice.PostData(urls.UrlModel.FileRequest.SearchFileReques, this.searchClients).subscribe(res => {
     this.clients = res.items;
    
     //this.loading = false;
      $('#global-loader').fadeOut('slow');
     this.page = res.page;
     this.pagesCount = res.totalPages;          
   });
 }
 if(this.searchClients.entityName.length == 0 || this.searchClients.tradeLicenceNumber.length == 0){
  $('#global-loader').fadeIn('fast');
  this.apiservice.PostData(urls.UrlModel.FileRequest.SearchFileReques, this.searchClients).subscribe(res => {
    this.clients = res.items;
    console.log(res.items);
    //this.loading = false;
   $('#global-loader').fadeOut('slow');
    this.page = res.page;
    this.pagesCount = res.totalPages;
   // this.totalCount = res.totalCount;
    
  });
  }
}
      
      
       
  

getRequestTypes() {
    this.apiservice.getData(urls.UrlModel.Common.RequestType).subscribe(res => {
        this.requestTypes = res;
    });
}

getFileOpeningStatus() {
    this.apiservice.getData(urls.UrlModel.Common.FileOpeningStatus).subscribe(res => {
        this.fileOpeningStatus = res;
    });
}

getBusinessType() {
    this.apiservice.getData(urls.UrlModel.Common.BusinessType).subscribe(res => {
        this.businessTypes = res;

    });
}

ngOnInit(): void {
  this.activeRoute.queryParamMap.subscribe(
      (params: any) => {
          let IsActive = params.get('rtl');
          this.siteLabel = this.apiservice.getAppLabel(IsActive);
      }
  )
  }
}


export interface ISearchFileRequestVM {
tradeLicenceNumber: string;
phoneNumber: string;
businessType: number;
requestType: number
status: number;
date?: Date;
page: number;
pageSize: number;
applicationNumber: string;
entityName: string;
}
