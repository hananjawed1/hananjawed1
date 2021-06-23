import {Component, OnInit, OnDestroy } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';
import { Status } from '../add-agent/add-agent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit,OnDestroy {
  emplId:number;

  ObjEmp:IEmployee={
      confirmPassword:'',email:'',employeeNumber:'',name:'',password:'',phoneNumber:'',role:'',status:1,
      empGroupIds : 0, employeeGroupIds:0, userAccess : 0
  }

  formEmpl:FormGroup;
  formUpdateEmpl:FormGroup;
  StatusEnums = Status;
  siteLabel: any;
  loading = false;
  roles: any;
  employeeRoleOnly: any;
  employeGroup : [];
  empArray = [];
  //employeeGroupIds: any;
  profilePicture:File;
  preview:any;

  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,public toast:ToastService)
  {
    this.getRoles();
    this.getAllEmployeeGroup();
  }

  getRoles() {
    this.apiservice.getData(urls.UrlModel.ManageEmployee.AllRoles).subscribe(res => {
      this.roles = res;
      this.employeeRoleOnly = this.roles.filter(r => r.id == 'Employee' || r.id == 'Reception');
    }, error => {
    });
  }

  ngOnInit(): void {
    this.emplId = 0;
    this.createEmplForm();
        
    this.activatedRoute.queryParamMap.subscribe(
      (params: any) => {
        let IsActive = params.get('rtl');
        this.siteLabel = this.apiservice.getAppLabel(IsActive);
    })
  }

  getAllEmployeeGroup() {
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetAllEmployeeGroup)
        .subscribe(res => {
          //this.employeGroup = res;
          res.forEach(element => {
            this.empArray.push({'groupId' : element.groupId, 'name' : element.name})
          });
        }, error => {
    });
  }

  ngOnDestroy()
  {
    //this.apiservice.subscriptions.unsubscribe();
  }

  createEmplForm(){
    this.formEmpl=this.fb.group({
      email:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      phoneNumber:new FormControl('',Validators.required),
      employeeNumber:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required),    
      groupId :new FormControl(0, Validators.required), 
      profilePicture:new FormControl(''),   
      UserAccess:new FormControl(0,Validators.required),  
    })
  }

  createUpdateForm() {
    this.formUpdateEmpl=this.fb.group({
      email:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      phoneNumber:new FormControl('',Validators.required),
      employeeNumber:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required),    
      groupId :new FormControl(0, Validators.required),  
      UserAccess:new FormControl(0,Validators.required),
    })
  }

  SaveEmployee() {    
    if(this.ObjEmp.userAccess == 0 && this.ObjEmp.role == 'Employee'){
      this.toast.error('Please select the user access!', 'Error')
      return false;
    }

    if(this.ObjEmp.role == 'Reception'){
      this.ObjEmp.userAccess = 1;
    }

    if (this.formEmpl.valid) {
      this.loading = true;

      let formdata = new FormData();      
      formdata.append('Email',this.ObjEmp.email);
      formdata.append('Name',this.ObjEmp.name);
      formdata.append('Password',this.ObjEmp.password);
      formdata.append('ConfirmPassword',this.ObjEmp.confirmPassword);
      formdata.append('Role',this.ObjEmp.role);
      formdata.append('PhoneNumber',this.ObjEmp.phoneNumber);
      formdata.append('EmployeeNumber',this.ObjEmp.employeeNumber);
      formdata.append('Status',this.ObjEmp.status.toString());      

      if(this.ObjEmp.employeeGroupIds.length > 0){  
        var i = 0;
        this.ObjEmp.employeeGroupIds.forEach(element => {
          if(i == 0){
            this.ObjEmp.empGroupIds = element.groupId.toString();
          }else{
            this.ObjEmp.empGroupIds = this.ObjEmp.empGroupIds + ", " + element.groupId;
          }
          i = i + 1;
        });
        this.ObjEmp.employeeGroupIds = JSON.stringify(this.ObjEmp.employeeGroupIds);
      }else{
        this.ObjEmp.empGroupIds = "0";
        this.ObjEmp.employeeGroupIds = "";
      }
      formdata.append('empGroupIds', this.ObjEmp.empGroupIds);
      formdata.append('employeeGroupIds', this.ObjEmp.employeeGroupIds);

      formdata.append('ProfilePicture', this.profilePicture);
      
      formdata.append('UserAccess', this.ObjEmp.userAccess + '');

      this.apiservice.subscriptions = this.apiservice.PostImageData(urls.UrlModel.ManageEmployee.AddEmployee, formdata).subscribe(res => {
       this.toast.success('Record has been saved successfully!', 'Done')
        this.loading = false;
        this.router.navigateByUrl('manage-employee');
      }, error => {
         this.loading = false;
      });
    }
  }

  onChange($event){
    this.profilePicture=$event.target.files[0];
      if ($event.target.files && $event.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(this.profilePicture);
        reader.onload = (e)=> {
        this.preview=reader.result;
    };
      reader.onerror = function (error) {
    };
    }
  }

  updateEmployee() {
    if(this.formUpdateEmpl.valid){
        this.apiservice.subscriptions = this.apiservice.PostImageData
            (urls.UrlModel.ManageEmployee.EditEmployee, {
              employeeId:this.emplId,name:this.ObjEmp.name,email:this.ObjEmp.email,role:this.ObjEmp.role,
              phoneNumber:this.ObjEmp.phoneNumber,
              employeeNumber:this.ObjEmp.employeeNumber,status:this.ObjEmp.status, UserAccess: this.ObjEmp.userAccess
      }).subscribe(res=>{
        this.router.navigateByUrl('manage-employee');
       this.toast.success('Employee Updated Successfully!','Done');
      },error=>{
        //this.toast.error('Employee Updation Failed!','Error');
      })
    }
  }
}

export interface IEmployee{
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
  role: string,
  phoneNumber: string,
  employeeNumber: string,
  status: number,
  empGroupIds:any,
  employeeGroupIds:any,
  userAccess: number,
  // location:number;
}

