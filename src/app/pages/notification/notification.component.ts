import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ls-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any
  SearchNotifyVM: ISearchNotifications =
      {
          date: null,
          page: 0,
          pageSize: 10,
          number: '',
          phoneNumber: '',
          type: 0,
          userId: '',
          userId2:''
      }

  agents: any;
  salesPoints: any;
  details: any;
  siteLabel: any;
  loading = false; page: number = 0;
  pagesCount: number = 0;
  constructor(private router: Router,
      private route: ActivatedRoute,
      public apiservice: APIService)
  {
      this.getAllAgents();
      this.getAllSalesPoints();
      this.searhNotifications(0);
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

  getAllAgents() {
      this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
      })
  }

  getAllSalesPoints() {
      this.apiservice.getData(urls.UrlModel.Common.AllSalesPoints).subscribe(res => {
          this.salesPoints = res;
      })
  }

  changeDate() {
      if (this.SearchNotifyVM.date + '' == '') {
          this.SearchNotifyVM.date = null;
      }
      this.searhNotifications(0);
  }

  updateAll() {
      let list: number[] = [];
      this.notifications.forEach(element =>
          list.push(element.notificationId)
      );
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.apiservice.PostData(urls.UrlModel.ManageNotifications.UpdateAllReadStatus,
          { 'ids': list }
      )
          .subscribe(res =>
          {
            //   this.loading = false;
            $('#global-loader').fadeOut('slow'); 
              this.searhNotifications(this.SearchNotifyVM.page);
          });
  }

  searhNotifications(page )
  {
      page = page || 0; this.SearchNotifyVM.page = page;
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.apiservice.PostData(urls.UrlModel.ManageNotifications.SearchNotifications, this.SearchNotifyVM)
          .subscribe(res => {
              this.notifications = res.items;
              this.page = res.page;
              this.pagesCount = res.totalPages;
            //   this.loading = false;
            $('#global-loader').fadeOut('slow'); 
             
          });
  }

  showDetails(a: any)
  {
      this.details = a;
      a.isRead = true;
      this.apiservice.getData(urls.UrlModel.ManageNotifications.UpdateReadStatus + '?id=' + a.notificationId)
          .subscribe(res => {
          })
  }


  ngOnInit(): void
  {
      this.route.queryParamMap.subscribe(
          (params: any) =>
          {
              let IsActive = params.get('rtl');
              this.siteLabel= this.apiservice.getAppLabel(IsActive);
          }
      )
}
}

export interface ISearchNotifications {
  date?: Date,
  page: number,
  pageSize: number,
  number: string,
  phoneNumber: string,
  type?: number;
  userId: string,
  userId2: string;
}

