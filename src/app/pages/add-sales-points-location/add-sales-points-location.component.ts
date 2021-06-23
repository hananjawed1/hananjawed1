import {Component, OnInit, OnDestroy } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-sales-points-location',
  templateUrl: './add-sales-points-location.component.html',
  styleUrls: ['./add-sales-points-location.component.scss']
})
export class AddSalesPointsLocationComponent implements OnInit,OnDestroy {

  allAgents:any;
  StatusEnums=Status;
  formLocation:FormGroup;
  locationId:number = 0;
  siteLabel: any;
  loading = false;

  objLocation: IsalesLocation = { agentId: 0, phoneNumber: '', email: '', name: '', status: 1 }
  
  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activeRoute: ActivatedRoute,public toast:ToastService)
  {
    this.getAllAgents();
 
    if(this.activeRoute.snapshot.paramMap.get('id')){
      this.locationId = parseInt(this.activeRoute.snapshot.paramMap.get('id'),0);
      this.apiservice.getData(urls.UrlModel.ManageLocations.GetLocationDetails+'?id='+this.locationId).subscribe(res=>{
        this.objLocation = res;
        this.formLocation.controls.agentId.disable();
        this.formLocation.controls.phoneNumber.disable();
        this.formLocation.controls.email.disable();
        this.formLocation.controls.status.disable();
      })
    }

    this.createLocationForm();
  }

  ngOnInit(): void {
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  ngOnDestroy(){
    this.apiservice.subscriptions.unsubscribe();
  }

  createLocationForm(){
    this.formLocation = this.fb.group({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',[Validators.required,Validators.minLength(10)]),
      agentId: new FormControl('',Validators.required),
      status: new FormControl('',Validators.required)    
    })
  }

  getAllAgents(){
   this.apiservice.subscriptions= this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res=>{
      this.allAgents=res;
    })
  }

  SaveLocation() {
    this.loading = true;
    this.apiservice.subscriptions= this.apiservice.PostData(urls.UrlModel.ManageLocations.AddLocation,this.objLocation).subscribe(res=>{
   this.toast.success('Record has been saved successfully!','Done');    
    this.router.navigateByUrl('manage-sales-point-locations');
    this.loading = false;
  }, error => {
        this.loading = false;
     //this.toast.success('Unable to save record!','Error');
    })
  }

  UpdateLocation(){
    this.apiservice.subscriptions= this.apiservice.PostData(urls.UrlModel.ManageLocations.EditLocation,{
      locationId:this.locationId,
      name:this.objLocation.name,
      email:this.objLocation.email,
      phoneNumber:this.objLocation.phoneNumber,
      agentId:this.objLocation.agentId,
      status:this.objLocation.status
    }).subscribe(res=>{
     this.toast.success('Location Update Successfully!','Done');    
      this.router.navigateByUrl('manage-sales-point-locations');
    },error=>{
      //this.apiservice.toastrservice.success('Update Location Failed! Please Try Again','Error');
    })
  }
}

export interface IsalesLocation{
  name: string,
  email: string,
  phoneNumber: string,
  agentId: number,
  status: number
}
