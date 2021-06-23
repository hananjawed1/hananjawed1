import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { isNumber } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Status } from '../../pages/add-agent/add-agent.component';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit,OnDestroy {
  @ViewChild('closebutton') closebutton;
  @ViewChild('attachments') attachment: any;

  objSearchEmpl: IseaarchEmployee = {
      email: '', employeeNumber: '', name: '', phone: '', role: '', status: 0,
      page: 0,
      pageSize: 10
  };

  employeeRequest: EmployeeRequestSummary =
  {
      admin: 0, subAdmin: 0, receptions: 0, totalAccounts: 0
  }

  employeeId : number;
  profilePic:File;
  preview:any;
  loadingPrifilePic = false;
  employes:any;
  empGroups:any;
  roles: any;
  StatusEnums = Status;
  EmployeeDetails: any;
  siteLabel: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;
  employeeGroupNameList : any;
  selectedUserAccess = 0;
  UserAccess = 0;

  constructor(public apiservice: APIService, private route: ActivatedRoute,public router:Router,public toast:ToastService) {
      this.getEmployeeRequestCount();
      this.searchEmployee(0);
      this.getRoles();
      this.UserAccess = Number(JSON.parse(localStorage.getItem('adminUser')).userAccess);
  }

  getEmployeeRequestCount() {
    this.loading = true;
    this.apiservice.PostData(urls.UrlModel.ManageEmployee.EmployeeRequest, {  })
        .subscribe(res => {
            this.employeeRequest = res;
            this.loading = false;
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

  searchEmployee(page)
  {
      page = page || 0;
      this.objSearchEmpl.page = page;
      $('#global-loader').fadeIn('fast');      
      //this.loading = true;
      this.apiservice.PostData(urls.UrlModel.ManageEmployee.SearchEmployee, this.objSearchEmpl).subscribe(res => {
          this.employes = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          //this.loading = false;
          $('#global-loader').fadeOut('slow');
      });
  }

  EditEmployee(obj){
      this.router.navigate(['add-employees',obj.employeeId]);
  }

  UpdateEmployeeID(empId : number){
      this.employeeId = empId;
  }

  onChange($event){
      this.profilePic = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
          let reader = new FileReader();
          reader.readAsDataURL(this.profilePic);
          reader.onload = (e)=> {
          this.preview=reader.result;
        };
        reader.onerror = function (error) {};
      }
  }

  uploadProfilePicture(){
      if(this.profilePic == null && this.selectedUserAccess == 0){
        this.toast.error('Select the profile Picture', 'Error');
        return false;
      }

      this.loadingPrifilePic = true;
      let formdata = new FormData();
      formdata.append('EmployeeId', this.employeeId+'');
      formdata.append('ProfilePic', this.profilePic);
      formdata.append('UserAccess', this.selectedUserAccess + '');

      this.apiservice.PostImageData(urls.UrlModel.ManageEmployee.UpdateEmployeeProfilePicture, formdata).subscribe(res => {
         this.toast.success('Update Profile successfully!', 'Done');
          this.closebutton.nativeElement.click();
          this.employeeId = 0;
          this.profilePic = null;
          this.attachment.nativeElement.value = '';
          this.preview = "";
          this.loadingPrifilePic = false;
          this.searchEmployee(0);
      }, eror => {
        this.loadingPrifilePic = false;
          this.toast.error('Unable To Update Profile!', 'Error');
      });
  }

  removedLastAttachment(){
      this.attachment.nativeElement.value = '';
      this.preview = "";
  }

  InactivateEmployee(emp) {
      this.apiservice.getData(urls.UrlModel.Common.ActorStatusUpdate + '?id=' + emp.user.id)
      .subscribe(res => {
         this.toast.success('Status has been updated!', 'Status Updated');
          this.searchEmployee(0);
      }, error => {
              //this.apiservice.toastrservice.success('Unable to update the status!', 'Status Updated');
      });
  }

  getRoles() {
      this.apiservice.getData(urls.UrlModel.ManageEmployee.AllRoles)
      .subscribe(res => {
          this.roles = res;            
      }, error => {});
  }

  resetSearch()
  {
      this.objSearchEmpl.status=0;
      this.objSearchEmpl.role ='';
      this.objSearchEmpl.phone='';
      this.objSearchEmpl.name='';
      this.objSearchEmpl.employeeNumber='';
      this.objSearchEmpl.email = '';
      this.objSearchEmpl.page = 0;
      this.objSearchEmpl.pageSize = 10;
      this.searchEmployee(0);
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  ngOnDestroy()
  {
  //this.apiservice.subscriptions?this.apiservice.subscriptions.unsubscribe():null;
  }

  getEmpGroupByIds(empGroupIds : string) {
      this.apiservice.getData(urls.UrlModel.ManageEmployee.GetEmployeeGroupById + '?empGroupIds=' + empGroupIds)
      .subscribe(res => {
          for (let i = 0; i < res.length; i++) {
              if(i == 0){
                  this.empGroups = res[i].name;
              }else{
                  this.empGroups = this.empGroups + ", " + res[i].name;
              }
          }
      }, error => {});
  }

  ViewDetails(emp){
      this.EmployeeDetails = emp;
      var empGrpNameCount = 0;
      if(emp.selectedEmployeeGroupVM != null && emp.selectedEmployeeGroupVM.length > 0){
          emp.selectedEmployeeGroupVM.forEach(element => {
              if(empGrpNameCount == 0){
                  this.employeeGroupNameList = element.name
              }else{
                  this.employeeGroupNameList = this.employeeGroupNameList + ", " + element.name;
              }
              empGrpNameCount = empGrpNameCount + 1;
          });
      }else{
          this.employeeGroupNameList = 'NA';
      }
  }
}

export interface IseaarchEmployee{
  name: string,
  phone: string,
  email: string,
  status: number,
  role: string,
  employeeNumber: string,
  page: number,
  pageSize: number
}


// tslint:disable-next-line: interface-over-type-literal
export interface EmployeeRequestSummary {
    admin: number,
    subAdmin: number,
    receptions: number,
    totalAccounts: number,
};

