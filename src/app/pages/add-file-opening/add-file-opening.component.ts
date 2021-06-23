import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import { APIService } from '../../_services/api.service';
import * as urls from '../../_services/ServiceUrls'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ls-add-file-opening',
  templateUrl: './add-file-opening.component.html',
  styleUrls: ['./add-file-opening.component.scss']
})

export class AddFileOpeningComponent implements OnInit, AfterViewInit  {

    // fileRequestService: FileRequestServiceVM;
    addFileRequest: AddFileRequestVM;
    fileRequestForm: FormGroup;
    attachedDocument: File;
    tradeLicenseCopy: File;
    //businessType = '0';
    businessType = 0;
    businessTypes: any;
    groups: any;
    fileOpeningStatus: any;
    hotelTypes:any= [];
    requestTypes: any;
    loading = false;
    imagePath: string;
    userName: string;
    star: 0;
    searchTradeLicenceNumber: SearchTradeLicenceNumber;
   

    //hotelTypes = [
    //    { name: 'Bar', checked: false, owned: true },
    //    { name: 'Club', checked: false, owned: true },
    //    { name: 'Disco', checked: false, owned: true },
    //    { name: 'Swimming Pool', checked: false, owned: true },
    //    { name: 'Party Hall', checked: false, owned: true },
    //    { name: 'Restaurant', checked: false, owned: true },
    //];

    status = 'Owned';
    siteLabel: any;
    isPdf: boolean;

    constructor(public formBuilder: FormBuilder, public apiservice: APIService,
        private cdr: ChangeDetectorRef,
        public router: Router, public activeRoute: ActivatedRoute)
    {
        this.addFileRequest = {
            businessType:0, email:'', groupId:0, 
            ownerShip: 0, phoneNumber: '', requestType: 0, star: 0, tradeLicenceNumber: '',
            parentLicenceNumber:'', entityName :'',
            clientId:0, categoryType: 0,
            name: '', requestBy: 0, emiratesIDNumber: '', userName: ''
        };
        this.searchTradeLicenceNumber = {
            tradeLicenceNumber:'', clientId:0
        }

        this.createFileRequestForm();
        // this.getHotelServices();

        this.addFileRequest.clientId = Number(this.activeRoute.snapshot.paramMap.get('id'));
        if (this.addFileRequest.clientId > 0)
        {
            this.getClientDetails(this.addFileRequest.clientId);
        }

        this.getGroups();
        this.getFileOpeningStatus();
        this.getBusinessType();
        this.getRequestTypes();
        this.generateApplicationNumber();
        
    }

    generateApplicationNumber() {
        this.apiservice.getData
            (urls.UrlModel.Common.GenerateApplicationNumber).subscribe(data =>
            {
                this.addFileRequest.applicationNumber = data;
            }
            ,error =>
            {    
                //this.errors = error;
                this.loading = false;
                //this.apiservice.toastrservice.error('Unable to save records!', 'Error');
            }
        );
    } 

