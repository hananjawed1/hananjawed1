import {  Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { error } from 'protractor';
import { DatePipe } from '@angular/common';
import { MapsAPILoader } from '@agm/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-task-management',
  templateUrl: './add-task-management.component.html',
  styleUrls: ['./add-task-management.component.scss']
})
export class AddTaskManagementComponent implements OnInit {

  objTask: ITaskAddVM;
  formTask: FormGroup;
  loading = true;
  siteLabel: any;

  address: string;
  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder;

  employeeList : any;
  selectedEmployeeGroupList : any;
  employeeGroup : any;
  assignCheckListGroup : any;

  StatusForTask = ManageTaskStatus;
  PriorityLevel = PriorityLevel;
  InspectionType = InspectionType;

  taskImage: File;
  preview: any;
  myFiles:string [] = [];
  notes:string [] = [ "Notes 1", "Notes 2", "Notes 3" ];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(public fb: FormBuilder,  public apiservice: APIService, public router: Router,  public activatedRoute: ActivatedRoute,
    private datePipe: DatePipe, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public toast: ToastService )
  {
      this.objTask = {
        id:0, taskName: '', taskDescription: '',startDate: '', endDate: null, priorityLevel:0, inspection:0, status:0, 
        location:'', employeeIds : null, empGroupIds : null, assignChecklistIds : null, latitude : 0, longitude : 0,
        taskImg : null, returnNote : ''
      };

      this.createAgentForm();
      this.getAllEmployee();
      this.getAllEmployeeGroup();
      this.getAllAssignChecklistGroup();

      this.objTask.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      if(this.objTask.id != 0){
          this.getTaskManagementDetailsByIDForEdit(this.objTask.id);
      }else{
        this.loading = false;
      }
  }

