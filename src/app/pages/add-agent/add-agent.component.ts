import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  objAgent:IAgent;
  agentId:number;
  formAgent:FormGroup;
  formUpdateAgent:FormGroup;
  logo:File;
  preview:any; // '/assets/images/hotel.png';
  StatusEnums=Status;
  siteLabel: any;
    loading = false;

    constructor(public fb: FormBuilder, public apiservice: APIService, public router: Router, public aciveRoute: ActivatedRoute,public toast:ToastService)
    {
        this.agentId = 0;
      this.objAgent={confirmPassword:'',email:'',name:'',notes:'',password:'',phoneNumber:'',status:1};

      this.createAgentForm();

    //if (this.aciveRoute.snapshot.paramMap.get('id')) {
    //  this.agentId=parseInt(this.aciveRoute.snapshot.paramMap.get('id'),0);
    //this.apiservice.subscriptions=this.apiservice.getData(urls.UrlModel.ManageAgent.GetAgentDetails+'?id='+this.agentId).subscribe(res=>{
    //  console.log(res);
    //  this.objAgent.name=res.user.name;
    //  this.objAgent.email=res.user.email;
    //  this.objAgent.notes=res.notes;
    //  this.objAgent.phoneNumber=res.user.phoneNumber;
    //  this.objAgent.status=res.user.status;
    //})
    //  this.createUpdateAgentForm();
    //}else{
    //this.createAgentForm();
    //}
    }

    ngOnInit(): void {
        this.aciveRoute.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.apiservice.getAppLabel(IsActive);
            }
        )
    }

  onChange($event){
    this.logo=$event.target.files[0];
      if ($event.target.files && $event.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(this.logo);
        reader.onload = (e)=> {
        this.preview=reader.result;
    };
      reader.onerror = function (error) {
    };
    }
  }
  createAgentForm(){
    this.formAgent=this.fb.group({
      email:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      password:new FormControl('', Validators.required),
      confirmPassword:new FormControl('',Validators.required),
      phoneNumber:new FormControl('',Validators.required),
      notes:new FormControl(''),
      filelogo:new FormControl(''),
      status:new FormControl(''),                        
    });
  }
  createUpdateAgentForm(){
    this.formUpdateAgent=this.fb.group({
      email:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      phoneNumber:new FormControl('',Validators.required),
      notes:new FormControl(''),
      filelogo:new FormControl(''),
      status:new FormControl(''),                        
    });
  }
    saveAgent()
    {
        this.loading = true;
        let formdata = new FormData();
        formdata.append('Email',this.objAgent.email);
        formdata.append('Name',this.objAgent.name);
        formdata.append('Password',this.objAgent.password);
        formdata.append('ConfirmPassword',this.objAgent.confirmPassword);
        formdata.append('PhoneNumber',this.objAgent.phoneNumber);
        formdata.append('Status',this.objAgent.status.toString());
        formdata.append('Notes',this.objAgent.notes);
        formdata.append('Logo',this.logo);
      
        this.apiservice.subscriptions = this.apiservice.PostImageData(
            urls.UrlModel.ManageAgent.AddAgent, formdata).subscribe(res => {
            // this.loading = false;
            $('#global-loader').fadeOut('slow');
           this.toast.success('Record has been saved successfully!', 'Done');
            this.router.navigateByUrl('manage-agents');
        }, eror => {
            // this.loading = false;
            $('#global-loader').fadeOut('slow');
            this.toast.error('Unable to save agent!', 'Error');
        });
  }
  UpdateAgent(){
    let formdata = new FormData();
    formdata.append('AgentId',this.agentId.toString());
    formdata.append('Email',this.objAgent.email);
    formdata.append('Name',this.objAgent.name);
    formdata.append('PhoneNumber',this.objAgent.phoneNumber);
    formdata.append('Status',this.objAgent.status.toString());
    formdata.append('Notes',this.objAgent.notes);
    formdata.append('Logo',this.logo);
    this.apiservice.subscriptions = this.apiservice.PostImageData(urls.UrlModel.ManageAgent.EditAgent, formdata).subscribe(res =>
      {
       this.toast.success('Agent Updated Successfully!','Done');
        this.router.navigateByUrl('manage-agents');
      },eror=>{
        //this.toast.error('Update Agent Failed! Please Try Again','Error');
    })
  }
}
export interface IAgent{
  email:string;
  name:string;
  password:string;
  confirmPassword:string;
  phoneNumber:string;
  status:number;
  notes:string;
}
export enum Status {
  Active = 1,
    InActive = 2,

  //Approved = 3,
  //Rejected = 4
}
