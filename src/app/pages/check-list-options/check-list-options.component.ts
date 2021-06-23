import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-check-list-options',
  templateUrl: './check-list-options.component.html',
  styleUrls: ['./check-list-options.component.scss']
})
export class CheckListOptionsComponent implements OnInit {

  ObjGroup:ICheckListOptions={
    checkListId :0, question : '', answer1 : '', answer2 : '', answer3 : '', answer4 : ''
  }

  checkListOptionList:ICheckListOptionsList={
    checkListOption : ''
  };

  checkListGroup:ICheckListOptions[]
  qusAnsGroupForm:FormGroup;
  qusAnsFormArray:FormArray;
  siteLabel: any;
  loading = false;

  checkList:any;
  
  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public toast: ToastService)
  {
    this.getCheckListOptions();
    this.createNewForm();
  }

  ngOnInit(): void
  {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
        let IsActive = params.get('rtl');
        this.siteLabel = this.apiservice.getAppLabel(IsActive);
    })
  }

  createNewForm(){
    this.qusAnsGroupForm = this.fb.group({
      qusAnsFormArray : this.fb.array([
        this.addQuestionAnswer()
      ])
    });
  }

  getControls() {
    return (this.qusAnsGroupForm.get('qusAnsFormArray') as FormArray).controls;
  }

  removeCheckListOptions(gourpIndex : number): void {
    (<FormArray>this.qusAnsGroupForm.get("qusAnsFormArray")).removeAt(gourpIndex);
  }

  addNewQuesAnswer() : void {
    (<FormArray>this.qusAnsGroupForm.get("qusAnsFormArray")).push(this.addQuestionAnswer());
  }

  addQuestionAnswer() : FormGroup {
    return this.fb.group({
      question : new FormControl('',Validators.required),
      answer1 : new FormControl('',Validators.required),
      answer2 : new FormControl('',Validators.required),
      answer3 : new FormControl('',Validators.required),
      answer4 : new FormControl('',Validators.required),
    });
  }

  getCheckListOptions() {
    // this.loading = true;
    $('#global-loader').fadeIn('fast');
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetCheckListOption)
        .subscribe(res => {
            this.checkList = res; 
            // this.loading = false;
            $('#global-loader').fadeOut('slow');
        }, error => {
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
    });
  }

  editCheckListOptions(checkList : any) {
    this.qusAnsGroupForm.setControl('qusAnsFormArray', this.setExistingCheckList(checkList));
  }

  setExistingCheckList(checkList : ICheckListOptions) : FormArray {
    const formArray = new FormArray([]);    
    formArray.push(this.fb.group({
      checkListId : checkList.checkListId, 
      question : checkList.question,
      answer1 : checkList.answer1,
      answer2 : checkList.answer2,
      answer3 : checkList.answer3,
      answer4 : checkList.answer4,
    }));

    return formArray;
  }

  SaveCheckListGroup() {
    if (this.qusAnsGroupForm.valid) {
      this.checkListGroup = this.qusAnsGroupForm.value.qusAnsFormArray;
      // this.loading = true;
      $('#global-loader').fadeIn('fast');
      this.checkListOptionList.checkListOption = JSON.stringify(this.checkListGroup);
      this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageEmployee.AddCheckListOption, this.checkListOptionList).subscribe(res => {
         this.toast.success('Record has been saved successfully!', 'Done')
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
          this.getCheckListOptions();
          this.createNewForm();
      }, error => {
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
          // this.toast.error('Unable to save agent records', 'Error');
      });
    }
  }
}

export interface ICheckListOptions {
  checkListId : number;
  question : string;
  answer1 : string;
  answer2 : string;
  answer3 : string;
  answer4 : string;  
}

export interface ICheckListOptionsList {
  checkListOption : string;
}

