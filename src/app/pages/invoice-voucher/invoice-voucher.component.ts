import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'ls-invoice-voucher',
  templateUrl: './invoice-voucher.component.html',
  styleUrls: ['./invoice-voucher.component.scss']
})
export class InvoiceVoucherComponent implements OnInit {

  clientDetails : any;
  loading = false;
  currentDate : any;
  siteLabel: any;
  mySubscription: Subscription;
  isPrint = false;

  constructor(public api: APIService, public activeRoute: ActivatedRoute) {
    //window.print();
      this.currentDate = new Date();
      var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.getClientDetails(id);
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

  getClientDetails(id) {
    this.loading = true;
    this.api.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id).subscribe(res => {
        this.clientDetails = res;
        this.loading = false;

        this.mySubscription = interval(2000).subscribe((x => {
          this.doStuff();
      }));
    });
  }

  doStuff() {
    if (this.isPrint == false) {
      this.isPrint = true;
      window.print();
    }
  }
}
