import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services';
import { APIService } from 'src/app/_services/api.service';
import { ToastService } from 'src/app/_services/toast.service';
import * as urls from '../../_services/ServiceUrls'

@Component({
  selector: 'ls-client-request-update',
  templateUrl: './client-request-update.component.html',
  styleUrls: ['./client-request-update.component.scss']
})
export class ClientRequestUpdateComponent implements OnInit {
  siteLabel: any;
  loading : false;
  msg: string;
  selectedStatus: any;
  ClientNewRequestDetails : any;
  newFileRequestId: number;
  clientHistory: any;
  ClientRequestDetails: any;
  clientId: number;
  data = []; //Code for slider Img
  docImagePath: string; //Code for slider Img
  docImageType: string; //Code for slider Img
  status: number;
  returnNotes: any;

  //Code for slider Img
  belowImageData;
  @ViewChild('carousel', {static : false}) carousel: NgbCarousel;
  
  constructor(public api: APIService,public router: Router,public activeRoute: ActivatedRoute, private authenticationService: AuthenticationService,public toast: ToastService) {
    this.getClientRequestDetails();
    this.getClientNewRequestDetails();
    this.getRequestHistoryDetailsById();
    this.getReturnNotesById()
    //Code for slider Img
    this.belowImageData = JSON.parse(JSON.stringify(this.data));
    this.belowImageData.splice(0,1);
   }
 
   getRequestHistoryDetailsById() {
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.api.getData(urls.UrlModel.FileRequest.GetRequestHistoryDetailsById + '?ClientId=' + id).subscribe(res => {
      console.log(res);
        this.clientHistory = res;
    });
}
  getClientNewRequestDetails(){
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.api.getData(urls.UrlModel.FileRequest.GetClinetNewFileRequestById + '?Id=' + id).subscribe(res => {
        if(res.length > 0){
            this.ClientRequestDetails = res;
            this.clientId = this.ClientRequestDetails[0].clientId;
            this.status = this.ClientRequestDetails[0].status;
        }else{
            this.ClientRequestDetails = "";
        }
    });
  }

  //Code for slider Img
  showDocuments(imgs: any) {
    console.log(imgs);
    this.data = [];
          console.log(this.data);
          var str = imgs;
          var str_array = str.split(',');
          var mimeType;
          for(var i = 0; i < str_array.length; i++) {
              if(str_array[i].substr(str_array[i].lastIndexOf('.') + 1) == 'pdf'){
                  mimeType = "pdf"
              }
              else{
                  mimeType = "img"
              }
              let jsonData = {
                  image: str_array[i],
                  name: mimeType
                  
              };
              this.data.push(jsonData);
          }
    this.docImagePath = imgs;
  }
  //Code for slider Img
  change(data){
  this.belowImageData = JSON.parse(JSON.stringify(this.data));
  this.belowImageData.splice(data.current, 1);
  }
  ngOnInit(): void {

  }
  FileOpeaningDetails(){
    
    this.router.navigateByUrl('file-opening-details/'+this.clientId);
  }

  getClientRequestDetails() {
    $('#global-loader').fadeIn('fast');
    this.api.getData(urls.UrlModel.FileRequest.GetClinetNewFileRequestById + '?Id=' + this.activeRoute.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
            this.ClientNewRequestDetails = res;
            this.selectedStatus = this.ClientNewRequestDetails.status;
            $('#global-loader').fadeOut('slow');
        })
}
  updateClientRequestStatus(){
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    $('#global-loader').fadeIn('fast');
    this.api.PostData(urls.UrlModel.FileRequest.UpdateClientRequestStatus, {newFileRequestId: id,
      status: this.status,
      returenNotes: this.msg
    }).subscribe(res => {
      $('#global-loader').fadeOut('slow');
        this.toast.success('Status Updated Successfully!','Done');
        this.msg = '';
        this.router.navigateByUrl('file-opening');
      }, error => {
        // this.api.toastrservice.success('Status Could not Updated!','Error');
    })
  }
  getReturnNotesById(){
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.api.getData(urls.UrlModel.FileRequest.GetReturnNotesById + '?ClientId=' + id).subscribe(res => {
        console.log(res);
          this.returnNotes = res;
      });
  }  
}

