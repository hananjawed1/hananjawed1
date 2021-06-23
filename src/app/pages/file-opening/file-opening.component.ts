import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ISearchFileRequestVM } from '../../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';
import { OrderPipe } from 'ngx-order-pipe';
import { IClientStatus } from '../../_models';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
@Component({
  selector: 'ls-file-opening',
  templateUrl: './file-opening.component.html',
  styleUrls: ['./file-opening.component.scss']
})
export class FileOpeningComponent implements OnInit {

  searchClients: ISearchFileRequestVM = {
    status: 0, phoneNumber: '', page: 0, pageSize: 10, businessType: 0, date: null, requestType: 0, tradeLicenceNumber: '',
    isApproved:0, employeeId : 0,//approved listing will be shown on manage licence page
    applicationNumber: '', entityName:'', isCompleted : null
  }

  fileOpening: FileOpeningSummary =
  {
    totalRequest: 0, totalPendingRequest: 0, totalApprovedLicense: 0, totalNewLicense: 0, totalRenewalLicense: 0,
    totalHotel: 0, totalBar: 0, totalClub: 0, totalRestaurant: 0, totalHotelApartments: 0, totalReexportCompanies: 0, totalFloatingRestaurants: 0,
    totalShops: 0, totalImportExportCompanies: 0, totalCamp: 0, totalHospitalityLicense : 0
  }
  searchTask: ISearchTaskVM = {
    employeeId : 0, clientId :0, page: 0, pageSize: 10
  }

  searchRequest : ISearchClientRequestVM = {
    requestType : 0, clientId :0, page: 0, pageSize: 10
  }
  

  clientStatus: IClientStatus =
  {
      clientId: 0,
      companyName: '',
      employeeId: null,
      expiryDate: null,
      inspectionDate: null,
      privateNote: '',
      issueDate: null,
      clientNote: '',
      notes: '',
      partnerName: '',
      paymentVoucher: '',
      status: 0,
      typeofLicense:'', 
      licenceAmount : 0,
      certificateNotesForClient : '',
      certificateNotes : '',
      oldStatusForPrivate: 0,
  };

