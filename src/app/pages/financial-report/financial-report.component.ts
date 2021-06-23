import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../_services';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ls-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {

  objSearchMembership: IsearchMembership =
  {
      agentId: 0, name: '', membershipId: '',  phone: '',  status: 0, membershipTypeId: 0,
      requestCategory: 0, salesPointUserId: 0, memberShipCount: 0, pageName : 'FinancialReport'
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
  memberShipCount: number = 0;

  constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
    private authenticationService: AuthenticationService, private datePipe: DatePipe) {
      //this.setDefaultDate();
      this.getAllAgents();
      //this.searchMembership(0);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
        (params: any) => {
            let IsActive = params.get('rtl');
            this.siteLabel = this.apiservice.getAppLabel(IsActive);
        }
    )
  }

  setDefaultDate(){
      let yesterday = new Date();
      yesterday.setMonth(yesterday.getMonth()-1);
      //this.objSearchMembership.fromApprovedDate = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      this.objSearchMembership.fromApprovedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.objSearchMembership.toApprovedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getAllAgents() {
    this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
        this.agents = res;
    })
  }

  resetSearch() {
    this.objSearchMembership =
    {
        agentId: 0, name: '', membershipId: '', phone: '', status: 0,  membershipTypeId: 0,
        requestCategory: 0, salesPointUserId: 0, memberShipCount : 0, pageName : 'FinancialReport'
    }
    this.setDefaultDate();
    this.searchMembership(0);
  }

  changeDate() {
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

     this.apiservice.PostData(urls.UrlModel.ManageMemberships.SearchMembershipForFinance, this.objSearchMembership).subscribe(res => {
        this.memberShipCount = res.totalCount;
        // this.loading = false;
        $('#global-loader').fadeOut('fast'); 
    })
  }

  goto(url, data) {
    this.router.navigate([url, data.membershipId]);
  }

  public exportToExcel() {
    // this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.exporting = true;
    this.apiservice.PostData(urls.UrlModel.Export.ExportExcelForFinancial, this.objSearchMembership).subscribe(res => {
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
  memberShipCount?: number
  fromApprovedDate?: string,
  toApprovedDate?: string,
  pageName?: string,
}
