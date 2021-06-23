import {Component, OnInit, OnDestroy } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-uae-areas',
  templateUrl: './add-uae-areas.component.html',
  styleUrls: ['./add-uae-areas.component.scss']
})
export class AddUaeAreasComponent implements OnInit,OnDestroy {

  StatusEnums=Status;
  formGroup:FormGroup;
  siteLabel: any;
  loading = false;
  salesPointUserLocation: any;

  objAreaLocation: AreasLocation = { areaId: '', areaName: '', assignLocation: null, status: 1 }
  
  constructor(public apiservice: APIService, public fb: FormBuilder, public router: Router, public activeRoute: ActivatedRoute,public toast:ToastService)
  { 
    this.createGroupForm();
    this.getSalesPointUserLocation();

    if(this.activeRoute.snapshot.paramMap.get('id')){
      setTimeout(() => { this.EditArea() }, 5000);
    }
  }

  EditArea(){
    this.objAreaLocation.areaId = this.activeRoute.snapshot.paramMap.get('id');
    this.apiservice.getData(urls.UrlModel.ManageAreas.GetEditAreasDetailsById + '?areaId=' + this.objAreaLocation.areaId )
      .subscribe(res => {
          console.log("res>>>>> ", res);
          this.objAreaLocation.areaName = res[0].areaName;
          this.objAreaLocation.status = res[0].status;

          let count = 0;
          let vewAreaLocation = "";

          if(res.legnth > 1){
            res.forEach(element => {
                if(count == 0){
                    vewAreaLocation = element.assignLocationId;
                }else{
                    vewAreaLocation = vewAreaLocation + "," + element.assignLocationId;
                }   
                count = count + 1;                   
            });
            console.log("vewAreaLocation>>>>> ", vewAreaLocation);
            this.objAreaLocation.assignLocation = Array(vewAreaLocation.split(",").map(x=>+x))[0];
          }else{
              console.log("res[0].assignLocationId>>>>> ", res[0].assignLocationId);
            this.objAreaLocation.assignLocation = Number(res[0].assignLocationId);
          }
          this.loading = false;
      });
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
    //this.apiservice.subscriptions.unsubscribe();
  }

  getSalesPointUserLocation() {
    this.apiservice.getData(urls.UrlModel.ManageLocations.AllLocations)
        .subscribe(res => {
            console.log("res+++++ ", res);
            this.salesPointUserLocation = res; 
        }, error => {
    });
  }

  createGroupForm(){
    this.formGroup=this.fb.group({
      areaName : new FormControl('',Validators.required),  
      assignLocation : new FormControl(0),
      status:new FormControl('1',Validators.required),
    })
  }

  SaveUAEAreas() {
    this.loading = true;
    
    if(Number(this.objAreaLocation.assignLocation) != 0){
      this.objAreaLocation.assignLocation = this.objAreaLocation.assignLocation.join(",");
    }else{
      this.objAreaLocation.assignLocation = null;
    }

    this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageAreas.AddUpdateUaeAreas, this.objAreaLocation).subscribe(res=>{
     this.toast.success('Record has been saved successfully!','Done');    
      this.objAreaLocation.assignLocation = null;
      this.objAreaLocation.areaName = '';
      this.objAreaLocation.areaId = '';
      this.objAreaLocation.status = 1;
      this.loading = false;
      this.router.navigateByUrl('manage-uae-areas');
     }, error => {
        this.loading = false;
       this.toast.error('Unable to save record!','Error');
    })
  }

  UpdateUAEAreas(){
    this.apiservice.subscriptions= this.apiservice.PostData(urls.UrlModel.ManageLocations.EditLocation,{
      areaId:this.objAreaLocation.areaId,
      areaName:this.objAreaLocation.areaName,
      assignLocation:this.objAreaLocation.assignLocation,
      status:this.objAreaLocation.status
    }).subscribe(res=>{
     this.toast.success('Areas Update Successfully!','Done');    
      this.router.navigateByUrl('manage-sales-point-locations');
    },error=>{
     this.toast.error('Areas Location Failed! Please Try Again','Error');
    })
  }
}

export interface AreasLocation{
  areaId: string, 
  areaName: string,
  assignLocation: any,
  status: number
}
