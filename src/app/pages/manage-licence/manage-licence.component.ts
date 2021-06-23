import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ISearchFileRequestVM } from '../../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ls-manage-licence',
  templateUrl: './manage-licence.component.html',
  styleUrls: ['./manage-licence.component.scss']
})
export class ManageLicenceComponent implements OnInit {

  searchClients: ISearchFileRequestVM = {
      status: 0, phoneNumber: '', page: 0,
      pageSize: 10,
      businessType: 0,
      date: null,
      requestType: 0,
      employeeId: 0,
      tradeLicenceNumber: '',
      isApproved: 1, //approved listing will be shown on manage licence page
      applicationNumber: '', entityName: '', isCompleted : null
  }
  licenceRequest: LicenceRequestSummary =
  {
    totalHotel: 0, totalClub: 0, totalBar:0,  totalRestaurant: 0
  }

  fileOpeningStatus: any;
  requestTypes: any;
  businessTypes: any;
  loading = false;
  clients: any;
  page: number = 0;
  pagesCount: number = 0;
  siteLabel: any;

  constructor(public apiservice: APIService, private route: ActivatedRoute,
      public router: Router) {
      this.getLicenceRequestCount();
      this.getFileOpeningStatus();
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

  resetSearch() {
      this.searchClients =
          {
          status: 0, phoneNumber: '', page: 0,
          pageSize: 10,
          businessType: 0,
          date: null,
          requestType: 0,
          employeeId: 0,
          tradeLicenceNumber: '',
          isApproved: 1, //approved listing will be shown on manage licence page
          applicationNumber: '', entityName: '', isCompleted : null
      }
      this.searchMembership(0);
  }

  searchMembership(page) {
      page = page || 0;
      $('#global-loader').fadeIn('fast');
      //this.loading = true;
      this.searchClients.page = page;
      this.searchClients.status = Number(this.searchClients.status);
      this.searchClients.requestType = Number(this.searchClients.requestType);
      this.searchClients.businessType = Number(this.searchClients.businessType);
      this.apiservice.PostData(urls.UrlModel.FileRequest.SearchFileReques, this.searchClients).subscribe(res => {
          this.clients = res.items;
          //this.loading = false;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          $('#global-loader').fadeOut('slow');

      });
  }

  getLicenceRequestCount() {
    this.loading = true;
    this.apiservice.PostData(urls.UrlModel.Dashboard.FileOpening, { toDate: null, fromDate: null })
        .subscribe(res => {
            this.licenceRequest = res;
            this.loading = false;
        })
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
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

}
// tslint:disable-next-line: interface-over-type-literal
export interface LicenceRequestSummary {
  totalHotel: number,
  totalRestaurant: number,
  totalBar: number,
  totalClub: number,
};
