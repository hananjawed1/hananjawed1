import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'ls-print-entity-documents',
  templateUrl: './print-entity-documents.component.html',
  styleUrls: ['./print-entity-documents.component.scss']
})
export class PrintEntityDocumentsComponent implements OnInit {

  siteLabel: any;
  mySubscription: Subscription;
  isPrint = false;
  loading = false;
  docPdf: any;

  constructor(public api: APIService, public activeRoute: ActivatedRoute) {
    var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.downloadEntityDocuments(id);
   }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(
      (params: any) => {
          let IsActive = params.get('rtl');
          this.siteLabel = this.api.getAppLabel(IsActive);
      }
  )
  }

  downloadEntityDocuments(clientId){
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + clientId).subscribe(res => {
       this.docPdf = res;
        console.log(res);
      //  this.mySubscription = interval(2000).subscribe((x => {
      //   this.doStuff();
      // }));
    });
    this.loading = false;
  }

  doStuff() {
    if (this.isPrint == false) {
      this.isPrint = true;
      window.print();
    }
  }
}
