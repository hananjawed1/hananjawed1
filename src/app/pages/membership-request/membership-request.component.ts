
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'ls-membership-request',
  templateUrl: './membership-request.component.html',
  styleUrls: ['./membership-request.component.scss']
})
export class MembershipRequestComponent implements OnInit, OnDestroy {

  objSearchMembership: IsearchMembership =
    {
        agentId: 0, name: '', membershipId: '', phone: '', status: 0,  page: 0,
        pageSize: 10, membershipTypeId: 0, requestCategory: 0, salesPointUserId: 0, emiratesIdNumber: ''
    }

    membershipRequest: MembershipRequestSummary =
    {
        approvedRequest: 0, freezed: 0, otherRequest: 0, pendingRequest: 0, newRequest : 0,
        totalPenddingCards: 0, totalPrintedCards: 0, totalRequest: 0, waiting: 0
    }

    agents: any;
    salesPoints: any; 
    StatusEnums: any;
    siteLabel: any;
    requestCategory: any;
    //membershipRequest : Observable<MembershipRequestSummary>;
    //membershipRequest: any;
    members: any;
    loading = false;
    tableLoading = false;
    page: number = 0;
    pagesCount: number = 0;
    totalCount: number = 0;
    membershipTypes: any;
    public exporting = false;
    dtTrigger: Subject<any> = new Subject<any>();
    //dtOptions: DataTables.Settings = {};
    
    constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,
        private authenticationService: AuthenticationService) {
        this.getMembershipRequestCount();
        this.getAllAgents();
        this.getAllSalesPoints();
        this.getAllStatus();
        this.getRequestCategory();
        this.getMembershipTypes();
        this.setMembershipDataInSession();
        this.searhMembership(0);
    }


    getMembershipRequestCount() {
        this.loading = true;
        this.apiservice.PostData(urls.UrlModel.Dashboard.MembershipRequest, { toDate: null, fromDate: null })
            .subscribe(res => {
                this.membershipRequest = res;
                this.loading = false;
            })
    }

    ngOnInit(): void {        
        this.searhMembership(this.objSearchMembership.page);

        this.route.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.apiservice.getAppLabel(IsActive);
            }
        )
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    resetSearch() {
        this.objSearchMembership =
        {
            agentId: 0, name: '', membershipId: '', phone: '', status: 0, page: 0,
            pageSize: 10, membershipTypeId: 0, requestCategory: 0,
            salesPointUserId: 0, emiratesIdNumber : ''
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
        this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
            this.agents = res;
        })
    }

    getAllSalesPoints() {
        this.apiservice.getData(urls.UrlModel.Common.AllSalesPoints).subscribe(res => {
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
        console.log("called...");
        page = page || 0;
        //this.tableLoading = true;
        $('#global-loader').fadeIn('fast');
        this.objSearchMembership.page = page;
        this.objSearchMembership.agentId = Number(this.objSearchMembership.agentId);
        this.objSearchMembership.status = Number(this.objSearchMembership.status);
        this.objSearchMembership.membershipTypeId = Number(this.objSearchMembership.membershipTypeId);
        this.objSearchMembership.requestCategory = Number(this.objSearchMembership.requestCategory);
        this.objSearchMembership.salesPointUserId = Number(this.objSearchMembership.salesPointUserId);

        sessionStorage.setItem('FilterOptions', JSON.stringify(this.objSearchMembership));

        this.apiservice.PostData(urls.UrlModel.ManageMemberships.SearchMembership, this.objSearchMembership)
            .subscribe(res => {
                this.members = res.items;
                //this.tableLoading = false;
                this.page = res.page;                
                this.pagesCount = res.totalPages;
                this.totalCount = res.totalCount;
                $('#global-loader').fadeOut('slow');
                //this.dtTrigger.next();
            })
    }

    setMembershipDataInSession(){
        var FilterOptionsData = JSON.parse(sessionStorage.getItem('FilterOptions'));
        if(FilterOptionsData != null){
            this.objSearchMembership.agentId = FilterOptionsData.agentId;
            this.objSearchMembership.name = FilterOptionsData.name;
            this.objSearchMembership.membershipId = FilterOptionsData.membershipId;
            this.objSearchMembership.phone = FilterOptionsData.phone;
            this.objSearchMembership.status = FilterOptionsData.status;
            this.objSearchMembership.page = FilterOptionsData.page;
            this.objSearchMembership.pageSize = FilterOptionsData.pageSize;
            this.objSearchMembership.membershipTypeId = FilterOptionsData.membershipTypeId;
            this.objSearchMembership.requestCategory = FilterOptionsData.requestCategory;
            this.objSearchMembership.salesPointUserId = FilterOptionsData.salesPointUserId;
            this.objSearchMembership.expirationDate = FilterOptionsData.expirationDate;
            this.objSearchMembership.registerationDate = FilterOptionsData.registerationDate;
        }
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
    name: string,
    phone: string,
    membershipId: string,
    agentId?: number,
    status: number,
    page: number,
    pageSize: number,
    membershipTypeId: number,
    registerationDate?: Date,
    expirationDate?: Date,
    requestCategory: number,
    salesPointUserId: number,
    emiratesIdNumber: string
}

// tslint:disable-next-line: interface-over-type-literal
export interface MembershipRequestSummary {
    approvedRequest: number,
    freezed: number,
    otherRequest: number,
    pendingRequest: number,
    totalPenddingCards: number,
    totalPrintedCards: number,
    totalRequest: number,
    waiting: number
    newRequest: number,
};

//export enum MembershipStatus {
//    New = 1,
//    Approved = 2,
//    Rejected = 3,
//    Pending = 4,
//    Returned = 5,
//    ExpiringInMonth = 6,
//    Expired = 7,
//    WaitingForHighAdminApproval = 8,
//    Freezed = 9
//}
