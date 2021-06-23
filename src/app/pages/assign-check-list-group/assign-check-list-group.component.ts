import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Console } from 'console';
import { Status } from '../../pages/add-agent/add-agent.component';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-assign-check-list-group',
  templateUrl: './assign-check-list-group.component.html',
  styleUrls: ['./assign-check-list-group.component.scss']
})
export class AssignCheckListGroupComponent  implements OnInit {
  
  ObjGroup:IGroup={
    assignCheckListId: 0, name: '', checkListGroupId: 0, checkListOptionIds: 0, status:1
  }

  formGroup:FormGroup;
  siteLabel: any;
  loading = false;
  checkListGroup: any;
  checkListOption: any;
  assignCheckListOption: any;
  StatusEnums = Status;
  
  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public toast: ToastService)
  {
    this.ObjGroup.assignCheckListId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.createGroupForm();
    this.getAllCheckListGroup();
    this.getCheckListOptions();

    if(this.ObjGroup.assignCheckListId != 0){
      this.getAllAssignCheckListGroupListById(this.ObjGroup.assignCheckListId);    
    }
  }

  ngOnInit(): void
  { 
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
        let IsActive = params.get('rtl');
        this.siteLabel = this.apiservice.getAppLabel(IsActive);
    })
  }

  getAllCheckListGroup() {
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetCheckListGroup)
        .subscribe(res => {
            this.checkListGroup = res;
        }, error => {
    });
  }

  getCheckListOptions() {
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetCheckListOption)
        .subscribe(res => {
            this.checkListOption = res; 
        }, error => {
    });
  }

  getAllAssignCheckListGroupListById(editAssignCheckListId : Number) {    
    // this.loading = true;
    $('#global-loader').fadeIn('fast');
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetAllAssignCheckListGroupById + '?id=' + editAssignCheckListId)
      .subscribe(res => {
        this.ObjGroup = res;
        this.ObjGroup.checkListOptionIds = Array(this.ObjGroup.checkListOptionIds.split(",").map(x=>+x))[0];
        this.loading = false;
      }, error => {
        this.loading = false;
      });  
  }

  createGroupForm(){
    this.formGroup=this.fb.group({
      name : new FormControl('',Validators.required),  
      checkListGroup : new FormControl(0),
      checkListOption : new FormControl(0),
      status:new FormControl('1',Validators.required),
    })
  }

  SaveCheckListGroup() {
    if (this.formGroup.valid) {
      // this.loading = true;
      $('#global-loader').fadeIn('fast');
      this.ObjGroup.checkListGroupId = Number(this.ObjGroup.checkListGroupId);

      if(Number(this.ObjGroup.checkListOptionIds) != 0){
        this.ObjGroup.checkListOptionIds = this.ObjGroup.checkListOptionIds.join(",");
      }else{
        this.ObjGroup.checkListOptionIds = "0";
      }

      this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageEmployee.AddAssignCheckListGroup, this.ObjGroup).subscribe(res => {
          this.toast.success('Record has been saved successfully!', 'Done')
          this.loading = false;
          this.createGroupForm();
          this.getAllCheckListGroup();
          this.ObjGroup.checkListGroupId = 0;
          this.ObjGroup.checkListOptionIds = 0;
          this.ObjGroup.assignCheckListId = 0;
          this.router.navigateByUrl('/checklist-management');
      }, error => {
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
          // this.toast.error('Unable to save agent records', 'Error');
      });
    }
  }
}

export interface IGroup{
  assignCheckListId: number,
  name: string,
  checkListGroupId: number,
  checkListOptionIds: any,
  status: number,
}


