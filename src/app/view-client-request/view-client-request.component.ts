import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { APIService } from '../_services/api.service';
import * as urls from '../_services/ServiceUrls';

@Component({
  selector: 'ls-view-client-request',
  templateUrl: './view-client-request.component.html',
  styleUrls: ['./view-client-request.component.scss']
})
export class ViewClientRequestComponent implements OnInit {
  ClientNewRequestDetails: any;
  loading: boolean;
  clientStatus: any;
  clientDetails: any;
  tempLLNumber: any;
  oldStatus: number;
  status: number;
  objPrivateTask: any;
  

  constructor(public apiservice: APIService, public activeRoute: ActivatedRoute) { 
    this.getClientDetails();
    this.getMyRequest();
  }

  getClientDetails() {
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    $('#global-loader').fadeIn('fast');
    this.loading = true;
    this.apiservice.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id).subscribe(res => {
        
        //this.clientDetails = res as clientDetails.IClientDetails;
        this.clientDetails = res;
        console.log(res);
        this.clientDetails.status = Number(res.status);
        this.status = Number(this.clientDetails.status);
        this.oldStatus = Number(this.clientDetails.status);
        
        this.clientStatus.status = this.clientDetails.status;
        this.clientStatus.companyName = this.clientDetails.companyName;
        this.clientStatus.partnerName = this.clientDetails.partnerName;

        this.clientStatus.issueDate = moment(this.clientDetails.issueDate).format(
            'YYYY-MM-DD',
        );

        this.clientStatus.expiryDate = moment(this.clientDetails.expiryDate).format(
            'YYYY-MM-DD',
        );

        // this.clientStatus.issueDate = this.clientDetails.issueDate;
        // this.clientStatus.expiryDate = this.clientDetails.expiryDate;

        this.tempLLNumber = this.clientDetails.liquorLicenseNumber;
        this.clientStatus.privateNote = null; //this.clientDetails.privateNote; 
        this.clientStatus.clientNote = null; //this.clientDetails.clientNote;
        this.clientStatus.employeeId = this.clientDetails.employeeId;
        this.clientStatus.inspectionDate = null; //this.clientDetails.inspectionDate;
        this.clientStatus.typeofLicense = this.clientDetails.businessTypeString;

        if (this.clientDetails.licenceAmount == null || this.clientDetails.licenceAmount == 0){
            this.clientDetails.licenceAmount = this.clientDetails.liquorLimitPerMonth;
        }

        this.clientStatus.licenceAmount = this.clientDetails.licenceAmount;
        this.clientStatus.certificateNotesForClient = this.clientDetails.certificateNotesForClient;
        this.clientStatus.certificateNotes = this.clientDetails.certificateNotes;           
        setTimeout(() => {
            this.loading = false;
            $('#global-loader').fadeOut('slow');
        }, 500);
    });
}
  
  getMyRequest(){
    $('#global-loader').fadeIn('fast');
    this.loading = true;
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.apiservice.getData(urls.UrlModel.FileRequest.GetMyRequestByClientId + '?ClientId=' + id).subscribe(res => {
        if(res.length > 0){
          this.ClientNewRequestDetails = res;
          console.log("ClientNewRequestDetails>>>> ", this.ClientNewRequestDetails);
      }else{
          this.ClientNewRequestDetails = "";
      }
          // // this.profile = res;
          // console.log(res);
          this.loading = false;
          $('#global-loader').fadeOut('slow');
      });
  }
  ngOnInit(): void {
  }

}
