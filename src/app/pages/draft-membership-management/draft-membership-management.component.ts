import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'ls-draft-membership-management',
  templateUrl: './draft-membership-management.component.html',
  styleUrls: ['./draft-membership-management.component.scss']
})
export class DraftMembershipManagementComponent implements OnInit {
  objSearchMembership: IsearchMembership =
      {
          agentId: 0, name: '', membershipId: '', phone: '', status: 0,
          page: 0,
          pageSize: 10, membershipTypeId: 0,
          requestCategory: 0,
          salesPointUserId: 0
      }
  agents: any;
  salesPoints: any;
  StatusEnums: any;
  siteLabel: any;
  requestCategory: any;
  members: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;
  membershipTypes: any;
  public exporting = false;
  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
      private authenticationService: AuthenticationService) {
      this.getAllAgents();
      this.getAllSalesPoints();
      this.getAllStatus();
      this.getRequestCategory();
      this.getMembershipTypes();
      this.searhMembership(0);
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
      this.objSearchMembership =
      {
          agentId: 0, name: '', membershipId: '', phone: '', status: 0,
          page: 0,
          pageSize: 10, membershipTypeId: 0,
          requestCategory: 0,
          salesPointUserId: 0
      }
      this.searhMembership(0);
  }

  getMembershipTypes() {
      this.apiservice.getData(urls.UrlModel.Common.MembershipType).subscribe(res => {
          this.membershipTypes = res;
      })
  }

  getAllStatus() {
      this.apiservice.getData(urls.UrlModel.Common.AllMembershipStatus).subscribe(res => {
          this.StatusEnums = res;
      })
  }

  getRequestCategory() {
      this.apiservice.getData(urls.UrlModel.Common.RequestCategory).subscribe(res => {
          this.requestCategory = res;
      })
  }

  getAllAgents() {
      this.apiservice.getData(urls.UrlModel.ManageAgent.AllDraftAgents).subscribe(res => {
          this.agents = res;
      })
  }

  getAllSalesPoints() {
      this.apiservice.getData(urls.UrlModel.Common.AllDraftSalesPoints).subscribe(res => {
          this.salesPoints = res;
      })
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

  changeDate() {
      if (this.objSearchMembership.registerationDate + '' == '') {
          this.objSearchMembership.registerationDate = null;
      }

      if (this.objSearchMembership.expirationDate + '' == '') {
          this.objSearchMembership.expirationDate = null;
      }
      this.searhMembership(0);
  }

  searhMembership(page) {
      page = page || 0;
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.objSearchMembership.page = page;
      this.objSearchMembership.agentId = Number(this.objSearchMembership.agentId);
      this.objSearchMembership.status = Number(this.objSearchMembership.status);
      this.objSearchMembership.membershipTypeId = Number(this.objSearchMembership.membershipTypeId);
      this.objSearchMembership.requestCategory = Number(this.objSearchMembership.requestCategory);
      this.objSearchMembership.salesPointUserId = Number(this.objSearchMembership.salesPointUserId);

      this.apiservice.PostData(urls.UrlModel.ManageDraftMemberships.SearchMembership, this.objSearchMembership)
          .subscribe(res => {
              this.members = res.items;
            //   this.loading = false;
            $('#global-loader').fadeOut('slow'); 
              this.page = res.page;
              this.pagesCount = res.totalPages;
          })
  }

  goto(url, data) {
      this.router.navigate([url, data.membershipId]);
  }

  public exportToExcel() {
      this.exporting = true;
      this.apiservice.PostData(urls.UrlModel.Export.ExportExcel, {}).subscribe(res => {
          window.location.href = environment.domainURl + res;
          this.exporting = false;
      });
  }
}

export interface IsearchMembership {
  name: string;
  phone: string;
  membershipId: string;
  agentId?: number;
  status: number;
  page: number;
  pageSize: number;
  membershipTypeId: number;
  registerationDate?: Date;
  expirationDate?: Date;
  requestCategory: number;
  salesPointUserId: number;
}
