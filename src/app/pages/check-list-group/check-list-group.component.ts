import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Console } from 'console';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-check-list-group',
  templateUrl: './check-list-group.component.html',
  styleUrls: ['./check-list-group.component.scss']
})
export class CheckListGroupComponent implements OnInit {

  ObjGroup:IGroup={
    name: '', parentGroupId: 0
  }

  formGroup:FormGroup;
  siteLabel: any;
  loading = false;
  checkListGroup: any;
  
  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,public toast: ToastService)
  {
    this.createGroupForm();
    this.getAllCheckListGroup();
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

  createGroupForm(){
    this.formGroup=this.fb.group({
      name:new FormControl('',Validators.required),  
      parentGroupId:new FormControl(0),
    })
  }

  SaveCheckListGroup() {
    if (this.formGroup.valid) {
      this.loading = true;
      $('#global-loader').fadeIn('fast');
      this.ObjGroup.parentGroupId = Number(this.ObjGroup.parentGroupId);
      this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageEmployee.AddCheckListGroup, this.ObjGroup).subscribe(res => {
         this.toast.success('Record has been saved successfully!', 'Done')
          this.loading = false;
          this.createGroupForm();
          this.getAllCheckListGroup();
          this.ObjGroup.parentGroupId = 0;
      }, error => {
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
          // this.toast.error('Unable to save agent records', 'Error');
      });
    }
  }
}

export interface IGroup{
  name: string,
  parentGroupId: number,
}