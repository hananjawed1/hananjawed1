import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services';
import { APIService } from 'src/app/_services/api.service';
import * as urls from '../../_services/ServiceUrls';


@Component({
  selector: 'ls-card-statuses',
  templateUrl: './card-statuses.component.html',
  styleUrls: ['./card-statuses.component.scss']
})
export class CardStatusesComponent implements  OnInit {
  objSearchCardStatus: ISearchCardStatus =
      {
          agentId: 0, cardStatusId: '', status: 0,
          page: 0,
          pageSize: 10,
          id: '',
      };
  public agents: any;
  public StatusEnums: any;
  public siteLabel: any;
  public cards: any;
  loading = false;
  page = 0;
  pagesCount = 0;
  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
      private authenticationService: AuthenticationService) {
      this.getAllAgents();
      this.getAllStatus();
      this.searchCardStatus(0);
  }


  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              const IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      );
  }

  resetSearch() {
      this.objSearchCardStatus = {
          agentId: 0, cardStatusId: '', status: 0, id: '',
          page: 0,
          pageSize: 10,
      };
      this.searchCardStatus(0);
  }

  getAllStatus() {
      this.apiservice.getData(urls.UrlModel.Common.AllCardStatuses).subscribe(res => {
          this.StatusEnums = res;
      });
  }

  getAllAgents() {
      this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
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

  changeDate() {
      if (this.objSearchCardStatus.creationDate + '' === '') {
          this.objSearchCardStatus.creationDate = null;
      }

      this.searchCardStatus(0);
  }

  searchCardStatus(page) {
      page = page || 0;
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.objSearchCardStatus.page = page;
      this.objSearchCardStatus.agentId = Number(this.objSearchCardStatus.agentId);
      this.objSearchCardStatus.status = Number(this.objSearchCardStatus.status);
      this.objSearchCardStatus.id = this.objSearchCardStatus.id;

      this.apiservice.PostData(urls.UrlModel.ManageCardStatuses.SearchCardStatus, this.objSearchCardStatus)
          .subscribe(res => {
              this.cards = res.items;
            //   this.loading = false;
            $('#global-loader').fadeOut('slow'); 
              this.page = res.page;
              this.pagesCount = res.totalPages;
          });
  }

  goto(url, data) {
      this.router.navigate([url, data.cardStatusId]);
  }
}

export interface ISearchCardStatus {
  cardStatusId: string;
  agentId?: number;
  status: number;
  creationDate?: Date;
  page: number;
  pageSize: number;
  id: string;
}