  fileOpeningStatus: any;
  requestTypes: any;
  businessTypes: any;
  employeeList : any;
  loading = false;
  clients: any;
  page: number = 0;
  pagesCount: number = 0;
  siteLabel: any;
  totalCount: number = 0;
  tasks: any;
  array: any[];
  order: string;
  ClientNewRequestDetails : any;
  fileRequestType = FileRequestType;

  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router, public toast: ToastService,private orderPipe: OrderPipe)
  {
      this.getFileOpeningCounts();
      this.getFileOpeningStatus();
      this.getAllEmployee();
      this.getBusinessType();
      this.getRequestTypes();
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

  resetSearch() {
    $("#Client").show();
    $("#Task").hide();
    $("#ClientRequest").hide();
    $("#tab1").addClass("active");
    $("#tab1").removeClass("active");
      this.searchClients=
          {
          status: 0, phoneNumber: '', page: 0,
          pageSize: 10,
          businessType: 0,
          date: null,
          requestType: 0,
          tradeLicenceNumber: '',
          employeeId: 0,
          isApproved: 0, //approved listing will be shown on manage licence page
          applicationNumber: '', entityName:'', isCompleted : null
      }
     this.searchTask=
      {
       page: 0,
        pageSize: 10,
        employeeId: 0,
        clientId: 0,
      }
      this.searchRequest = {
        page: 0,
        pageSize: 10,
        requestType: 0,
        clientId: 0,
      }
      this.searchMembership(0);
  }

  searchTaskDetails(page){
    $("#Client").hide();
    $("#Task").show();
    $("#ClientRequest").hide();
   // $('#global-loader').fadeIn('fast');
    page = page || 0;
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.searchTask.page = page;
    this.searchTask.clientId = id;
    this.searchTask.employeeId = Number(this.searchTask.employeeId);

    this.apiservice.PostData(urls.UrlModel.FileRequest.SearchTask, this.searchTask).subscribe(res => {
       this.tasks = res.items;
      
       this.order = 'status'; // for sorting data
      
    //     //this.loading = false;
      //  $('#global-loader').fadeOut('slow');
        this.page = res.page;
        this.pagesCount = res.totalPages;
        this.totalCount = res.totalCount;
        
    });
}

callClientRequest(){
  alert("JOJOHOIHOHOHOH");
  this.searchRequest.requestType = 1;
  this.searchClientRequest(0);
}

searchClientRequest(page){
    $("#Client").hide();
    $("#Task").hide();
    $("#ClientRequest").show();

    page = page || 0;
    var id = Number(this.route.snapshot.paramMap.get('id'));
    this.searchRequest.page = page;
    this.searchRequest.clientId = id;
    this.searchRequest.requestType = Number(this.searchRequest.requestType);
    
    if(this.searchRequest.requestType == 1) {
      this.apiservice.PostData(urls.UrlModel.FileRequest.SearchRequest, this.searchRequest).subscribe(res => {
        this.ClientNewRequestDetails = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.totalCount = res.totalCount;
      })
    }
  }

  getFileOpeningCounts(){ 
    this.apiservice.PostData(urls.UrlModel.Dashboard.FileOpening, { toDate: null, fromDate: null })
    .subscribe(res => {
        this.fileOpening = res;
    })
  }
  
  searchMembership(page) {
    $("#Client").show();
    $("#Task").hide();
    $("#ClientRequest").hide();
      page = page || 0;
      //this.loading = true;
      this.searchClients.page = page;
      this.searchClients.status = Number(this.searchClients.status);
      this.searchClients.requestType = Number(this.searchClients.requestType);
      this.searchClients.businessType = Number(this.searchClients.businessType);
      this.searchClients.employeeId = Number(this.searchClients.employeeId);
      if(this.searchClients.entityName.length >= 3 || this.searchClients.phoneNumber.length >= 3 || this.searchClients.tradeLicenceNumber.length >= 3){
         $('#global-loader').fadeIn('fast');
        this.apiservice.PostData(urls.UrlModel.FileRequest.SearchFileReques, this.searchClients).subscribe(res => {
          this.clients = res.items;
         
          //this.loading = false;
           $('#global-loader').fadeOut('slow');
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.totalCount = res.totalCount;
          
        });
      }
      if(this.searchClients.entityName.length == 0 || this.searchClients.phoneNumber.length == 0 || this.searchClients.tradeLicenceNumber.length == 0){
        $('#global-loader').fadeIn('fast');
        this.apiservice.PostData(urls.UrlModel.FileRequest.SearchFileReques, this.searchClients).subscribe(res => {
          this.clients = res.items;
          console.log(res.items);
          //this.loading = false;
         $('#global-loader').fadeOut('slow');
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.totalCount = res.totalCount;
          
        });
      } 
  }

 
  GetTaskDetails(clientId){
    this.searchTask.clientId = clientId;

    this.apiservice.PostData(urls.UrlModel.FileRequest.SearchTask, this.searchTask).subscribe(res => {
      if(res.items.length == 0){
        this.toast.error("Opps! No Data Available.." ,"Error");
      }
      else{
        this.router.navigateByUrl('file-opening-task-details/'+clientId);
      }
    })

  }
  getRequestTypes() {
      this.apiservice.getData(urls.UrlModel.Common.RequestType).subscribe(res => {
          this.requestTypes = res;
      });
  }

  getFileOpeningStatus()
  {
      this.apiservice.getData(urls.UrlModel.Common.FileOpeningStatus).subscribe(res => {
          this.fileOpeningStatus = res;
      });
  }

  getBusinessType() {
      this.apiservice.getData(urls.UrlModel.Common.BusinessType).subscribe(res => {
          this.businessTypes = res;

      });
  }

  getAllEmployee(){
    this.apiservice.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
        this.employeeList = res;
    });
}

  ngOnInit(): void
  {
    $("#Client").show();
    $("#Task").hide();
    $("#ClientRequest").hide();
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  } 
}

export interface FileOpeningSummary {
  totalRequest: number,
  totalPendingRequest: number,
  totalApprovedLicense: number,
  totalNewLicense: number,
  totalRenewalLicense: number,
  totalHotel: number,
  totalBar: number,
  totalClub: number,
  totalRestaurant: number,
  totalHotelApartments: number,
  totalReexportCompanies: number,
  totalFloatingRestaurants: number,
  totalShops: number,
  totalImportExportCompanies: number,
  totalCamp: number,
  totalHospitalityLicense : number
}

export interface ISearchTaskVM {
    employeeId : number;
    clientId : number;
    pageSize: number;
    page: number;
  }


  export interface ISearchClientRequestVM {
    requestType : number;
    pageSize: number;
    page: number;
    clientId: number;
  }

  export enum FileRequestType
{
    ChangeLiquorManager = 1,
    Renewal = 2,
    Other = 3,
    UploadReceipt = 4
}