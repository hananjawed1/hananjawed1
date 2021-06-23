import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

@Component({
  selector: 'ls-print-personal-documents',
  templateUrl: './print-personal-documents.component.html',
  styleUrls: ['./print-personal-documents.component.scss']
})
export class PrintPersonalDocumentsComponent implements OnInit {

  siteLabel: any;
  clientDocumentDetails : any;
  mySubscription: Subscription;
  loading = false;

  constructor(public api: APIService, public activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.getClientDocumentDetails(id);
  }

  getClientDocumentDetails(id) {
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.ClientDocumentDetails + '?id=' + id).subscribe(res => {
      console.log(res);
        if(res.length > 0){
            this.clientDocumentDetails = res;
        }else{
            this.clientDocumentDetails = "";
        }
        this.loading = false;
    });
  }
}
