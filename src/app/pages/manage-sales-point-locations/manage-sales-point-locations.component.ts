import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { IsalesLocation } from '../../pages/add-sales-points-location/add-sales-points-location.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastPackage } from 'ngx-toastr';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-manage-sales-point-locations',
  templateUrl: './manage-sales-point-locations.component.html',
  styleUrls: ['./manage-sales-point-locations.component.scss']
})
export class ManageSalesPointLocationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  locations: any;
  agents: any;
  StatusEnums = Status;
  LocationDetails: any;
  objlocation: IsalesLocation;
  
  objSearchLocation: ISearchSalesPointLocation = {
      agentId: 0, email: '', name: '', page: 0, pageSize: 10, phoneNumber: '', status: 0
  }

  siteLabel: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;

  constructor(public apiservice: APIService, public router: Router,
      private route: ActivatedRoute,public toast: ToastService) {
      this.getAllAgents();
      this.searchLocations(0);
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
     this.objSearchLocation=
          {
              agentId: 0, email: '', name: '', page: 0,
              pageSize: 10, phoneNumber: '', status: 0
          };
      this.searchLocations(0);
  }

  ngOnDestroy() {

      this.apiservice.subscriptions ? this.apiservice.subscriptions.unsubscribe() : null;
  }

  getAllAgents() {
      this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
      })
  }

  getAllLocations() {
      this.apiservice.subscriptions = this.apiservice.getData(urls.UrlModel.ManageLocations.AllLocations).subscribe(res => {
          this.locations = res;
      })
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

  searchLocations(page) {
      page = page || 0;
      this.objSearchLocation.page = page;
      //this.objSearchLocation.pageSize = 2;

    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.objSearchLocation.agentId = Number(this.objSearchLocation.agentId);
     
      this.apiservice.PostData(urls.UrlModel.ManageLocations.SearchLocation, this.objSearchLocation).subscribe(res => {
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.locations = res;
        //   this.loading = false;
        $('#global-loader').fadeOut('slow'); 
      });
  }

  ViewLocationDetails(location) {
      this.LocationDetails = location;
  }

  editLocation(location) {
      this.router.navigate(['add-sales-points-location', location.locationId ? location.locationId : 1]);
  }

  InAvtivateLocation(location) {
      this.apiservice.PostData(urls.UrlModel.ManageLocations.EditLocation,
          {
              locationId: 0,
              name: location.name,
              email: location.email,
              phoneNumber: location.phoneNumber,
              agentId: location.agentId,
              status: this.StatusEnums.InActive
          }
      ).subscribe(res =>
      {
          this.toast.success('Location status updated successfully!', 'Done');
          this.searchLocations(0);
      }, error => {
         // this.toast.error('Unable to update location status', 'Error');
      })
  }
}

export interface ISearchSalesPointLocation {
  name: string,
  email: string,
  phoneNumber: string,
  agentId: number,
  status: number,
  page: number,
  pageSize: number
}

