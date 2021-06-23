import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ls-card-status-detail',
  templateUrl: './card-status-detail.component.html',
  styleUrls: ['./card-status-detail.component.scss']
})
export class CardStatusDetailComponent implements OnInit {

  historySearchVM: HistorySearchVM = { status: 0, cardStatusId: 0, page: 0, pageSize: 10 }

  history: any;
  cardStatusId: number;
  statusEnums: any;
  objCardStatusDetail: any;
  public siteLabel: any;
  loading = false;
  selectedStatus: string;
  selectedUpdatedStatus: string;

  loadingHistory = false;

  page = 0;
  pagesCount = 0;

  constructor(public apiservice: APIService, public router: Router, public activeRoute: ActivatedRoute, private route: ActivatedRoute) {
      this.cardStatusId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 0);

      this.historySearchVM.cardStatusId = this.cardStatusId;

      this.getCardStatusDetail(this.cardStatusId);
      this.getHistory(0);
      this.getAllStatus();
  }


  getAllStatus() {
      this.apiservice.getData(urls.UrlModel.Common.AllCardStatuses).subscribe(res => {
          this.statusEnums = res;
      });
  }

  range() {
      const step = 2;
      const doubleStep = step * 2;
      const start = Math.max(0, this.page - step);
      let end = start + 1 + doubleStep;
      if (end > this.pagesCount) { end = this.pagesCount; }
      const ret = [];
      for (let i = start; i !== end; ++i) {
          ret.push(i);
      }
      return ret;
  }


  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              const IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      );
  }

  getCardStatusDetail(id: number) {
      // this.loading = true;
      $('#global-loader').fadeIn('fast'); 
      this.apiservice.getData(urls.UrlModel.ManageCardStatuses.CardStatusDetails + '?id=' + id)
          .subscribe(res => {
              this.objCardStatusDetail = res;
              // this.loading = false;
              $('#global-loader').fadeOut('slow'); 
          });
  }

  getHistory(page) {
      page = page || 0;
      this.historySearchVM.page = page;
      // this.loadingHistory = true;
      $('#global-loader').fadeIn('fast'); 
      this.historySearchVM.status = Number(this.historySearchVM.status);
      this.apiservice.PostData(urls.UrlModel.ManageCardStatuses.CardStatusHistory, this.historySearchVM).subscribe(res => {
          this.history = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          // this.loadingHistory = false;
          $('#global-loader').fadeOut('slow'); 
      });
  }
}

class HistorySearchVM {
  cardStatusId: number;
  status: number;
  page: number;
  pageSize: number;
}
