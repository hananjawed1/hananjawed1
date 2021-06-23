import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'ls-membership-report',
  templateUrl: './membership-report.component.html',
  styleUrls: ['./membership-report.component.scss']
})
export class MembershipReportComponent implements OnInit {
  objSearchMembership: IsearchMembership =
  {
      agentId: 0, name: '', membershipId: '',  phone: '',  status: 0, 
      membershipTypeId: 0, requestCategory: 0, salesPointUserId: 0, memberShipCount: 0,
      cardStatus: 0
  }
  membershipRequest: MembershipReportRequestSummary =
  {
      today: 0, oneWeek: 0, lastMonth: 0, thisMonth: 0
  }
  agents: any;
  salesPoints: any;
  StatusEnums: any;
  siteLabel: any;
  requestCategory: any;
  members: any;
  loading = false;
  membershipTypes: any;
  public exporting = false;
  memberShipCount: number = 0;

  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
    private authenticationService: AuthenticationService) {
    //this.getMembershipReportCount();
    this.getAllAgents();
    this.getAllSalesPoints();
    this.getAllStatus();
    this.getRequestCategory();
    this.getMembershipTypes();
    this.searchMembership(0);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
        (params: any) => {
            let IsActive = params.get('rtl');
            this.siteLabel = this.apiservice.getAppLabel(IsActive);
        }
    )
  }

  getMembershipReportCount() {
    // this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.apiservice.PostData(urls.UrlModel.ManageMemberships.MembershipReportRequest, {  })
        .subscribe(res => {
            this.membershipRequest = res;
            // this.loading = false;
            $('#global-loader').fadeOut('slow'); 
        })
    }

  resetSearch() {
    this.objSearchMembership =
    {
        agentId: 0, name: '', membershipId: '', phone: '', status: 0, membershipTypeId: 0,
        requestCategory: 0, salesPointUserId: 0, memberShipCount : 0, cardStatus: 0
    }
    this.searchMembership(0);
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
    if (this.objSearchMembership.fromDate + '' == '') {
      this.objSearchMembership.fromDate = null;
    }

    if (this.objSearchMembership.toDate + '' == '') {
      this.objSearchMembership.toDate = null;
    }

    if (this.objSearchMembership.fromApprovedDate + '' == '') {
      this.objSearchMembership.fromApprovedDate = null;
    }

    if (this.objSearchMembership.toApprovedDate + '' == '') {
      this.objSearchMembership.toApprovedDate = null;
    }
    
    this.searchMembership(0);
  }

  searchMembership(page) { 
    // this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.objSearchMembership.agentId = Number(this.objSearchMembership.agentId);
    this.objSearchMembership.status = Number(this.objSearchMembership.status);
    this.objSearchMembership.membershipTypeId = Number(this.objSearchMembership.membershipTypeId);
    this.objSearchMembership.requestCategory = Number(this.objSearchMembership.requestCategory);
    this.objSearchMembership.salesPointUserId = Number(this.objSearchMembership.salesPointUserId);
    this.objSearchMembership.cardStatus = Number(this.objSearchMembership.cardStatus);

    this.apiservice.PostData(urls.UrlModel.ManageMemberships.SearchMembership, this.objSearchMembership)
        .subscribe(res => {
            this.memberShipCount = res.totalCount;
            // this.loading = false;
            $('#global-loader').fadeOut('slow'); 
        })
  }

  goto(url, data) {
    this.router.navigate([url, data.membershipId]);
  }

  public exportToExcel() {
    // this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.exporting = true;
    this.apiservice.PostData(urls.UrlModel.Export.ExportExcel, this.objSearchMembership).subscribe(res => {
        window.location.href = environment.domainURl + res;
        this.exporting = false;
        // this.loading = false;
        $('#global-loader').fadeOut('slow'); 
    });
  }
}

export interface IsearchMembership {
  name: string,
  phone: string,
  membershipId: string,
  agentId?: number,
  status: number,
  membershipTypeId: number,
  requestCategory: number,
  salesPointUserId: number,
  fromDate?: Date,
  toDate?: Date,
  fromApprovedDate?: Date,
  toApprovedDate?: Date,
  memberShipCount?: number,
  cardStatus: number,
}

// tslint:disable-next-line: interface-over-type-literal
export interface MembershipReportRequestSummary {
  today: number,
  oneWeek: number,
  lastMonth: number,
  thisMonth: number,
};