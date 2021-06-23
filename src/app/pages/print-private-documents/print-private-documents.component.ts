import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';


@Component({
  selector: 'ls-print-private-documents',
  templateUrl: './print-private-documents.component.html',
  styleUrls: ['./print-private-documents.component.scss']
})
export class PrintPrivateDocumentsComponent implements OnInit {

  siteLabel: any;
  PrivateDocumentDetails : any;
  mySubscription: Subscription;
  loading = false;

  constructor(public api: APIService, public activeRoute: ActivatedRoute) { 
    
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.getPrivateDocumentDetails(id);
  }
  
  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(
      (params: any) => {
          let IsActive = params.get('rtl');
          this.siteLabel = this.api.getAppLabel(IsActive);
      }
  )
  }
  getPrivateDocumentDetails(id) {
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.PrivateDocumentDetails + '?id=' + id).subscribe(res => {
        if(res.length > 0){
            this.PrivateDocumentDetails = res;
        }else{
            this.PrivateDocumentDetails = "";
        }
        this.loading = false;
    });
  }
 
}