    getClientDetails(id) {
        this.loading = true;
        this.apiservice.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id)
            .subscribe(res => {
                this.addFileRequest = res as AddFileRequestVM;
                this.processChange(res.tradeLicenceNumber );
                this.addFileRequest.email = res.user.email;
                this.addFileRequest.phoneNumber = res.user.phoneNumber;
                 
                this.hotelTypes.forEach(function (value, index) {
                    var data = value as FileRequestServiceVM;

                    res.clientHotelServices.forEach(function (value2, index2)
                    {
                        if (data.hoteServicesId == value2.hoteServicesId)
                        {
                            data.checked = true;
                            if (value2.ownerShip == 1) {
                                data.owned = true;
                            } else {
                                data.owned = false;
                            }
                            data.fieldName = value2.name;
                            data.document = value2.document;
                        }
                    });

                });
                //console.log(this.hotelTypes);
                this.loading = false;
            });
    }

    ngAfterViewInit():void
    {
        this.cdr.detectChanges();
    }

    
    ngOnInit(): void {
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }
    saveFileOpening()
    {
        // this.addFileRequest.fileRequestService = this.hotelTypes;
        this.addFileRequest.star = Number(this.addFileRequest.star);
        this.addFileRequest.requestType = Number(this.addFileRequest.requestType);
        this.addFileRequest.businessType = Number(this.addFileRequest.businessType);
        this.addFileRequest.groupId = Number(this.addFileRequest.groupId);
        this.addFileRequest.categoryType = Number(this.addFileRequest.categoryType);
        this.addFileRequest.applicationNumber = this.addFileRequest.applicationNumber;
        this.addFileRequest.requestBy = Number(this.addFileRequest.requestBy);
        this.addFileRequest.entityName = this.addFileRequest.entityName;

        let formdata = new FormData();

        formdata.append('ClientId', this.addFileRequest.clientId+'');
        formdata.append('TradeLicenceNumber', this.addFileRequest.tradeLicenceNumber);
        //formdata.append('ParentLicenceNumber', this.addFileRequest.parentLicenceNumber);
        //formdata.append('LiquorLicenseNumber', this.addFileRequest.liquorLicenseNumber);
        formdata.append('Email', this.addFileRequest.email);
        formdata.append('PhoneNumber', this.addFileRequest.phoneNumber);
        formdata.append('BusinessType', this.addFileRequest.businessType + '');
        formdata.append('GroupId', this.addFileRequest.groupId + '');
        formdata.append('RequestType', this.addFileRequest.requestType + '');
        formdata.append('CategoryType', this.addFileRequest.categoryType + '');

        // formdata.append('ApplicationNumber', this.addFileRequest.applicationNumber + '');
        formdata.append('UserName', this.addFileRequest.userName);
        formdata.append('RequestBy', this.addFileRequest.requestBy + '');
        formdata.append('EmiratesIDNumber', this.addFileRequest.emiratesIDNumber);

        if (this.addFileRequest.categoryType == 2) {
            formdata.append('Name', this.addFileRequest.name + '');
            formdata.append('ParentLicenceNumber', this.addFileRequest.parentLicenceNumber);
        }
        
        formdata.append("TradeLicenseCopy",  this.tradeLicenseCopy);
        if (this.addFileRequest.star!=null) {
            formdata.append('Star', this.addFileRequest.star + '');
        }
       formdata.append("EntityName", this.addFileRequest.entityName)
        // if (this.addFileRequest.ownerShip != 0) { 
        //     formdata.append('OwnerShip', this.addFileRequest.ownerShip + '');
        // }

        // if  ( Number( this.addFileRequest.businessType) === 1)
        // {
        //     this.hotelTypes.forEach(function (value, index)
        //     {
        //         var data = value as FileRequestServiceVM;
        //         formdata.append('FileRequestService[' + index + '].Name', data.name);
        //         formdata.append('FileRequestService[' + index + '].HoteServicesId', data.hoteServicesId+'');
        //         formdata.append('FileRequestService[' + index + '].Checked', data.checked + '');
        //         formdata.append('FileRequestService[' + index + '].Owned', data.owned + '');
        //         formdata.append('FileRequestService[' + index + '].FieldName', data.fieldName);
        //         formdata.append('FileRequestService[' + index + '].Document', data.document);
        //     });
        // }

        this.loading = true;

        this.apiservice.PostImageData(urls.UrlModel.FileRequest.AddFileOpening,
            formdata).subscribe(res =>
            {
              this.apiservice.toastrservice.success('Request has been sent!', 'Done');
              this.router.navigateByUrl('view-file-opening');
            },
            error =>
            {
                this.loading = false;
            });
    }

    getRequestTypes() {
        this.apiservice.getData(urls.UrlModel.Common.RequestType).subscribe(res => {
            this.requestTypes = res;
        });
    }

   
    

    showDocument(path: string) {
        if (path != null) {
            //this.imagePath = environment.domainURl + path;
            this.imagePath = path;
        } else {
            this.imagePath = '';
        }
    }

    getGroups() {
        this.apiservice.getData(urls.UrlModel.Common.Groups).subscribe(res => {
            this.groups = res;
        });
    }

    getFileOpeningStatus() {
        this.apiservice.getData(urls.UrlModel.Common.FileOpeningStatus).subscribe(res => {
            this.fileOpeningStatus = res;
        });
    }

    getBusinessType() {
        this.apiservice.getData(urls.UrlModel.Common.BusinessType).subscribe(res => {
            this.businessTypes = res;            
        });
    }

    showData() {
        this.addFileRequest.businessType = Number(this.addFileRequest.businessType);
    }

    processChange(value){
        console.log(" before random Testing ", value);
        if(value != "" || value != null){

            this.searchTradeLicenceNumber.clientId = Number(this.activeRoute.snapshot.paramMap.get('id'));
            this.searchTradeLicenceNumber.tradeLicenceNumber = value;
            this.apiservice.PostImageData(urls.UrlModel.FileRequest.GetNumberOfClientForTradeLicence,
                this.searchTradeLicenceNumber).subscribe(res =>
                {
                    if(res == true){
                        var text="";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                        for (var i = 0; i < 2; i++){
                            value += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        this.addFileRequest.userName = value;
                        
                        console.log("inside if " , value);
                    }
                    else{
                        this.addFileRequest.userName = value;
                    }
                },
                error =>
                {
                    console.log("error");
                });
        }
        
    }

    openDoc(pdfUrl: string) {
        window.open(pdfUrl, '_blank', '', true);
    }

    showImages(imgFile: any) {
        this.imagePath = imgFile;
        if(this.imagePath.includes("pdf")){
            this.isPdf = true;
        }else{
            this.isPdf = false; 
        }
    }

    createFileRequestForm() {
        this.fileRequestForm = this.formBuilder.group({
            tradeLicenceNumber: new FormControl('', Validators.required),
            businessType: new FormControl(0, Validators.required),
            //liquorLicenseNumber: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            groupId: new FormControl(0, Validators.required),
            requestType: new FormControl(0, Validators.required),
            categoryType: new FormControl(0, Validators.required),
            star: new FormControl(0),
            entityName : new FormControl('', Validators.required),
            //ownerShip: new FormControl(0),
            //star: new FormControl(0),
            parentLicenceNumber: new FormControl(''),
            name: new FormControl(''),
            // applicationNumber: new FormControl({value: '', disabled: true}, Validators.required),
            userName: new FormControl({value: '', disabled: true}, Validators.required),
            requestBy: new FormControl(0, Validators.required),
            emiratesIDNumber: new FormControl(''),
        });
    }

  
 
    onChangeUploadDocument($event) {
        this.tradeLicenseCopy = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.tradeLicenseCopy);
            reader.onload = (e) =>
            {
                //this.clientStatus.paymentVoucher = reader.result;
            };
            reader.onerror = function (error) {
            };
        }
    }

    // onChangeDocument($event,item:any)
    // {
    //     this.attachedDocument = $event.target.files[0];
    //     if ($event.target.files && $event.target.files[0])
    //     {
    //         let reader = new FileReader();
    //         reader.readAsDataURL(this.attachedDocument);
    //         reader.onload = (e) =>
    //         {
    //             //item.document = reader.result;
    //             item.document = $event.target.files[0];
    //         };
    //         reader.onerror = function (error) {};
    //     }
    // }

    onChangeDocument($event, item:any, num : number)
    {
        let fileSize = ($event.target.files[0].size/1024/1024);
        if(fileSize > 3){
            $event.target.value = "";
            this.apiservice.toastrservice.error("File size is too large : " + fileSize.toFixed(4) + ". Maximum size : " + 3 + " MB", 'Error');
            return false;
        }
        
        if(item.hoteServicesId == 1){
            this.fileRequestForm.value.hotelBarServiceDetailsFormArray[num].document = $event.target.files[0];
        }else if(item.hoteServicesId == 2){
            this.fileRequestForm.value.hotelClubServiceDetailsFormArray[num].document = $event.target.files[0];
        }else if(item.hoteServicesId == 3){
            this.fileRequestForm.value.hotelDiscoServiceDetailsFormArray[num].document = $event.target.files[0];
        }else if(item.hoteServicesId == 4){
            this.fileRequestForm.value.hotelSwimmingPoolServiceDetailsFormArray[num].document = $event.target.files[0];
        }else if(item.hoteServicesId == 5){
            this.fileRequestForm.value.hotelPartyHallServiceDetailsFormArray[num].document = $event.target.files[0];
        }else if(item.hoteServicesId == 6){
            this.fileRequestForm.value.hotelRestaurantServiceDetailsFormArray[num].document = $event.target.files[0];
        }

        if ($event.target.files && $event.target.files[0])
        {
            let reader = new FileReader();

            if(item.hoteServicesId == 1){
                reader.readAsDataURL(this.fileRequestForm.value.hotelBarServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelBarServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }else if(item.hoteServicesId == 2){
                reader.readAsDataURL(this.fileRequestForm.value.hotelClubServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelClubServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }else if(item.hoteServicesId == 3){
                reader.readAsDataURL(this.fileRequestForm.value.hotelOtherServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelOtherServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }else if(item.hoteServicesId == 4){
                reader.readAsDataURL(this.fileRequestForm.value.hotelSwimmingPoolServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelSwimmingPoolServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }else if(item.hoteServicesId == 5){
                reader.readAsDataURL(this.fileRequestForm.value.hotelPartyHallServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelPartyHallServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }else if(item.hoteServicesId == 6){
                reader.readAsDataURL(this.fileRequestForm.value.hotelRestaurantServiceDetailsFormArray[num].document);
                reader.onload = (e) => { this.fileRequestForm.value.hotelRestaurantServiceDetailsFormArray[num].document = $event.target.files[0]; };
            }

            reader.onerror = function (error) {};
        }
    }

}

export class SearchTradeLicenceNumber{
    tradeLicenceNumber: string;
    clientId: number;
}


export interface FileRequestServiceVM {
    hoteServicesId: number;
    name: string;
    checked: boolean;
    owned: boolean;
    fieldName: string;
    document: string;
}

export interface AddFileRequestVM
{
    tradeLicenceNumber: string;
    //liquorLicenseNumber: string;
    email: string;
    phoneNumber: string;
    businessType: number;
    groupId: number;
    requestType: number;
    ownerShip: number;
    star: number;
    parentLicenceNumber: string;
    // fileRequestService: FileRequestServiceVM[];
    clientId: number;
    categoryType: number;
    name: string;
    applicationNumber?: string;
    requestBy: number;
    emiratesIDNumber: string;
    entityName: string;
    userName: string;
}