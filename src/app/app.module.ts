import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import {AddAgentComponent} from './pages/add-agent/add-agent.component';
import {AddEmployeeComponent} from './pages/add-employee/add-employee.component';
import {AddSalespointComponent} from './pages/add-salespoint/add-salespoint.component';
import {AgentsComponent} from './pages/agents/agents.component';
import {ChecklistManagementComponent} from './pages/checklist-management/checklist-management.component';
import {FileOpeningDetailsComponent} from './pages/file-opening-details/file-opening-details.component';
import {FileOpeningComponent} from './pages/file-opening/file-opening.component';
import {FinancialReportComponent} from './pages/financial-report/financial-report.component';
import {LoginComponent} from './pages/login/login.component';
import {ManageEmployeeComponent} from './pages/manage-employee/manage-employee.component';
import {ManageLicenceComponent} from './pages/manage-licence/manage-licence.component';
import {MemberDetailsComponent} from './pages/member-details/member-details.component';
import {MembershipReportComponent} from './pages/membership-report/membership-report.component';
import {MembershipRequestComponent} from './pages/membership-request/membership-request.component';
import {NotificationComponent} from './pages/notification/notification.component';
import {PurchaseComponent} from './pages/purchase/purchase.component';
import {SalesPointUserComponent} from './pages/sales-point-user/sales-point-user.component';
import {TaskManagementComponent} from './pages/task-management/task-management.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {GlobalLoaderComponent} from './layout/global-loader/global-loader.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {HeaderComponent} from './layout/header/header.component';
import {SecureComponent} from './layout/secure/secure.component';
import {SidebarLayoutComponent} from './layout/sidebar-layout/sidebar-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { EditMembershipComponent } from './pages/edit-membership/edit-membership.component';
import { AssignCheckListGroupComponent } from './pages/assign-check-list-group/assign-check-list-group.component';
import { CheckListGroupComponent } from './pages/check-list-group/check-list-group.component';
import { CheckListOptionsComponent } from './pages/check-list-options/check-list-options.component';
import { TaskManagementDetailsComponent } from './pages/task-management-details/task-management-details.component';
import { AddTaskManagementComponent } from './pages/add-task-management/add-task-management.component';
import { AddNotificationComponent } from './pages/add-notification/add-notification.component';
import { ManageInspectionRequestComponent } from './pages/manage-inspection-request/manage-inspection-request.component';
import { DraftMembershipManagementComponent } from './pages/draft-membership-management/draft-membership-management.component';
import { ManageUaeAreasComponent } from './pages/manage-uae-areas/manage-uae-areas.component';
import { AddUaeAreasComponent } from './pages/add-uae-areas/add-uae-areas.component';
import { ManageSalesPointLocationsComponent } from './pages/manage-sales-point-locations/manage-sales-point-locations.component';
import { AddSalesPointsLocationComponent } from './pages/add-sales-points-location/add-sales-points-location.component';
import { AddSalesPointsUsersComponent } from './pages/add-sales-points-users/add-sales-points-users.component';
import { CardStatusesComponent } from './pages/card-statuses/card-statuses.component';
import { CardStatusDetailComponent } from './pages/card-status-detail/card-status-detail.component';
import { AddCardStatusComponent } from './pages/add-card-status/add-card-status.component';
import { InvoiceVoucherComponent } from './pages/invoice-voucher/invoice-voucher.component';
import { ViewCertificateComponent } from './pages/view-certificate/view-certificate.component';
import { ManageGroupsComponent } from './pages/manage-groups/manage-groups.component';
import { FileOpeningTaskDetailsComponent } from './pages/file-opening-task-details/file-opening-task-details.component';
import { InspectionReportComponent } from './pages/inspection-report/inspection-report.component';
import { PrintEntityDocumentsComponent } from './pages/print-entity-documents/print-entity-documents.component';
import { PrintPrivateDocumentsComponent } from './pages/print-private-documents/print-private-documents.component';
import { PrintPersonalDocumentsComponent } from './pages/print-personal-documents/print-personal-documents.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientRequestUpdateComponent } from './pages/client-request-update/client-request-update.component';
import { AddFileOpeningComponent } from './pages/add-file-opening/add-file-opening.component';
import { ViewFileOpeningComponent } from './pages/view-file-opening/view-file-opening.component';
import { ViewClientRequestComponent } from './view-client-request/view-client-request.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAgentComponent,
    AddEmployeeComponent,
    AddSalespointComponent,
    AgentsComponent,
    ChecklistManagementComponent,
    FileOpeningDetailsComponent,
    FileOpeningComponent,
    FinancialReportComponent,
    LoginComponent,
    ManageEmployeeComponent,
    ManageLicenceComponent,
    MemberDetailsComponent,
    MembershipReportComponent,
    MembershipRequestComponent,
    NotificationComponent,
    PurchaseComponent,
    SalesPointUserComponent,
    TaskManagementComponent,
    DashboardComponent,
    GlobalLoaderComponent,
    SidebarComponent,
    HeaderComponent,
    SecureComponent,
    SidebarLayoutComponent,
    EditMembershipComponent,
    AssignCheckListGroupComponent,
    CheckListGroupComponent,
    CheckListOptionsComponent,
    TaskManagementDetailsComponent,
    AddTaskManagementComponent,
    AddNotificationComponent,
    ManageInspectionRequestComponent,
    DraftMembershipManagementComponent,
    ManageUaeAreasComponent,
    AddUaeAreasComponent,
    ManageSalesPointLocationsComponent,
    AddSalesPointsLocationComponent,
    AddSalesPointsUsersComponent,
    CardStatusesComponent,
    CardStatusDetailComponent,
    AddCardStatusComponent,
    InvoiceVoucherComponent,
    ViewCertificateComponent,
    ManageGroupsComponent,
    FileOpeningTaskDetailsComponent,
    InspectionReportComponent,
    PrintEntityDocumentsComponent,
    PrintPrivateDocumentsComponent,
    PrintPersonalDocumentsComponent,
    ClientRequestUpdateComponent,
    AddFileOpeningComponent,
    ViewFileOpeningComponent,
    ViewClientRequestComponent,
  ],
  imports: [
    BrowserModule,
    OrderModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ToastrModule.forRoot({
      timeOut: 1000000000000,
      positionClass: 'toast-top-left'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB2gfInMmj8qZH-M6rsZMhCnH24dznDn0U',
      libraries: ['places']
    })
  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    // provider used to create fake backend
    fakeBackendProvider, DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