  ngOnInit(): void {
    //load Places Autocomplete
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      let IsActive = params.get('rtl');
      this.siteLabel = this.apiservice.getAppLabel(IsActive);
    });

    this.mapsAPILoader.load().then(() =>
    {        
        this.geoCoder = new google.maps.Geocoder;
        
        if(this.objTask.id != 0){
          setTimeout(() => { this.LoadMapOnInputSearch(); }, 5000);
        }else{
          this.setCurrentLocation();
          this.LoadMapOnInputSearch();
        }
    });
  }
  
  // onChangeTaskImage($event, item: string)
  // {        
  //     if (item==='taskImage') {
  //         this.taskImage = $event.target.files[0];
  //     }

  //     if ($event.target.files && $event.target.files[0])
  //     {
  //         let reader = new FileReader();

  //         if (item === 'taskImage') {
  //             reader.readAsDataURL(this.taskImage);
  //         }

  //         reader.onload = (e) =>
  //         { 
  //             if (item === 'taskImage') {
  //                 this.preview = reader.result;                    
  //             }
  //         };
  //         reader.onerror = function (error) {
  //         };
  //     }
  // }

  // onFileChange(event) {
  //   for (var i = 0; i < event.target.files.length; i++) { 
  //       this.myFiles.push(event.target.files[i]);
  //   }
  // }

  LoadMapOnInputSearch() {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () =>
    {
        this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
                return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.objTask.location = place.formatted_address;
            this.zoom = 8;
        });
    });
  }

  getTaskManagementDetailsByIDForEdit(taksID : Number){
    this.apiservice.getData(urls.UrlModel.TaskManagement.getTaskManagementDetailsByIDForViewDeatils+ '?taskId=' + taksID).subscribe(res => {
        this.loading = false;   

        this.objTask.id = res.id;
        this.objTask.taskName = res.taskName;
        this.objTask.taskDescription = res.taskDescription;
        this.objTask.startDate = res.startDate;
        this.objTask.endDate = res.endDate;
        this.objTask.priorityLevel = res.priorityLevel;
        this.objTask.inspection = res.inspection;
        this.objTask.status = res.status;
        this.objTask.location = res.location;
        this.objTask.latitude = res.latitude;
        this.objTask.longitude = res.longitude;
        this.objTask.returnNote = res.returnNote;

        if(res.employeeIds != null && res.employeeIds != "" && res.employeeIds != 0){
          this.objTask.employeeIds = Array(res.employeeIds.split(",").map(x=>+x))[0];
        }else{
          this.objTask.employeeIds = null;
        }

        if(res.empGroupIds != null && res.empGroupIds != "" && res.empGroupIds != 0){
          this.objTask.empGroupIds = Array(res.empGroupIds.split(",").map(x=>+x))[0];
        }else{
          this.objTask.empGroupIds = null;
        }

        if(res.assignChecklistIds != null && res.assignChecklistIds != "" && res.assignChecklistIds != 0){
          this.objTask.assignChecklistIds = Array(res.assignChecklistIds.split(",").map(x=>+x))[0];
        }else{
          this.objTask.assignChecklistIds = null;
        }

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = this.objTask.latitude;
            this.longitude = this.objTask.longitude;
            this.zoom = 12;
            this.getAddress(this.latitude, this.longitude);
          });
        }
    })
  }

  // markerDragEnd($event: any) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.formTask.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
  }

  createAgentForm()
  {
    this.formTask = this.fb.group({
        taskName: new FormControl(''),
        taskDescription: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        priorityLevel: new FormControl(''),
        inspection: new FormControl(''),
        status: new FormControl(''),
        location: new FormControl(''),
        employeeIds: new FormControl(null),
        employeeGroupIds: new FormControl(null),
        assignChecklistIds: new FormControl(null),
        returnNote: new FormControl(''),
    });
  }

  saveTask()
  {
    this.loading = true;

    this.objTask.status = Number(this.objTask.status);
    this.objTask.priorityLevel = Number(this.objTask.priorityLevel);
    this.objTask.inspection = Number(this.objTask.inspection);

    if(Number(this.objTask.employeeIds) != 0){
      this.objTask.employeeIds = this.objTask.employeeIds.join(",");   
    }else{
      this.objTask.employeeIds = null;
    }

    if(Number(this.objTask.empGroupIds) != 0){
      this.objTask.empGroupIds = this.objTask.empGroupIds.join(",");
    }else{
      this.objTask.empGroupIds = null;
    }

    if(Number(this.objTask.assignChecklistIds) != 0){
      this.objTask.assignChecklistIds = this.objTask.assignChecklistIds.join(",");
    }else{
      this.objTask.assignChecklistIds = null;
    }

    this.objTask.latitude = this.latitude;
    this.objTask.longitude = this.longitude;

    this.apiservice.PostImageData(urls.UrlModel.TaskManagement.AddTask, this.objTask).subscribe(res => {
      this.loading = false;
     this.toast.success('Record has been saved successfully!', 'Done');
      this.router.navigateByUrl('task-list');
    }
    ,error => {    
        this.loading = false;
    });
  }

  getAllEmployee(){
    this.apiservice.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
      this.employeeList = res;
    });
  }

  getAllEmployeeGroup(){
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetAllEmployeeGroup).subscribe(res => {
      this.employeeGroup = res;
    });
  }

  getAllAssignChecklistGroup(){
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetAllAssignCheckListGroup).subscribe(res => {
      this.assignCheckListGroup = res;
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
      });
    }
  } 

  getAddress(latitude, longitude)
  {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === 'OK')
        {
            if (results[0])
            {
                this.zoom = 12;
                this.address = results[0].formatted_address;
                //this.objTask.location = results[0].formatted_address;
            } else {
              //  window.alert('No results found');
            }
        } else {
            // window.alert('Geocoder failed due to: ' + status);
        }
    });
  }
}

export interface ITaskAddVM
{
  id : number,
  taskName : string,
  taskDescription :string,
  startDate: String,
  endDate: string,
  priorityLevel: number,
  inspection: number,
  status :number,
  location :string,
  employeeIds : any,
  empGroupIds : any,
  assignChecklistIds : any,
  longitude :number,
  latitude :number,
  taskImg : any,
  returnNote: string,
}

export enum PriorityLevel {
  High = 1,
  Medium = 2,
  Low = 3,
}

export enum InspectionType {
  NormalInspection = 1,
  SurpriseInspection = 2,
}

export enum ManageTaskStatus
{
    New = 1,
    InProgress = 2, 
    Accepted = 3,
    AtLocation = 4,
    Completed = 5,
    Cancelled = 6,
    Rejected = 7,
    ClosedByAdmin = 8,
    Returned = 9
}