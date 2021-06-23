import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddAgentComponent} from './pages/add-agent/add-agent.component';
import {AddSalespointComponent} from './pages/add-salespoint/add-salespoint.component';
import {FileOpeningDetailsComponent} from './pages/file-opening-details/file-opening-details.component';
import {ManageEmployeeComponent} from './pages/manage-employee/manage-employee.component';
import {MemberDetailsComponent} from './pages/member-details/member-details.component';
import {PurchaseComponent} from './pages/purchase/purchase.component';
import {LoginComponent} from './pages/login/login.component';
import {SalesPointUserComponent} from './pages/sales-point-user/sales-point-user.component';
import {FileOpeningComponent} from './pages/file-opening/file-opening.component';
import {ManageLicenceComponent} from './pages/manage-licence/manage-licence.component';
import {ChecklistManagementComponent} from './pages/checklist-management/checklist-management.component';
import {MembershipRequestComponent} from './pages/membership-request/membership-request.component';
import {AgentsComponent} from './pages/agents/agents.component';
import {MembershipReportComponent} from './pages/membership-report/membership-report.component';
import {NotificationComponent} from './pages/notification/notification.component';
import {AddEmployeeComponent} from './pages/add-employee/add-employee.component';
import {FinancialReportComponent} from './pages/financial-report/financial-report.component';
import {TaskManagementComponent} from './pages/task-management/task-management.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {SecureComponent} from './layout/secure/secure.component';
import {SidebarLayoutComponent} from './layout/sidebar-layout/sidebar-layout.component';
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
import { AddSalesPointsLocationComponent } from './pages//add-sales-points-location/add-sales-points-location.component';
import { AddSalesPointsUsersComponent } from './pages/add-sales-points-users/add-sales-points-users.component';
import { ManageSalesPointLocationsComponent } from './pages/manage-sales-point-locations/manage-sales-point-locations.component';
import { CardStatusesComponent } from './pages/card-statuses/card-statuses.component';
import { CardStatusDetailComponent } from './pages/card-status-detail/card-status-detail.component';
import { AddCardStatusComponent } from './pages/add-card-status/add-card-status.component';
import { InvoiceVoucherComponent } from './pages/invoice-voucher/invoice-voucher.component';
import { ViewCertificateComponent } from './pages/view-certificate/view-certificate.component';
import { ManageGroupsComponent } from './pages/manage-groups/manage-groups.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { FileOpeningTaskDetailsComponent } from './pages/file-opening-task-details/file-opening-task-details.component';
import { InspectionReportComponent } from './pages/inspection-report/inspection-report.component';
import { PrintEntityDocumentsComponent } from './pages/print-entity-documents/print-entity-documents.component';
import { PrintPrivateDocumentsComponent } from './pages/print-private-documents/print-private-documents.component';
import { PrintPersonalDocumentsComponent } from './pages/print-personal-documents/print-personal-documents.component';
import { ClientRequestUpdateComponent } from './pages/client-request-update/client-request-update.component';
import { AddFileOpeningComponent } from './pages/add-file-opening/add-file-opening.component';
import { ViewFileOpeningComponent } from './pages/view-file-opening/view-file-opening.component';
import { ViewClientRequestComponent } from './view-client-request/view-client-request.component';

