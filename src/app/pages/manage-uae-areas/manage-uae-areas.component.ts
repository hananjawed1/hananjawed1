import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-manage-uae-areas',
  templateUrl: './manage-uae-areas.component.html',
  styleUrls: ['./manage-uae-areas.component.scss']
})
export class ManageUaeAreasComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  searchAreasList: any;
  StatusEnums = Status;
  areaViewDetails: any;
  
  objSearchArea: SearchAreas = { areaId: '', areaName: '', assignLocation: '', status: 0, page : 0, pageSize: 10}

  siteLabel: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;

  constructor(public apiservice: APIService, public router: Router, private route: ActivatedRoute,public toast: ToastService) {
      this.searchAreas(0);
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  resetSearch() {
      this.objSearchArea = { areaId: '', areaName: '', assignLocation: '', status: 0, page : 0, pageSize: 10}
      this.searchAreas(0);
  }

  ngOnDestroy() {
      this.apiservice.subscriptions ? this.apiservice.subscriptions.unsubscribe() : null;
  }

  range()
  {
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

  searchAreas(page) {
      page = page || 0;
      this.objSearchArea.page = page;
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
     
      this.apiservice.PostData(urls.UrlModel.ManageAreas.SearchAreas, this.objSearchArea).subscribe(res => {
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.searchAreasList = res;
          this.loading = false;
          $('#global-loader').fadeOut('slow'); 
      });
  }

  ViewAreasDetails(location) {    
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.apiservice.getData(urls.UrlModel.ManageAreas.GetAreasDetailsById + '?areaId=' + location.areaId)
      .subscribe(res => {
          this.areaViewDetails = res;
        //   this.loading = false;
        $('#global-loader').fadeOut('slow'); 
      })
  }

  editAreaLocation(arealocation) {
      this.router.navigate(['add-uae-areas', arealocation.areaId]);
  }

  InAvtivateAreas(areas) {
      this.apiservice.PostData(urls.UrlModel.ManageAreas.InactiveAreas,{ areaId: areas.areaId, status: this.StatusEnums.InActive}).subscribe(res =>
      {
          this.toast.success('Location status updated successfully!', 'Done');
          this.searchAreas(0);
      }, error => {
          this.toast.error('Unable to update location status', 'Error');
      })
  }
}

export interface SearchAreas {
  areaId: string,
  areaName: string,
  assignLocation: any,
  status: number,
  page: number,
  pageSize: number
}
