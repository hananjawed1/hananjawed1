import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import * as chart from './charts.js';
import { BehaviorSubject, combineLatest, Observable, Subscription, Subject, of, merge } from 'rxjs';
import { switchMap, map, tap, startWith, scan, mergeMap, take } from 'rxjs/operators';
import { APIService } from '../../_services/api.service';
import * as urls from '../../_services/ServiceUrls';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services';
// import { agetSalesPointChart } from './charts1.js';

declare const Morris;

@Component({
  selector: 'ls-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  //public membershipRequest$: Observable<MembershipRequestSummary>;
  //public membershipRequestState$: Observable<MembershipRequestSummary>;
  membershipRequest: MembershipRequestSummary =
  {
      approvedRequest: 0, freezed: 0, otherRequest: 0, pendingRequest: 0,
      totalPenddingCards: 0, totalPrintedCards: 0, totalRequest: 0, waiting: 0
  }  

  //public membershipType$: Observable<MembershipTypeSummary>;
  //public membershipTypeState$: Observable<MembershipTypeSummary>;
  membershipType: MembershipTypeSummary = { resident: 0, tourist: 0, diplomat: 0 }  

  //public agentSummaryAll$: Observable<AgentSummaryAll>;
  //public agentSummaryAllState$: Observable<AgentSummaryAll>;
  agentSummaryAll: AgentSummaryAll = { totalAgents: 0, totalSalePoints: 0, totalPurchases: 0, totalAmountPurchases: 0 }  

  //public fileOpening$: Observable<FileOpeningSummary>;
  //public fileOpeningState$: Observable<FileOpeningSummary>;
  fileOpening: FileOpeningSummary = { 
    totalRequest: 0, totalPendingRequest: 0, totalApprovedLicense: 0, totalNewLicense: 0, totalRenewalLicense: 0, totalHotel: 0, 
    totalBar: 0, totalClub: 0, totalRestaurant: 0,  totalHotelApartments: 0, totalReexportCompanies: 0, totalFloatingRestaurants: 0,
    totalShops: 0, totalImportExportCompanies: 0, totalCamp: 0, totalHospitalityLicense : 0
  } 

  public fromDateFO = new BehaviorSubject<Date>(undefined);
  public toDateFO = new BehaviorSubject<Date>(undefined);
  public fromDateValueFO: Date;
  public toDateValueFO: Date;
  private dateChangedFO$: Observable<any>;

  public fromDate = new BehaviorSubject<Date>(undefined);
  public toDate = new BehaviorSubject<Date>(undefined);
  public fromDateValue: Date;
  public siteLabel: any;

  public toDateValue: Date;
  private dateChanged$: Observable<any>;
  private rtlParaSubscription: Subscription;

  private dateChanging$: Observable<any>;
  private dateChangingFO$: Observable<any>;
  currentUser: any;
  memberShipRequestAndfileOpeningData: any;
  taskManagementCounts: TaskManagementCounts = { completed: 0, pending: 0 } 

  activeEmpCount = 0;
  activeClientCount = 0;

  constructor(private apiservice: APIService, private activeRoute: ActivatedRoute, private authenticationService: AuthenticationService) 
  {
    this.currentUser = this.authenticationService.currentUserValue;

    this.dateChanged$ = combineLatest([this.toDate, this.fromDate]);
    this.dateChangedFO$ = combineLatest([this.toDateFO, this.fromDateFO]);

    this.dateChanging$ = this.dateChanged$.pipe(
      map(() => ({ loading: true })),
    );

    this.dateChangingFO$ = this.dateChangedFO$.pipe(
      map(() => ({ loading: true })),
    );

    // this.membershipRequest$ = this.dateChanged$.pipe(
    //   mergeMap(([to, from]) => {
    //     return this.apiservice.PostData(urls.UrlModel.Dashboard.MembershipRequest, { toDate: to, fromDate: from }).pipe(
    //       map((data) => ({ ...data, loading: false })),
    //     );
    //   }),
    // );

    this.dateChanged$.pipe(
      mergeMap(([to, from]) => {
        return this.apiservice.PostData(urls.UrlModel.Dashboard.MembershipRequest, { toDate: to, fromDate: from }).pipe(
          map((data) => ({ ...data, loading: false })),
        );
      })
    )
    .subscribe(ret=> {
      this.membershipRequest = ret;
    });

    // this.membershipRequestState$ = merge(this.dateChanging$, this.membershipRequest$).pipe(
    //   scan((state, update) => ({ ...state, ...update })),
    // );

    // this.membershipType$ = this.dateChanged$.pipe(
    //   switchMap(([to, from]) => {
    //     return this.apiservice.PostData(urls.UrlModel.Dashboard.MembershipType, { toDate: to, fromDate: from }).pipe(
    //       map(data => ({ ...data, loading: false }))
    //     );
    //   })
    // );

    this.dateChanged$.pipe(
      switchMap(([to, from]) => {
        return this.apiservice.PostData(urls.UrlModel.Dashboard.MembershipType, { toDate: to, fromDate: from }).pipe(
          map((data) => ({ ...data, loading: false })),
        );
      })
    )
    .subscribe(ret=> {
      this.membershipType = ret;      
      chart.membershipTypeStatistics(this.membershipType.resident, this.membershipType.tourist, this.membershipType.diplomat);
    });

    // this.membershipType$ = merge(this.dateChanging$, this.membershipType$).pipe(
    //   scan((state, update) => ({ ...state, ...update })),
    // );

    // this.agentSummaryAll$ = this.dateChanged$.pipe(
    //   switchMap(([to, from]) => this.apiservice.PostData(urls.UrlModel.Dashboard.AgentSummaryAll, { toDate: to, fromDate: from })),
    //   map((data: any) => ({
    //     totalAgents: data.agentSummary.total,
    //     totalSalePoints: data.salePointSummary.total,
    //     totalPurchases: data.purchaseSummary.total,
    //     totalAmountPurchases: data.purchaseSummary.totalAmount,
    //     loading: false
    //   } as AgentSummaryAll))
    // );

    this.dateChanged$.pipe(
      switchMap(([to, from]) => {
        return this.apiservice.PostData(urls.UrlModel.Dashboard.AgentSummaryAll, { toDate: to, fromDate: from }).pipe(
          map((data: any) => ({ 
            totalAgents: data.agentSummary.total,
            totalSalePoints: data.salePointSummary.total,
            totalPurchases: data.purchaseSummary.total,
            totalAmountPurchases: data.purchaseSummary.totalAmount,
            loading: false  
          })),
        );
      })
    )
    .subscribe(ret=> {
      this.agentSummaryAll = ret;
      chart.agetSalesPointChart(this.agentSummaryAll.totalAgents, this.agentSummaryAll.totalSalePoints);
    });

    // this.agentSummaryAllState$ = merge(this.dateChanging$, this.agentSummaryAll$).pipe(
    //   scan((state, update) => ({ ...state, ...update }))
    // );

    // this.fileOpening$ = this.dateChangedFO$.pipe(
    //   switchMap(([to, from]) => {
    //     return this.apiservice.PostData(urls.UrlModel.Dashboard.FileOpening, { toDate: to, fromDate: from }).pipe(
    //       map(data => ({ ...data, loading: false }))
    //     );
    //   })
    // );

    this.dateChanged$.pipe(
      switchMap(([to, from]) => {
        return this.apiservice.PostData(urls.UrlModel.Dashboard.FileOpening, { toDate: to, fromDate: from }).pipe(
          map((data) => ({ ...data, loading: false })),
        );
      })
    )
    .subscribe(ret=> {
      this.fileOpening = ret;
    });

    // this.fileOpeningState$ = merge(this.dateChangingFO$, this.fileOpening$).pipe(
    //   scan((state, update) => ({ ...state, ...update }))
    // );

    this.getMembershipTypes();
    this.getActiveEmpCount();
    this.getActiveClientCount();
    this.getTaskMamangementCounts();
  }

  public getMembershipTypes() {
    this.apiservice.getData(urls.UrlModel.Common.MemberShipRequestAndfileOpeningData).subscribe(res => {
        this.memberShipRequestAndfileOpeningData = res;
    })
  }

  public getActiveEmpCount() {
    this.apiservice.getData(urls.UrlModel.ManageEmployee.AllActiveEmployee).subscribe(res => {
        this.activeEmpCount = res;
    })
  }

  public getActiveClientCount() {
    this.apiservice.getData(urls.UrlModel.FileRequest.AllActiveClients).subscribe(res => {
        this.activeClientCount = res;
    })
  }

  public getTaskMamangementCounts() {
    this.apiservice.getData(urls.UrlModel.TaskManagement.GetTaskManagementCount).subscribe(res => {
      this.taskManagementCounts = res;
    })
  }

  public changeFromDate() {
    this.fromDate.next(this.validDate(this.fromDateValue));
  }

  public changeToDate() {
    this.toDate.next(this.validDate(this.toDateValue));
  }

  public changeFromDateFO() {
    this.fromDateFO.next(this.validDate(this.fromDateValueFO));
  }

  public changeToDateFO() {
    this.toDateFO.next(this.validDate(this.toDateValueFO));
  }

  private validDate(date: Date) {
    return date + '' === '' ? null : date;
  }

  ngOnDestroy(): void {
    this.rtlParaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.rtlParaSubscription = this.activeRoute.queryParamMap.subscribe(
      (params: any) => {
        const isActive = params.get('rtl');
        this.siteLabel = this.apiservice.getAppLabel(isActive);
      }
    );
  }

  ngAfterViewInit(): void {
    // setTimeout(charts, 100);
    chart.membershipRequestPerWeekStatus();
    chart.membershipRequestPerSixMonth();
    chart.recentTaskUpdateForEmpAndClient();
  }

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
};

// tslint:disable-next-line: interface-over-type-literal
export interface  MembershipTypeSummary {
  resident: number;
  tourist: number;
  diplomat: number;
};

// tslint:disable-next-line: interface-over-type-literal
export interface AgentSummaryAll {
  totalAgents: number;
  totalSalePoints: number;
  totalPurchases: number;
  totalAmountPurchases: number;
};

// tslint:disable-next-line: interface-over-type-literal
export interface FileOpeningSummary {
  totalRequest: number;
  totalPendingRequest: number;
  totalApprovedLicense: number;
  totalNewLicense: number;
  totalRenewalLicense: number;
  totalHotel: number;
  totalBar: number;
  totalClub: number;
  totalRestaurant: number;
  totalHotelApartments: number;
  totalReexportCompanies: number;
  totalFloatingRestaurants: number;
  totalShops: number;
  totalImportExportCompanies: number;
  totalCamp: number;
  totalHospitalityLicense : number;
};

export interface TaskManagementCounts { 
  completed: number;
  pending: number;
} 