const routes: Routes = [
  {path: '', redirectTo: 'secure/login', pathMatch: 'full'},
  {
    path: 'secure',
    component: SecureComponent,
    children: [
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: '',
    component: SidebarLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'add-agent', component: AddAgentComponent, canActivate: [AuthGuardService]},
      {path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuardService]},
      {path: 'add-salespoint', component: AddSalespointComponent, canActivate: [AuthGuardService]},
      {path: 'agents', component: AgentsComponent, canActivate: [AuthGuardService]},
      {path: 'checklist-management', component: ChecklistManagementComponent, canActivate: [AuthGuardService]},
      {path: 'assign-check-list-group', component: AssignCheckListGroupComponent, canActivate: [AuthGuardService]},
      {path: 'check-list-group', component: CheckListGroupComponent, canActivate: [AuthGuardService]},
      {path: 'check-list-options', component: CheckListOptionsComponent, canActivate: [AuthGuardService]},
      {path: 'file-opening-details/:id', component: FileOpeningDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'file-opening', component: FileOpeningComponent, canActivate: [AuthGuardService]},
      {path: 'financial-report', component: FinancialReportComponent, canActivate: [AuthGuardService]},
      {path: 'manage-employee', component: ManageEmployeeComponent, canActivate: [AuthGuardService]},
      {path: 'manage-Licence', component: ManageLicenceComponent, canActivate: [AuthGuardService]},
      {path: 'member-details/:id', component: MemberDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'edit-membership/:id', component: EditMembershipComponent, canActivate: [AuthGuardService]},
      {path: 'membership-report', component: MembershipReportComponent, canActivate: [AuthGuardService]},
      {path: 'membership-request', component: MembershipRequestComponent, canActivate: [AuthGuardService]},
      {path: 'notification', component: NotificationComponent, canActivate: [AuthGuardService]},
      {path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuardService]},
      {path: 'sales-point-user', component: SalesPointUserComponent, canActivate: [AuthGuardService]},
      {path: 'task-management', component: TaskManagementComponent, canActivate: [AuthGuardService]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
      {path: 'assign-check-list-group/:id', component: AssignCheckListGroupComponent, canActivate: [AuthGuardService]},
      {path: 'task-management-details/:id', component: TaskManagementDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'add-task-management', component:AddTaskManagementComponent, canActivate: [AuthGuardService]},
      {path: 'add-task-management/:id', component:AddTaskManagementComponent, canActivate: [AuthGuardService]},
      {path: 'add-notification', component: AddNotificationComponent, canActivate: [AuthGuardService]},
      {path: 'manage-inspection-request', component: ManageInspectionRequestComponent, canActivate: [AuthGuardService]},
      {path: 'membership-waiting', component: DraftMembershipManagementComponent, canActivate: [AuthGuardService]},
      {path: 'manage-uae-areas', component: ManageUaeAreasComponent, canActivate: [AuthGuardService]},
      {path: 'add-uae-areas', component: AddUaeAreasComponent, canActivate: [AuthGuardService]},
      {path: 'add-uae-areas/:id', component: AddUaeAreasComponent, canActivate: [AuthGuardService]},
      {path: 'add-sales-points-location', component: AddSalesPointsLocationComponent , canActivate: [AuthGuardService]},
      {path: 'add-sales-points-location/:id', component: AddSalesPointsLocationComponent, canActivate: [AuthGuardService]},
      {path: 'add-sales-points-users', component: AddSalesPointsUsersComponent, canActivate: [AuthGuardService] },
      {path: 'add-sales-points-users/:id', component: AddSalesPointsUsersComponent, canActivate: [AuthGuardService] },
      {path: 'manage-sales-point-locations', component: ManageSalesPointLocationsComponent, canActivate: [AuthGuardService]},
      {path: 'card-statuses', component: CardStatusesComponent, canActivate: [AuthGuardService]},
      {path: 'card-status-detail/:id', component: CardStatusDetailComponent, canActivate: [AuthGuardService]},
      {path: 'add-card-status/:id', component: AddCardStatusComponent, canActivate: [AuthGuardService]},
      {path: 'edit-card-status/:id', component: AddCardStatusComponent, canActivate: [AuthGuardService]},
      {path: 'manage-groups', component: ManageGroupsComponent, canActivate: [AuthGuardService]},
      {path: 'file-opening-task-details/:id', component: FileOpeningTaskDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'client-request-update/:id', component: ClientRequestUpdateComponent, canActivate: [AuthGuardService]},
      {path: 'add-file-opening',  component: AddFileOpeningComponent, canActivate: [AuthGuardService]},
      {path: 'add-file-opening/:id', component: AddFileOpeningComponent, canActivate: [AuthGuardService]},
      {path: 'view-file-opening', component: ViewFileOpeningComponent,canActivate: [AuthGuardService]},
      {path: 'view-client-request/:id', component: ViewClientRequestComponent, canActivate:[AuthGuardService]},
      {path: '**', redirectTo: 'secure/login', pathMatch: 'full'}
    ]
  },
  
  {path: 'view-certificate/:id', component: ViewCertificateComponent },
  {path: 'invoice-voucher/:id', component: InvoiceVoucherComponent },
  {path: 'inspection-report/:id', component: InspectionReportComponent},
  {path: 'print-entity-documents/:id', component: PrintEntityDocumentsComponent},
  {path: 'print-private-documents/:id', component: PrintPrivateDocumentsComponent},
  {path: 'print-personal-documents/:id', component: PrintPersonalDocumentsComponent},
  {path: '**', redirectTo: 'secure/login', pathMatch: 'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
