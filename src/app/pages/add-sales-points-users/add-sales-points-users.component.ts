import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';
@Component({
  selector: 'ls-add-sales-points-users',
  templateUrl: './add-sales-points-users.component.html',
  styleUrls: ['./add-sales-points-users.component.scss']
})
export class AddSalesPointsUsersComponent implements OnInit {

  loading = false;
agentId:any;
locationId:number;
  objSalesUser: ISalesPointUser = {
      status: 1, phoneNumber: '', password: '', name: '', email: '', confirmPassword: '',
      locationId: 0, agentId: 0
  }

  siteLabel: any;

formSalesUser:FormGroup;
formUpdateSalesUser:FormGroup;
StatusEnums=Status;
salesUserId:number;
  locations: any;
  agents: any;


  constructor(public fb: FormBuilder, public api: APIService, public router: Router, public activeRoute:ActivatedRoute, public toast: ToastService) {
  //  if (activeRoute.snapshot.paramMap.get('id'))
  //  {
  //      this.salesUserId = parseInt(activeRoute.snapshot.paramMap.get('id'), 0);

  //  this.api.getData(urls.UrlModel.ManageSalePointUser.GetUserDetails+'?id='+this.salesUserId).subscribe(res=>{
  //  this.objSalesUser.agentId=res.agentId;
  //  this.objSalesUser.locationId=res.locationId;
  //  this.objSalesUser.name=res.user.name;
  //  this.objSalesUser.email=res.user.email;
  //  this.objSalesUser.phoneNumber=res.user.phoneNumber;
  //  this.objSalesUser.status=res.user.status;
  //});
  //      this.api.getData(urls.UrlModel.ManageLocations.AllLocations).subscribe(res =>
  //      {
  //  this.locations=res;
     
  //})
  //this.createUpdateSalesUserForm();
  //  }
  //  else
  //  {
  //     this.createSalesUserForm();
  //  }
    this.getAllAgents();
    this.createSalesUserForm();

    
  }


  ngOnInit(): void {
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.api.getAppLabel(IsActive);
          }
      )
  }

  getLocations()
  {
      this.objSalesUser.agentId = Number(this.objSalesUser.agentId);
      this.api.getData(urls.UrlModel.ManageLocations.LocationByAgent + '?id=' + this.objSalesUser.agentId).subscribe(res => {
          this.locations = res;
      });
  }

  getAllAgents() {
      this.api.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
      })
  }

createSalesUserForm(){
  this.formSalesUser=this.fb.group({
    agentId: new FormControl('',Validators.required),
    locationId: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required)
  })
}
createUpdateSalesUserForm(){
  this.formUpdateSalesUser=this.fb.group({
    agentId: new FormControl('',Validators.required),
    locationId: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required)
  })
}
  saveSalesUser()
  {
      this.loading = true;
        this.objSalesUser.locationId = Number(this.objSalesUser.locationId);
        this.objSalesUser.status = Number(this.objSalesUser.status);
        this.objSalesUser.agentId = Number(this.objSalesUser.agentId);
        this.api.PostData(urls.UrlModel.ManageSalePointUser.AddSalePointUser,this.objSalesUser).subscribe(res=>{
        this.formSalesUser.reset();
        this.toast.success('Record has been saved!', 'Done');
        //this.api.toastrservice.success('Record has been saved!', 'Done');
            this.router.navigateByUrl('sales-point-user');
            this.loading = false;
  }, error =>
            {
                this.loading = false;
                // this.api.toastrservice.error('Error in saving records!', 'Error');
            }
  )
}
}


export interface ISalesPointUser{
agentId: number,
locationId: number,
email: string,
name: string,
password: string,
confirmPassword: string,
phoneNumber: string,
status: number,
}

