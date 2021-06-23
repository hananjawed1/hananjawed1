import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Status } from '../../pages/add-agent/add-agent.component';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-sales-point-user',
  templateUrl: './sales-point-user.component.html',
  styleUrls: ['./sales-point-user.component.scss']
})
export class SalesPointUserComponent implements OnInit {

  formSalesUser:FormGroup;
  formUpdateSalesUser:FormGroup;
  objSearchUser: ISearchSalesUser = {
  agentId: 0, email: '',
  locationId: 0, name: '',
  phone: '', status: 0, page: 0,
  pageSize: 10}
  salesUserId:number;
  salesUsers: any;
  agents: any;
  locations: any;
  StatusEnums = Status;
  siteLabel: any;
  AgentDetails: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;

  constructor(public apiservice: APIService, public router: Router, public activeroute: ActivatedRoute, public fb: FormBuilder, public toast: ToastService)
  {
      this.getAllAgents();
      this.getAllLocations();
      this.searchSalesPointUser(0);
  }

  ngOnInit(): void {
      this.activeroute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  resetSearch() {
     this. objSearchUser= {
          agentId: 0, email: '',
          locationId: 0, name: '',
          phone: '', status: 0, page: 0,
          pageSize: 10
      }

      this.searchSalesPointUser(0);
  }

  getAllLocations() {
      this.apiservice.getData(urls.UrlModel.ManageLocations.AllLocations).subscribe(res => {
          this.locations = res;
      })
  }

  getAllAgents() {
      this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
      })
  }

  ViewLocationDetails(location) {
      this.AgentDetails = location;
  }
  
  InActivateAgent(data) {
      this.apiservice.getData(urls.UrlModel.Common.ActorStatusUpdate + '?id=' + data.user.id).subscribe(res => {
          this.toast.success('Status has been updated!', 'Status Updated');
          this.searchSalesPointUser(0);
      }, error => {
          // this.toast.error('Unable to update the status!', 'Status Updated');
      });
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

  searchSalesPointUser(page)
  {
      page = page || 0;
      this.objSearchUser.page = page;
      this.objSearchUser.agentId = Number(this.objSearchUser.agentId);
      this.objSearchUser.locationId = Number(this.objSearchUser.locationId);
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 

      this.apiservice.PostData(urls.UrlModel.ManageSalePointUser.SearchSalesPointUser,this.objSearchUser).subscribe(res=>{
          this.salesUsers = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
        //   this.loading = false;
        $('#global-loader').fadeOut('slow'); 
      })
  }

  editSalesUser(su){
    this.router.navigate(['add-sales-points-users',su.salesPointUserId]);
  }

}

export interface ISearchSalesUser {
  name: string,
  phone: string,
  email: string,
  agentId: number,
  locationId: number,
  status: number,
  page: number,
  pageSize: number
}