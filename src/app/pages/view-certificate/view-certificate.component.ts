import {Component, OnInit} from '@angular/core';
import * as clientDetails from "../../_models/clientDetails";
import { APIService } from '../../_services/api.service';
import * as urls from '../../_services/ServiceUrls';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ls-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.scss']
})
export class ViewCertificateComponent implements OnInit {
  clientDetails: clientDetails.IClientDetails;
  loading = false;
  imagePath: string;
  mySubscription: Subscription;
  isPrint = false;
  dateSuffix: string = 'th';

  constructor(public api: APIService,
      public activeRoute: ActivatedRoute,
      public router: Router) {
      var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.getClientDetails(id);
  }

  ngOnInit(): void {}

  getClientDetails(id ) {
      this.loading = true;
      this.api.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id).subscribe(res => {
          this.clientDetails = res;            
          const day: string = this.clientDetails.expiryDateString.substring(0, 2);
          
          if (day === '01' || day === '21' || day === '31') {
              this.dateSuffix = 'st'
          } else if (day === '02' || day === '22') {
              this.dateSuffix = 'nd';
          } else if (day === '03' || day === '23') {
              this.dateSuffix = 'rd';
          }

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

