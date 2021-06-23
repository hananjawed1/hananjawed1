import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../../_services/api.service';
import * as urls from '../../_services/ServiceUrls';
import { ActivatedRoute, Router } from '@angular/router';
import shortid from 'shortid';
import { IClientStatus, IClientHistorySearchVM, } from '../../_models';
import * as clientDetails from "../../_models/clientDetails";
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { fakeAsync } from '@angular/core/testing';
//import { ITaskAddVM, ManageTaskStatus, InspectionType, PriorityLevel } from '../task-management/task-management.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import { MatStepper } from '@angular/material/stepper';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import { ToastService } from 'src/app/_services/toast.service';
import { AuthenticationService } from '../../_services';
import { Console } from 'node:console';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'ls-file-opening-details',
  templateUrl: './file-opening-details.component.html',
  styleUrls: ['./file-opening-details.component.scss']
})

export class FileOpeningDetailsComponent implements OnInit {

  @ViewChild('UploadDocuments', {static: false})
    InputVar: ElementRef; 

    @ViewChild('closebutton') closebutton;

    @ViewChild('stepper') stepper;

    objPrivateTask: ITaskAddVM;
    formPrivateTask: FormGroup;
    formAddTask: FormGroup;
    StatusForTask = ManageTaskStatus;
    PriorityLevel = PriorityLevel;
    InspectionType = InspectionType;
    employeeList : any;
    employeeGroup : any;
    assignCheckListGroup : any;
    //Files : File[] = [];
    attachedDocument: File;
    urls = [];
    pipe = new DatePipe('en-US');
    isEditLiquorManager = null;
    updatedLiquorManager : string;
    isEditLiquorLimit = null;
    updatedLiquorLimit : 0;
    IsDisableLLN = true;
    IsDisableExpireDate = true;
    tempLLNumber : string;
    TaskImagePath: string;
    TaskVideoPath: string;
    TaskImageType: string;
    imageDetails = [];
    videoDetails = [];
    notesDetails: any;
    employeeGroupNameList : any;
    employeeNameList : any;
    docPdf :any;
    inspectionTaskDetails : any;
    inspectionTaskList : any;
    fileOpeningTaskList : any;
    fileOpeningPendingTaskList : any;
    fileOpeningCompletedTaskList: any;
    assignCheckListDetails: any;
    uploadDocumentTitle : string;
    fileRequestType = FileRequestType;
    paymentVoucherStatus = PaymentVoucherStatus;
    IsViewInspectionList = true;
    IsViewInspectionStatus = true;
    IsViewInspectionDetails = false;
    IsViewcertificate = true;
    IsPaymentVoucher = true;
    IsUploadRecept = true;
    IsPrivateDocument = true;
    messageTotheClient = '';
    UserAccess = 0;
    Addtask = false;
    employeeId = 0;
    taskStatus ='';

    searchClients: IClientHistorySearchVM =
    {
        status: 0,  page: 0,
        pageSize: 10,
        date: null
       ,clientId:0,
    }

    clientStatus: IClientStatus =
    {
        clientId: 0,
        companyName: '',
        employeeId: null,
        expiryDate: null,
        inspectionDate: null,
        privateNote: '',
        issueDate: null,
        clientNote: '',
        notes: '',
        partnerName: '',
        paymentVoucher: '',
        status: 0,
        typeofLicense:'', 
        licenceAmount : 0,
        certificateNotesForClient : '',
        certificateNotes : '',
        oldStatusForPrivate: 0,
    };

    ObjEmp : IAddFileOpeaningDetailsTask = {
        employeeId: 0, 
        taskStatus: '', 
        notes: '',
        status:'',
        taskId: 0,

    };


    status: number = 0;
    oldStatus: number = 0;
    clientDocumentDetails : any;
    PrivateDocumentDetails : any;
    liquorLicenseNumber = shortid.generate().toUpperCase();
    clientDetails: any;

    clientDetails1: clientDetails.IClientDetails =
    {
        businessContactNumber: '', businessLocation: '', businessType: 0, businessTypeString: '',
        clientHotelServices: [], clientId: 0, companyName: '', createdBy: '', createdOn: null, creationDateString: '',
        creator: null, description: '', employeeId: 0, expiryDate: null, groupId: 0, groups: null, inspectionDate: null,
        issueDate: null, liquorLicenseNumber: '', municipalityCertificate: '', otherCertificate: '', otherCertificateName: '',
        ownerShip: 0, parentLicenceNumber: '', partnerName: '', paymentVoucher: '', privateNote: '', requestType: 0,
        requestTypeString: '', star: 0, status: 0, statusColor: '', statusString: '', tourismCertificate: '',
        tradeLicenceNumber: '', updatedBy: '', updatedOn: null, updatedOnString: '', user: null, userId: '',
        expiryDateString: '', issueDateString: '', clientNote: '', employee: null, inspectionDateString: '',
        typeofLicense: '',receipt :'',isAssignedOnce:false, categoryType: 0, name:'', applicationNumber: '', 
        requestBy: 0,  emiratesIDNumber: '', entityName :'', authorizationPerson : '', licenceAmount : 0, tradeLicenseCopy:'',
        liquorLimitPerMonth : 0, requestLetterToServeAlcoholicBeverages: '', noObjectionFromTheOwner: '', monthlyConsumption: '',
        nationalIdentityForCommercialLicense: '', nationalIdentityOfThePerson: '', memorandumOfTheEstablishment: '',
        ownershipCertificate: '', leaseAgreement: '', classificationCertificate: '', interiorAndExteriorPictures: '',
        floorplan: '', noObjectionLetter: '', goodConductCertificate: '', certificateNotes :'',  hotelNoObjectionLetter:'', hotelOwnershipCertificate: '',
        hotelLeaseAgreement: '', hotelEstablishmentContract: '', hotelPhotos: '', hotelCriminalInvestigation: '',
        hotelFacilityManagementLetter: '', hotelPassports: '', hotelClassificationCertificate: '', hotelTouristLicense: '',
        restaurantNoObjectionLetter : '',restaurantOwnershipCertificate : '',restaurantLeaseAgreement : '',
        restaurantEstablishmentContract : '',restaurantCommercialLicense : '',restaurantClassificationCertificate : '',
        restaurantPassports : '',restaurantFacilityManagementLetter : '',restaurantCriminalInvestigation : '',restaurantPhotos : '',
        hotelApartmentNoObjectionLetter : '',hotelApartmentOwnershipCertificate : '',hotelApartmentLeaseAgreement : '',
        hotelApartmentEstablishmentContract : '',hotelApartmentTouristLicense : '',hotelApartmentClassificationCertificate : '',
        hotelApartmentPassports : '',hotelApartmentFacilityManagementLetter : '',hotelApartmentCriminalInvestigation : '',
        hotelApartmentPhotos : '',clubNoObjectionLetter : '',clubOwnershipCertificate : '',clubRentalContract : '',clubArticles : '',
        clubCommercialLicense : '',clubRegistrationCertificate : '',clubPassports : '',clubAdministration : '',
        clubCriminalInvestigation : '',reExportNoObjectionLetter : '',reExportTradeLicense : '',reExportPassport : '',
        reExportCompanyContract : '',reExportOwnershipCertificate : '',reExportConformityCertificate : '',reExportStorageStandards : '',
        reExportWarehouseCertificate : '',reExportSketchLocation : '',reExportPermitCertificate : '',reExportCriminalInvestigation : '',
        floatingCompanyContract : '',floatingCommercialLicense : '',floatingPassport : '',floatingLeaseContract : '',
        floatingNoObjection : '',floatingOwnership : '',floatingInsuranceCertificate : '',floatingManningCertificate : '',
        floatingVessel : '',floatingClassificationCertificate : '',floatingPermitLetter : '',floatingAlcoholicPermit : '',
        floatingCriminalInvestigation : '',floatingPhotos : '',shopsCommercialLicense : '',shopsLeaseContract : '',shopsSketchSite : '',
        importExportNoObjectionCertificate : '',importExportTradeLicense : '',importExportPassport : '',importExportCompanyContract : '',
        importExportLeaseContract :'', importExportCertificateOfFood :'', importExportConformityCertificate : '', 
        importExportWarehouseCertificate : '', importExportSketchLocation:'', importExportManagementLetter : '',
        importExportCertificateOfCriminal : '', campNoObjectionCertificate : '', campOwnershipCertificate : '',
        campRentalContract : '',campEstablishmentContract : '',campCommercialLicense : '',
        campClassificationCertificate : '',campPassport : '',campPermitLetter : '',campAdministration : '',campCriminalInvestigation : '',
        campPhotos : '', clubPhotos:''
    };
    
    inspectors: any;
    loading = false;
    loadingImg = false;
    taskLoading = false;
    taskListLoading = false;
    fileOpeningStatus: any;
    fileOpeningStatusAdmin: any;
    statusForEntityInfo: any;
    statusForEntityDoc: any;
    attachedVoucher: File;
    notes: string = '';
    message: string = '';
    imagePath: string;
    isPdf = false;
    isThisVideo = false;
    loading2 = false;
    loading3 = false;
    clients: any;
    page: number = 0;
    pagesCount: number = 0;
    totalCount: number = 0;
    siteLabel: any;
    ClientNewRequestDetails : any;
    stepIndex: number=0;
    clientHistory: any;
    currentUser: any;

    data = [];
      
    belowImageData;
    @ViewChild('carousel', {static : false}) carousel: NgbCarousel;

    constructor(public api: APIService, public activeRoute: ActivatedRoute, public router: Router, public fb: FormBuilder,public toast: ToastService, private authenticationService: AuthenticationService) {
        this.belowImageData = JSON.parse(JSON.stringify(this.data));
        this.belowImageData.splice(0,1);
       
        this.currentUser = this.authenticationService.currentUserValue;

        this.objPrivateTask = {
            id:0, taskName: '', taskDescription: '',startDate: '', endDate: '', priorityLevel:0, inspection:0, status:0, 
            location:'', employeeIds : null, empGroupIds : null, assignChecklistIds : null, latitude : 0, longitude : 0,
            taskImg : null, returnNote : null
        };
              
        this.UserAccess = Number(JSON.parse(localStorage.getItem('adminUser')).userAccess);

        if(this.UserAccess == 1){
            this.IsDisableExpireDate = false;
        }
        
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        this.searchClients.clientId = id;
        this.getFileOpeningStatus();
        this.getFileOpeningTask(id);
        this.getFileOpeningPendingTask(id); 
        this.getFileOpeningCompletedTask(id); 
        this.getInspectors();
        this.getClientDetails(id);
        this.searchMembership(0);
        this.createPrivateTaskForm();
        this.createAddTaskForm();


        this.getAllEmployee();
        this.getAllEmployeeGroup();
        this.getAllAssignChecklistGroup();

        //this.getInspectTaskDetailsByClientId();
        this.getClientDocumentDetails(id);
        this.getPrivateDocumentDetails(id);
        this.getClientNewRequestDetails(id);
        this.getInspectTaskListByClientId();
        this.getClientHistoryDetails();
    }

    getFileOpeningTask(id){
        this.api.getData(urls.UrlModel.FileRequest.GetAllFileOpeningTask + '?id=' + id).subscribe(res =>
            { console.log(res);
                if(res != null){
                this.fileOpeningTaskList = res;
            }else{
                this.fileOpeningTaskList = null;
            }
            });
    }
    getFileOpeningPendingTask(id){
        this.api.getData(urls.UrlModel.FileRequest.GetFileOpeningPendingTask + '?id=' + id).subscribe(res =>
            { if(res != null){
                this.fileOpeningPendingTaskList = res;
            }else{
                this.fileOpeningPendingTaskList = null;
            }
            });
    }
    getFileOpeningCompletedTask(id){
        this.api.getData(urls.UrlModel.FileRequest.GetFileOpeningCompletedTask + '?id=' + id).subscribe(res =>
            { if(res != null){
                this.fileOpeningCompletedTaskList = res;
            }else{
                this.fileOpeningCompletedTaskList = null;
            }
            });
    }

    getFileOpeningTaskById(task : IAddFileOpeaningDetailsTask){
       
        this.ObjEmp.employeeId = task.employeeId;
        this.ObjEmp.taskStatus = task.status;
        this.ObjEmp.notes = task.notes;
        this.ObjEmp.taskId = task.taskId;
        
    }
    messageToTheCLient(){
        //this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('ClientId', id + '');
        formdata.append('Message', this.messageTotheClient);

        this.api.PostImageData(urls.UrlModel.FileRequest.MessageToTheClient, formdata).subscribe(res =>
        {
            //this.loading3 = false;
            this.toast.success('Sent message to the client.!', 'Done');
            //this.api.toastrservice.success('Sent message to the client.!', 'Done');
            this.messageTotheClient = '';
            //this.closebutton.nativeElement.click();
        }, error => {
                //this.loading3 = false;
        });
    }

    changedTabSelection(selectedTab : string){        
        if(selectedTab == 'tab4'){
            this.status = 14;
            this.clientStatus.status = 14;
            this.IsViewInspectionStatus = true;
            this.IsViewInspectionList = true;            
        }
        else if(selectedTab == 'tab5') {
            if(this.IsPaymentVoucher){
                this.status = 10;
                this.clientStatus.status = 10;
            }else{
                this.status = 8;
                this.clientStatus.status = 8;
            }            
        }
        else if(selectedTab == 'tab1') {
            if(this.oldStatus == 2 || this.oldStatus == 3 || this.oldStatus == 4 || this.oldStatus == 5){
                this.status = Number(this.oldStatus);
                this.clientStatus.status = Number(this.oldStatus);     
            }else{
                this.status = 0;
                this.clientStatus.status = 0;       
            }
        }
        else if(selectedTab == 'tab6') {            
              if(this.oldStatus != 2 && this.oldStatus != 3 && this.oldStatus != 4 && this.oldStatus != 5
                    && this.oldStatus != 8 && this.oldStatus != 9 && this.oldStatus != 10 && this.oldStatus != 12
                    && this.oldStatus != 13 && this.oldStatus != 14 && this.oldStatus != 15){
                this.status = Number(this.oldStatus);
                this.clientStatus.status = Number(this.oldStatus);     
            }else{
                this.status = 0;
                this.clientStatus.status = 0;       
            }
        }
        else if(selectedTab == 'tab3') { 
            if(this.oldStatus == 5 || this.oldStatus == 15){
                this.status = Number(this.oldStatus);
                this.clientStatus.status = Number(this.oldStatus);     
            }else{
                this.status = 0;
                this.clientStatus.status = 0;       
            }     
        }
        else{
            this.status = Number(this.oldStatus);
            this.clientStatus.status = Number(this.oldStatus);

            if(this.clientStatus.status == 14){
                this.getInspectTaskDetailsByClientId();
            }
        }
    }


    addOrUpdateInspectionDocument(){
        this.IsViewInspectionStatus = false;
        this.status = 15;
        this.clientStatus.status = 15;

       
    }

    addOrUpdateInspection(){
       
        this.IsViewInspectionStatus = false;
        this.status = 14;
        this.clientStatus.status = 14;

        this.objPrivateTask.id = 0;
        this.objPrivateTask.taskName = this.clientDetails.entityName;
        this.objPrivateTask.taskDescription = '';
        this.objPrivateTask.startDate ='' ;
        this.objPrivateTask.endDate =  '';
        this.objPrivateTask.priorityLevel = 0;
        this.objPrivateTask.inspection = 0;
        this.objPrivateTask.status = 0;
        this.objPrivateTask.employeeIds = null;
        this.objPrivateTask.empGroupIds =  null;
        this.objPrivateTask.assignChecklistIds =  null;
        this.objPrivateTask.taskImg =  null;
        this.objPrivateTask.returnNote = null;
        this.objPrivateTask.location = '';
    }

    resetInspectionView(){
        this.IsViewInspectionStatus = true;
        this.IsViewInspectionDetails = false;
        this.IsViewInspectionList = true;
        this.status = Number(this.oldStatus);
        this.clientStatus.status = Number(this.oldStatus);
    }

    addOrUpdatePaymentVoucher(){
        this.IsViewcertificate = false;
        this.IsPaymentVoucher = true;        
        this.status = 10;
        this.clientStatus.status = 10;
    }

    addOrUpdateRecept(){
        this.IsViewcertificate = false;
        this.IsPaymentVoucher = false;   
        this.IsUploadRecept = true;     
        this.status = 15;
        this.clientStatus.status = 15;
    }

    addOrUpdatePrivateDocument(){
        this.IsViewcertificate = false;
        this.IsPaymentVoucher = false;   
        this.IsPrivateDocument = true;     
        this.status = 16;
        this.clientStatus.status = 16;
    }

    addOrUpdateCertficate(){
        this.IsViewcertificate = false;
        this.IsPaymentVoucher = false;
        this.status = 8;
        this.clientStatus.status = 8;

        if(this.clientDetails.issueDate == null){
            let nextYearDate = new Date();
            nextYearDate.setFullYear(nextYearDate.getFullYear()+1);

            this.clientStatus.issueDate = moment(new Date()).format(
                'YYYY-MM-DD',
            );

            this.clientStatus.expiryDate = moment(nextYearDate).format(
                'YYYY-MM-DD',
            );

            this.GetNextLiquorLicenseNumber(this.clientStatus.issueDate);
        }
    }

    resetPaymentVoucherView(){
        this.IsViewcertificate = true;
        this.status = Number(this.oldStatus);
        this.clientStatus.status = Number(this.oldStatus);
    }

    getClientNewRequestDetails(id : number){
        this.api.getData(urls.UrlModel.FileRequest.GetClinetNewFileRequestByClientId + '?ClientId=' + id).subscribe(res => {
            if(res.length > 0){
                this.ClientNewRequestDetails = res;
            }else{
                this.ClientNewRequestDetails = "";
            }
        });
    }
    
    ViewTaskDetails(task : any){
        $('#global-loader').fadeIn('fast');
        this.IsViewInspectionDetails = true;
        this.IsViewInspectionList = false;        
        this.inspectionTaskDetails = null;
        this.imageDetails = [];
        this.videoDetails = [];

        this.inspectionTaskDetails = task;

        if(this.inspectionTaskDetails.taskImageOrVideo.length > 0) {
            this.inspectionTaskDetails.taskImageOrVideo.forEach(element => {  
                if(this.isImage(element.taskImageOrVideo.split("/")[7])){
                    this.imageDetails.push(element);
                }
                if(this.isVideo(element.taskImageOrVideo.split("/")[7])){
                    this.videoDetails.push(element);
                }
            });
        }

        if(this.inspectionTaskDetails.taskNotes.length > 0){
            this.notesDetails = this.inspectionTaskDetails.taskNotes;
        }else{
            this.notesDetails = "";
        }

        if(this.inspectionTaskDetails.employeeNames != null && this.inspectionTaskDetails.employeeNames != ""){
            this.employeeNameList = this.inspectionTaskDetails.employeeNames;
        }else{
            this.employeeNameList = 'NA';
        }

        if(this.inspectionTaskDetails.employeeGroupNames != null && this.inspectionTaskDetails.employeeGroupNames != ""){
            this.employeeGroupNameList = this.inspectionTaskDetails.employeeGroupNames;
        }else{
            this.employeeGroupNameList = 'NA';
        }

        this.assignCheckListDetails = this.inspectionTaskDetails.assignCheckListGroupDetails;

        $('#global-loader').fadeOut('slow');
    }

    editInspectTaskDetailsByClientId(task : any){
        $('#global-loader').fadeIn('fast');
        this.IsViewInspectionDetails = false;
        this.IsViewInspectionStatus = false;
        this.IsViewInspectionList = false;

        this.status = 14;
        this.clientStatus.status = 14;

        this.inspectionTaskDetails = task;

        this.objPrivateTask.id = this.inspectionTaskDetails.id;
        this.objPrivateTask.taskName = this.inspectionTaskDetails.taskName;
        this.objPrivateTask.taskDescription = this.inspectionTaskDetails.taskDescription;
        this.objPrivateTask.startDate = this.inspectionTaskDetails.startDate;
        this.objPrivateTask.endDate = this.inspectionTaskDetails.endDate;
        this.objPrivateTask.priorityLevel = this.inspectionTaskDetails.priorityLevel;
        this.objPrivateTask.inspection = this.inspectionTaskDetails.inspection;
        this.objPrivateTask.status = this.inspectionTaskDetails.status;
        this.objPrivateTask.location = this.inspectionTaskDetails.location;
        this.objPrivateTask.latitude = this.inspectionTaskDetails.latitude;
        this.objPrivateTask.longitude = this.inspectionTaskDetails.longitude;
        this.objPrivateTask.returnNote = null;

        if(this.inspectionTaskDetails.employeeIds != null && this.inspectionTaskDetails.employeeIds != "" && this.inspectionTaskDetails.employeeIds != 0){
            this.objPrivateTask.employeeIds = Array(this.inspectionTaskDetails.employeeIds.split(",").map(x=>+x))[0];
        }else{
            this.objPrivateTask.employeeIds = null;
        }

        if(this.inspectionTaskDetails.empGroupIds != null && this.inspectionTaskDetails.empGroupIds != "" && this.inspectionTaskDetails.empGroupIds != 0){
            this.objPrivateTask.empGroupIds = Array(this.inspectionTaskDetails.empGroupIds.split(",").map(x=>+x))[0];
        }else{
            this.objPrivateTask.empGroupIds = null;
        }

        if(this.inspectionTaskDetails.assignChecklistIds != null && this.inspectionTaskDetails.assignChecklistIds != "" && this.inspectionTaskDetails.assignChecklistIds != 0){
            this.objPrivateTask.assignChecklistIds = Array(this.inspectionTaskDetails.assignChecklistIds.split(",").map(x=>+x))[0];
        }else{
            this.objPrivateTask.assignChecklistIds = null;
        }

        if(this.inspectionTaskDetails.taskImageOrVideo.length > 0) {
            this.inspectionTaskDetails.taskImageOrVideo.forEach(element => {  
                if(this.isImage(element.taskImageOrVideo.split("/")[7])){
                    this.imageDetails.push(element);
                }
                if(this.isVideo(element.taskImageOrVideo.split("/")[7])){
                    this.videoDetails.push(element);
                }
            });
        }

        if(this.inspectionTaskDetails.taskNotes.length > 0){
            this.notesDetails = this.inspectionTaskDetails.taskNotes;
        }else{
            this.notesDetails = "";
        }

        if(this.inspectionTaskDetails.employeeNames != null && this.inspectionTaskDetails.employeeNames != ""){
            this.employeeNameList = this.inspectionTaskDetails.employeeNames;
        }else{
            this.employeeNameList = 'NA';
        }

        if(this.inspectionTaskDetails.employeeGroupNames != null && this.inspectionTaskDetails.employeeGroupNames != ""){
            this.employeeGroupNameList = this.inspectionTaskDetails.employeeGroupNames;
        }else{
            this.employeeGroupNameList = 'NA';
        }

        this.assignCheckListDetails = this.inspectionTaskDetails.assignCheckListGroupDetails;
        if(this.inspectionTaskDetails.assignCheckListDetails == undefined){
            this.inspectionTaskDetails.assignCheckListDetails = "";
        }

        $('#global-loader').fadeOut('slow');
    }

    getInspectTaskDetailsByClientId(){
        this.taskLoading = true;
        this.api.getData(urls.UrlModel.FileRequest.GetInspectTaskDetailsByClientId + '?clientId=' + this.searchClients.clientId).subscribe(res => {
            if(res != null){
                this.inspectionTaskDetails = res[0];
                
                this.objPrivateTask.id = this.inspectionTaskDetails.id;
                this.objPrivateTask.taskName = this.inspectionTaskDetails.taskName;
                this.objPrivateTask.taskDescription = this.inspectionTaskDetails.taskDescription;
                this.objPrivateTask.startDate = this.inspectionTaskDetails.startDate;
                this.objPrivateTask.endDate = this.inspectionTaskDetails.endDate;
                this.objPrivateTask.priorityLevel = this.inspectionTaskDetails.priorityLevel;
                this.objPrivateTask.inspection = this.inspectionTaskDetails.inspection;
                this.objPrivateTask.status = this.inspectionTaskDetails.status;
                this.objPrivateTask.location = this.inspectionTaskDetails.location;
                this.objPrivateTask.latitude = this.inspectionTaskDetails.latitude;
                this.objPrivateTask.longitude = this.inspectionTaskDetails.longitude;
                this.objPrivateTask.returnNote = this.inspectionTaskDetails.returnNote;
    
                if(this.inspectionTaskDetails.employeeIds != null && this.inspectionTaskDetails.employeeIds != "" && this.inspectionTaskDetails.employeeIds != 0){
                    this.objPrivateTask.employeeIds = Array(this.inspectionTaskDetails.employeeIds.split(",").map(x=>+x))[0];
                }else{
                    this.objPrivateTask.employeeIds = null;
                }
    
                if(this.inspectionTaskDetails.empGroupIds != null && this.inspectionTaskDetails.empGroupIds != "" && this.inspectionTaskDetails.empGroupIds != 0){
                    this.objPrivateTask.empGroupIds = Array(this.inspectionTaskDetails.empGroupIds.split(",").map(x=>+x))[0];
                }else{
                    this.objPrivateTask.empGroupIds = null;
                }
    
                if(this.inspectionTaskDetails.assignChecklistIds != null && this.inspectionTaskDetails.assignChecklistIds != "" && this.inspectionTaskDetails.assignChecklistIds != 0){
                    this.objPrivateTask.assignChecklistIds = Array(this.inspectionTaskDetails.assignChecklistIds.split(",").map(x=>+x))[0];
                }else{
                    this.objPrivateTask.assignChecklistIds = null;
                }

                if(this.inspectionTaskDetails.taskImageOrVideo.length > 0) {
                    this.inspectionTaskDetails.taskImageOrVideo.forEach(element => {  
                        if(this.isImage(element.taskImageOrVideo.split("/")[7])){
                            this.imageDetails.push(element);
                        }
                        if(this.isVideo(element.taskImageOrVideo.split("/")[7])){
                            this.videoDetails.push(element);
                        }
                    });
                }

                if(this.inspectionTaskDetails.taskNotes.length > 0){
                    this.notesDetails = this.inspectionTaskDetails.taskNotes;
                }else{
                    this.notesDetails = "";
                }

                if(this.inspectionTaskDetails.employeeNames != null && this.inspectionTaskDetails.employeeNames != ""){
                    this.employeeNameList = this.inspectionTaskDetails.employeeNames;
                }else{
                    this.employeeNameList = 'NA';
                }
    
                if(this.inspectionTaskDetails.employeeGroupNames != null && this.inspectionTaskDetails.employeeGroupNames != ""){
                    this.employeeGroupNameList = this.inspectionTaskDetails.employeeGroupNames;
                }else{
                    this.employeeGroupNameList = 'NA';
                }

                this.assignCheckListDetails = this.inspectionTaskDetails.assignCheckListGroupDetails;
                if(this.inspectionTaskDetails.assignCheckListDetails == undefined){
                    this.inspectionTaskDetails.assignCheckListDetails = "";
                }

                this.inspectionTaskDetails = null;
            }else{
                this.inspectionTaskDetails = null;
            }
            
            this.taskLoading = false;
        });
    }

    
    getInspectTaskListByClientId(){
        this.taskListLoading = true;
        this.api.getData(urls.UrlModel.FileRequest.GetInspectTaskListByClientId + '?clientId=' + this.searchClients.clientId).subscribe(res => {
            if(res != null){
                this.inspectionTaskList = res;
            }else{
                this.inspectionTaskList = null;
            }
            
            this.taskListLoading = false;
        });
    }

    editLLNumber() {
        this.IsDisableLLN = false;
    }

    resetLLNumber() {
        this.IsDisableLLN = true;     
        this.clientDetails.liquorLicenseNumber = this.tempLLNumber;
    }

    playTaskVideo(video: any) {
        this.TaskVideoPath = video.taskImageOrVideo;
    }

    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }
    
    isImage(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
          case 'jpg':
          case 'gif':
          case 'bmp':
          case 'png':
            return true;
        }
        return false;
    }
    
    isVideo(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
          case 'm4v':
          case 'avi':
          case 'mpg':
          case 'mp4':
            // etc
            return true;
        }
        return false;
    }    

    // onFileChange(event)  {
    //     for  (var i =  0; i <  event.target.files.length; i++)  {  
           
    //         var reader = new FileReader();

    //         reader.onload = (event:any) => {
    //             this.urls.push(event.target.result); 
    //         }
    //         this.Files.push(event.target.files[i]);
    //         reader.readAsDataURL(event.target.files[i]);            
    //     }
    // }

    // deleteImage(url: any, index: number): void {
    //     this.urls = this.urls.filter((a) => a !== url);
    //     this.Files.splice(index, 1);
    //     if(this.Files.length == 0){
    //         this.Files = [];
    //         this.InputVar.nativeElement.value = "";
    //     }
    // }

    // reset() {
    //     this.Files = [];
    //     this.InputVar.nativeElement.value = "";
    // }

    showTaskImage(imgs: any) {
        this.TaskImageType = imgs.taskImageOrVideo;
        this.TaskImagePath = imgs.taskImageOrVideo;
    }

    showDocuments(imgs: any) {
        this.TaskImageType = imgs;
        this.TaskImagePath = imgs;
    }
    
    isImageBased64() {
        return this.TaskImageType === 'Task Image';
    }
    
    createPrivateTaskForm()
    {
        this.formPrivateTask = this.fb.group({
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
            returnNote: new FormControl(null),
        });
    }

    createAddTaskForm(){
        this.formAddTask = this.fb.group({
            employeeId : new FormControl(0,Validators.required), 
            taskStatus: new FormControl("",Validators.required),
            notes: new FormControl("",Validators.required),
        });
    }

 

    getAllEmployee(){
        this.api.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
            this.employeeList = res;
        });
    }

    getAllEmployeeGroup(){
        this.api.getData(urls.UrlModel.ManageEmployee.GetAllEmployeeGroup).subscribe(res => {
            this.employeeGroup = res;
        });
    }

    getAllAssignChecklistGroup(){
        this.api.getData(urls.UrlModel.ManageEmployee.GetAllAssignCheckListGroup).subscribe(res => {
            this.assignCheckListGroup = res;
        });
    }

    getInspectors() {
        this.api.getData(urls.UrlModel.ManageEmployee.AllInspector).subscribe(res => {
            this.inspectors = res;
        });
    }

    setStatus()
    {
        this.clientStatus.status = Number(this.status);
        if(this.status == 10){
        }
    }

    updateStatus()
    {
        this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();

        //assign inspection
        // if (Number(this.clientStatus.status) == 9)
        // {
        //     const inspectionDate = moment(this.clientStatus.inspectionDate).format(
        //         'YYYY-MM-DD h:mm:ss',
        //     );
        //     if (this.clientStatus.inspectionDate != null) {
        //         formdata.append('InspectionDate', inspectionDate);
        //     }
        // }

        //issue certificate
        if (Number(this.clientStatus.status) == 8)
        {
            const issueDate = moment(this.clientStatus.issueDate).format(
                'YYYY-MM-DD',
            );
            const expiryDate = moment(this.clientStatus.expiryDate).format(
                'YYYY-MM-DD',
            );

            if (this.clientStatus.issueDate != null) {
                formdata.append('IssueDate', issueDate);
            }
            if (this.clientStatus.expiryDate != null) {
                formdata.append('ExpiryDate', expiryDate);
            }
        }
        

        formdata.append('ClientId', id + '');
        // if (this.clientStatus.employeeId!=null) {
        //     formdata.append('EmployeeId', this.clientStatus.employeeId + '');
        // }
        formdata.append('Status', this.clientStatus.status + '');
        formdata.append('OldStatusForPrivate', this.oldStatus + ''); 
        formdata.append('Notes', this.clientStatus.notes);
        formdata.append('PrivateNote', this.clientStatus.privateNote);
        formdata.append('CompanyName', this.clientStatus.companyName);
        formdata.append('PartnerName', this.clientStatus.partnerName);
        formdata.append('ClientNote', this.clientStatus.clientNote);
        formdata.append('TypeofLicense', this.clientStatus.typeofLicense);
        formdata.append('LiquorLicenseNumber', this.clientDetails.liquorLicenseNumber);
        formdata.append('LicenceAmount', this.clientStatus.licenceAmount+'');
        formdata.append('CertificateNotesForClient', this.clientStatus.certificateNotesForClient);
        formdata.append('CertificateNotes', this.clientStatus.certificateNotes);
        
        formdata.append('PaymentVoucher', this.attachedVoucher);

        if (Number(this.clientStatus.status) == 15 || (Number(this.clientStatus.status) == 16))
        {
            formdata.append("UploadDocumentTitle",  this.uploadDocumentTitle);
            formdata.append("UploadDocument",  this.attachedDocument);
            // for  (var i =  0; i <  this.Files.length; i++)  {  
            //     formdata.append("UploadDocument",  this.Files[i]);
            // } 
        }

        ////////////////// PRIVATE TASK DETAILS /////////////////

        if (Number(this.clientStatus.status) == 14)
        {
            formdata.append('TaskId', this.objPrivateTask.id+'');
            formdata.append('TaskName', this.objPrivateTask.taskName);
            formdata.append('TaskDescription', this.objPrivateTask.taskDescription);
            formdata.append('StartDate', this.objPrivateTask.startDate+'');
            formdata.append('EndDate', this.objPrivateTask.endDate+'');

            this.objPrivateTask.priorityLevel = Number(this.objPrivateTask.priorityLevel);
            formdata.append('PriorityLevel', this.objPrivateTask.priorityLevel+'');
            this.objPrivateTask.inspection = Number(this.objPrivateTask.inspection);
            formdata.append('Inspection', this.objPrivateTask.inspection+'');
            this.objPrivateTask.status = Number(this.objPrivateTask.status);
            formdata.append('TaskStatus', this.objPrivateTask.status+'');
            formdata.append('ReturnNote', this.objPrivateTask.returnNote);

            if(this.objPrivateTask.location == "NA"){
                this.toast.error('Please update or set business location.','Error');
                this.loading3 = false;
                return false;
            }

            formdata.append('Location', this.objPrivateTask.location);

            if(Number(this.objPrivateTask.employeeIds) != 0){
                this.objPrivateTask.employeeIds = this.objPrivateTask.employeeIds.join(",");   
            }else{
                this.objPrivateTask.employeeIds = null;
            }
            formdata.append('EmployeeIds', this.objPrivateTask.employeeIds);

            if(Number(this.objPrivateTask.empGroupIds) != 0){
                this.objPrivateTask.empGroupIds = this.objPrivateTask.empGroupIds.join(",");
            }else{
                this.objPrivateTask.empGroupIds = null;
            }
            formdata.append('EmpGroupIds', this.objPrivateTask.empGroupIds);

            if(Number(this.objPrivateTask.assignChecklistIds) != 0){
                this.objPrivateTask.assignChecklistIds = this.objPrivateTask.assignChecklistIds.join(",");
            }else{
                this.objPrivateTask.assignChecklistIds = null;
            }
            formdata.append('AssignChecklistIds', this.objPrivateTask.assignChecklistIds);

            if(this.objPrivateTask.latitude == null || this.objPrivateTask.latitude == null){
                formdata.append('Latitude', "0");
                formdata.append('Longitude', "0");            
            }else{
                formdata.append('Latitude', this.objPrivateTask.latitude+'');
                formdata.append('Longitude', this.objPrivateTask.longitude+'');            
            }
        }

        /////////////////////////////////////////////////////////////////////////////////

        this.api.PostImageData(urls.UrlModel.FileRequest.UpdateStatus, formdata).subscribe(res =>
        {
            this.loading3 = false;
            this.toast.success('Status updated successfully!', 'Done');
            //this.api.toastrservice.success('Status updated successfully!', 'Done');
            //this.reset();

            this.IsViewInspectionStatus = true;
            this.IsViewcertificate = true;
            this.IsViewInspectionDetails = false;
            this.IsViewInspectionList = true; 

            this.getClientDetails(id);
            this.searchMembership(0);
            //this.getInspectTaskDetailsByClientId();
            this.getClientDocumentDetails(id);
            this.getPrivateDocumentDetails(id);
            this.getClientNewRequestDetails(id);
            this.getInspectTaskListByClientId();
            this.getClientHistoryDetails();
        }, error => {
             this.loading3 = false;
        });
    }

    updatePaymentReceiptStatus()
    {
        this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('ClientId', id + '');
        formdata.append('ReceiptStatus', this.paymentVoucherStatus.ReceiptApproved + '');

        this.api.PostImageData(urls.UrlModel.FileRequest.UpdatePaymentReceiptStatus, formdata).subscribe(res =>
        {
            this.loading3 = false;
            this.toast.success('Client Receipt has been approved successfully!', 'Done');
           // this.api.toastrservice.success('Client Receipt has been approved successfully!', 'Done');
        }, error => {
             this.loading3 = false;
        });
    }

    getClientHistoryDetails() {
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        this.api.getData(urls.UrlModel.FileRequest.GetClientHistoryByClientId + '?ClientId=' + id).subscribe(res => {
            this.clientHistory = res;
        });
    }

    updateInspectionTaskStatus(task : any)
    {
        this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('TaskId', task.id + '');
        formdata.append('TaskStatus', this.StatusForTask.ClosedByAdmin +'');
             
        this.api.PostImageData(urls.UrlModel.FileRequest.UpdateInspectionStatus, formdata).subscribe(res =>
        {
            this.loading3 = false;
            this.toast.success('Task close by admin successfully!', 'Done');
            this.getInspectTaskListByClientId();
            // this.api.toastrservice.success('Task close by admin successfully!', 'Done');
        }, error => {
             this.loading3 = false;
        });

        let formdataforVoucher = new FormData();
      
        formdataforVoucher.append('ClientId', id + '');
        formdataforVoucher.append('PaymentVoucher', this.attachedVoucher);
        formdataforVoucher.append('Status',  10 +'');
        this.api.PostImageData(urls.UrlModel.FileRequest.UpdateStatus, formdataforVoucher).subscribe(res =>
        {
            this.loading3 = false;
            //this.api.toastrservice.success('Status updated successfully!', 'Done');
            //this.reset();

            this.IsViewInspectionStatus = true;
            this.IsViewcertificate = true;
            this.IsViewInspectionDetails = false;
            this.IsViewInspectionList = true; 

            this.getClientDetails(id);
            this.searchMembership(0);
            //this.getInspectTaskDetailsByClientId();
            this.getClientDocumentDetails(id);
            this.getPrivateDocumentDetails(id);
            this.getClientNewRequestDetails(id);
            this.getInspectTaskListByClientId();
            this.getClientHistoryDetails();
        }, error => {
             this.loading3 = false;
        });

    }

    GetClientRequest(){
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        this.router.navigateByUrl('view-client-request/'+id);
    }

    ngOnInit(): void
    {
        this.activeRoute.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.api.getAppLabel(IsActive);
            }
        )
    }

    editLiquorManager(){
        this.isEditLiquorManager = true;
        this.updatedLiquorManager = this.clientDetails.authorizationPerson;
    }

    resetLiquorManager(){
        this.isEditLiquorManager = null;
        this.updatedLiquorManager = "";
    }

    updateLiquorManager(){
        this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('ClientId', id + '');
        formdata.append('AuthorizationPerson', this.updatedLiquorManager);

        this.api.PostImageData(urls.UrlModel.FileRequest.UpdateLiquorManager, formdata).subscribe(res =>
        {
            this.loading3 = false;
            this.toast.success('Liquor Manager updated successfully!', 'Done');
            // this.api.toastrservice.success('Liquor Manager updated successfully!', 'Done');
            this.isEditLiquorManager = null;

            this.IsViewInspectionStatus = true;
            this.IsViewcertificate = true;
            
            this.getClientDetails(id);
        }, error => {
             this.loading3 = false;
        });
    }

    editLiquorLimit(){
        this.isEditLiquorLimit = true;
        this.updatedLiquorLimit = this.clientDetails.liquorLimitPerMonth;
    }

    resetLiquorLimit(){
        this.isEditLiquorLimit = null;
        this.updatedLiquorLimit = 0;
    }

    updateLiquorLimit(){
        this.loading3 = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('ClientId', id + '');
        formdata.append('LiquorLimit', this.updatedLiquorLimit +'');

        this.api.PostImageData(urls.UrlModel.FileRequest.UpdateLiquorLimit, formdata).subscribe(res =>
        {
            this.loading3 = false;
            this.toast.success('Liquor limit updated successfully!', 'Done');
            // this.api.toastrservice.success('Liquor limit updated successfully!', 'Done');
            this.isEditLiquorLimit = null;

            this.IsViewInspectionStatus = true;
            this.IsViewcertificate = true;
            
            this.getClientDetails(id);
        }, error => {
             this.loading3 = false;
        });
    }

    onChangeDocument($event ) {
        this.attachedVoucher = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.attachedVoucher);
            reader.onload = (e) =>
            {
                //this.clientStatus.paymentVoucher = reader.result;
            };
            reader.onerror = function (error) {
            };
        }
    }

    onChangeUploadDocument($event) {
        let fileSize = ($event.target.files[0].size/1024/1024);
        if(fileSize > 3){
            $event.target.value = "";
            this.api.toastrservice.error("File size is too large : " + fileSize.toFixed(4) + ". Maximum size : " + 3 + " MB", 'Error');
            return false;
        }

        this.attachedDocument = $event.target.files[0];
        
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.attachedDocument);
            reader.onload = (e) =>
            {
                //this.clientStatus.paymentVoucher = reader.result;
            };
            reader.onerror = function (error) {
            };
        }
    }

    range() {
        var step = 2;
        var doubleStep = step * 2;
        var start = Math.max(0, this.page - step);
        var end = start + 1 + doubleStep;
        if (end > this.pagesCount) { end = this.pagesCount; }
        var ret = [];
        for (var i = start; i != end; ++i) {
            ret.push(i);
        }
        return ret;
    }

    searchMembership(page) {
        page = page || 0;
        this.loading2 = true;
        this.searchClients.page = page;
        this.searchClients.status = Number(this.searchClients.status);
       
        this.api.PostData(urls.UrlModel.FileRequest.SearchHistory, this.searchClients).subscribe(res => {
            this.clients = res.items;
            
            this.loading2 = false;
            this.page = res.page;
            this.pagesCount = res.totalPages;
            this.totalCount = res.totalCount;
        });
    }

    GetNextLiquorLicenseNumber(selectedDate : string) {  
        if(this.clientDetails.liquorLicenseNumber == null || this.clientDetails.liquorLicenseNumber == "NA" || this.clientDetails.liquorLicenseNumber == ""){
            if(this.clientDetails.businessType != 0){
                this.api.getData(urls.UrlModel.FileRequest.GetNextLiquorLicenseNumber+ '?businessTypeId=' + this.clientDetails.businessType).subscribe(res => { 
                    if(selectedDate != null && res != null){
                        this.clientDetails.liquorLicenseNumber = res + "/" + selectedDate.split("-")[0];
                        this.tempLLNumber = this.clientDetails.liquorLicenseNumber;
                    }else{
                        this.clientDetails.liquorLicenseNumber = "";
                        this.api.toastrservice.error('Please contact to administrator or Liquor License Number not generated correctly..!', 'Error');
                    }
                });   
            }else{
                this.clientDetails.liquorLicenseNumber = "";
                this.api.toastrservice.error('Please first select the correct business type...!', 'Error');    
            }
        }
    }

    getFileOpeningStatus()
    {
        //if (Number( this.clientDetails.status) == 2)
        //{ 
        //    this.api.getData(urls.UrlModel.Common.FileOpeningStatusForApproved).subscribe(res => {
        //        this.fileOpeningStatus = res;
        //        this.fileOpeningStatusAdmin = res;
        //    });
        //} else
        //{ 
        //    this.api.getData(urls.UrlModel.Common.FileOpeningStatusForNew).subscribe(res => {
        //        this.fileOpeningStatus = res;
        //        this.fileOpeningStatusAdmin = res;
        //    });
        //}

        this.api.getData(urls.UrlModel.Common.FileOpeningStatus).subscribe(res => { 
            this.fileOpeningStatus = res;
            this.fileOpeningStatusAdmin = res.filter(r => r.id != 2 && r.id != 3 && r.id != 4 && r.id != 5 
                    && r.id != 8 && r.id != 9 && r.id != 10 && r.id != 12 && r.id != 13 && r.id != 14 && r.id != 15 && r.id != 17 && r.id != 16);
            this.statusForEntityInfo = res.filter(r => r.id == 2 || r.id == 3 || r.id == 4 || r.id == 5);
            this.statusForEntityDoc  = res.filter(r => r.id == 15 || r.id == 5 || r.id == 16 || r.id == 17);
        });
    }

    getClientDetails(id) {
        $('#global-loader').fadeIn('fast');
        this.loading = true;
        this.api.getData(urls.UrlModel.FileRequest.GetDetails + '?id=' + id).subscribe(res => {
            this.objPrivateTask.latitude = res.latitude;
            this.objPrivateTask.longitude = res.longitude;
            this.objPrivateTask.location = res.businessLocation;
            //this.clientDetails = res as clientDetails.IClientDetails;
            this.clientDetails = res;
            console.log(res);
            this.clientDetails.status = Number(res.status);
            this.status = Number(this.clientDetails.status);
            this.oldStatus = Number(this.clientDetails.status);
            
            this.clientStatus.status = this.clientDetails.status;
            this.clientStatus.companyName = this.clientDetails.companyName;
            this.clientStatus.partnerName = this.clientDetails.partnerName;

            this.clientStatus.issueDate = moment(this.clientDetails.issueDate).format(
                'YYYY-MM-DD',
            );

            this.clientStatus.expiryDate = moment(this.clientDetails.expiryDate).format(
                'YYYY-MM-DD',
            );

            // this.clientStatus.issueDate = this.clientDetails.issueDate;
            // this.clientStatus.expiryDate = this.clientDetails.expiryDate;

            this.tempLLNumber = this.clientDetails.liquorLicenseNumber;
            this.clientStatus.privateNote = null; //this.clientDetails.privateNote; 
            this.clientStatus.clientNote = null; //this.clientDetails.clientNote;
            this.clientStatus.employeeId = this.clientDetails.employeeId;
            this.clientStatus.inspectionDate = null; //this.clientDetails.inspectionDate;
            this.clientStatus.typeofLicense = this.clientDetails.businessTypeString;

            if (this.clientDetails.licenceAmount == null || this.clientDetails.licenceAmount == 0){
                this.clientDetails.licenceAmount = this.clientDetails.liquorLimitPerMonth;
            }

            this.clientStatus.licenceAmount = this.clientDetails.licenceAmount;
            this.clientStatus.certificateNotesForClient = this.clientDetails.certificateNotesForClient;
            this.clientStatus.certificateNotes = this.clientDetails.certificateNotes;           
            setTimeout(() => {
                this.loading = false;
                $('#global-loader').fadeOut('slow');
            }, 500);
        });
    }
    
    downloadPdf(pdfUrl: string) {
        let pdfNewName = pdfUrl.split('/')[7];
        FileSaver.saveAs(pdfUrl, pdfNewName);
    }

    openDoc(pdfUrl: string) {
        console.log(pdfUrl);
        window.open(pdfUrl, '_blank', '', true);
    }

    getClientDocumentDetails(id) {
        //this.loading = true;
        this.api.getData(urls.UrlModel.FileRequest.ClientDocumentDetails + '?id=' + id).subscribe(res => {
            if(res.length > 0){
                this.clientDocumentDetails = res;
            }else{
                this.clientDocumentDetails = "";
            }
            //this.loading = false;
        });
    }

    getPrivateDocumentDetails(id) {
        //this.loading = true;
        this.api.getData(urls.UrlModel.FileRequest.PrivateDocumentDetails + '?id=' + id).subscribe(res => {
            if(res.length > 0){
                this.PrivateDocumentDetails = res;
            }else{
                this.PrivateDocumentDetails = "";
            }
            //this.loading = false;
        });
    }

    
    showPassport(img: any) {
        if (img === 'tourism') {
            //this.imagePath = environment.domainURl + this.clientDetails.tourismCertificate;
            this.imagePath = this.clientDetails.tourismCertificate;
        } else if (img === 'municipality') {
            //this.imagePath = environment.domainURl + this.clientDetails.municipalityCertificate;
            this.imagePath = this.clientDetails.municipalityCertificate;
        }
        else if (img === 'other') {
            //this.imagePath = environment.domainURl + this.clientDetails.otherCertificate;
            this.imagePath = this.clientDetails.otherCertificate;
        }
        else if (img === 'payment') { 
            this.imagePath = environment.domainURl + this.clientDetails.paymentVoucher;
            //this.imagePath = this.clientDetails.paymentVoucher;
        } else if (img === 'receipt') {           
            //this.imagePath = environment.domainURl + this.clientDetails.receipt;
            this.imagePath = this.clientDetails.receipt;
        }
        else if (img === 'RequestLetterToServeAlcoholicBeverages') {
            this.imagePath = this.clientDetails.requestLetterToServeAlcoholicBeverages;
        }
        else if (img === 'NoObjectionFromTheOwner') {
            this.imagePath = this.clientDetails.noObjectionFromTheOwner;
        }
        else if (img === 'MonthlyConsumption') {
            this.imagePath = this.clientDetails.monthlyConsumption;
        }
        else if (img === 'NationalIdentityForCommercialLicense') {
            this.imagePath = this.clientDetails.nationalIdentityForCommercialLicense;
        }
        else if (img === 'NationalIdentityOfThePerson') {
            this.imagePath = this.clientDetails.nationalIdentityOfThePerson;
        }
        else if (img === 'MemorandumOfTheEstablishment') {
            this.imagePath = this.clientDetails.memorandumOfTheEstablishment;
        }
        else if (img === 'OwnershipCertificate') {
            this.imagePath = this.clientDetails.ownershipCertificate;
        }
        else if (img === 'LeaseAgreement') {
            this.imagePath = this.clientDetails.leaseAgreement;
        }
        else if (img === 'ClassificationCertificate') {
            this.imagePath = this.clientDetails.classificationCertificate;
        }
        else if (img === 'InteriorAndExteriorPictures') {
            this.imagePath = this.clientDetails.interiorAndExteriorPictures;
        }
        else if (img === 'Floorplan') {
            this.imagePath = this.clientDetails.floorplan;
        }
        else if (img === 'NoObjectionLetter') {
            this.imagePath = this.clientDetails.noObjectionLetter;
        }
        else if (img === 'GoodConductCertificate') {
            this.imagePath = this.clientDetails.goodConductCertificate;
        }
    }

    showImages(imgFile: any) {
        this.loadingImg = true;
        this.imagePath = imgFile;

        if(this.imagePath.includes("pdf")){
            this.isPdf = true;
        }else{
            this.isPdf = false; 
        }

        if(this.isVideo(imgFile.split("/")[7])){
            this.isThisVideo = true;
        }else{
            this.isThisVideo = false;
        }
        
        setTimeout(() => {
            this.loadingImg = false;
        }, 500);
    }

    async downloadImage(imagePath : any){
        let imageName = imagePath.split('/')[7];
        FileSaver.saveAs(imagePath, imageName);
    }

    showDocument(path: string) {
        if (path != null) {
            //this.imagePath = environment.domainURl + path;
            this.imagePath = path;             
        } else {
            this.imagePath = '';
        }
    }

    public exportToPdf() {
        const format = 'dd/MM/yyyy';
        const locale = 'en-US';
  
        const rate = 1;
        const extend = 5;
        const doc = new jsPDF({
            orientation: 'landscape',
            format: [(900 * rate) + extend, (1000 * rate) + extend]
        });
        
        
        const wrongNumber = 5;
        const top = (5 * rate) + wrongNumber;
        const line = 4 * rate;
        const left = (10 * rate) + wrongNumber;
        const imageTop = (32 * rate) + wrongNumber;
        const imageLeft = (57 * rate) + wrongNumber;
  
        doc.setFontSize(10 * rate);
        doc.text('Task Name : ' + this.inspectionTaskDetails.taskName, left, top + line);
        doc.text('Task Description : '+ this.inspectionTaskDetails.taskDescription, left, top + (line * 3));
        // tslint:disable-next-line: max-line-length
        doc.text('Start Date : ' + (this.inspectionTaskDetails.startDate ? formatDate(this.inspectionTaskDetails.startDate, format, locale) : 'NULL'), left, top + (line * 5));
        doc.text('End Date : ' + (this.inspectionTaskDetails.endDate ? formatDate(this.inspectionTaskDetails.endDate, format, locale) : 'NULL'), left, top + (line * 7));
        if(this.inspectionTaskDetails.priorityLevel === 1){
          doc.text('Priority Level : ' + 'High', left, top +(line * 9));
        }
        if(this.inspectionTaskDetails.priorityLevel === 2){
          doc.text('Priority Level : ' + 'Medium', left, top +(line * 9));
        }
        if(this.inspectionTaskDetails.priorityLevel === 3){
          doc.text('Priority Level : ' + 'Low', left, top +(line * 9));
        }
        if(this.inspectionTaskDetails.inspection  === 1){
          doc.text('Type of Inspection : ' + 'Normal Inspection', left, top +(line * 11));
        }
        if(this.inspectionTaskDetails.inspection  === 2){
          doc.text('Type of Inspection : ' + ' Surprise Inspection', left, top +(line * 11));
        }
        if(this.inspectionTaskDetails.status === 1){
          doc.text('Task Status : ' + 'New', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 2){
          doc.text('Task Status : ' + 'In Progress', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 3){
          doc.text('Task Status : ' + 'Accepted', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 4){
          doc.text('Task Status : ' + 'At Location', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 5){
          doc.text('Task Status : ' + 'Completed', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 6){
          doc.text('Task Status : ' + 'Cancelled', left, top +(line * 13));
        }
        if(this.inspectionTaskDetails.status === 7){
          doc.text('Task Status : ' + 'Rejected', left, top +(line * 13));
        }
  
        doc.text('System Employees : '+ this.employeeNameList, left, top + (line * 15));
  
        doc.text('Employee Group : '+ this.employeeGroupNameList, left, top + (line * 17));
  
        doc.text('Assign Checklist Group : ', left, top + (line * 19));
       
            var lineodd = 19;
        for (var val of this.assignCheckListDetails) {
          doc.text("" + val.name, left, top + (line * (lineodd + 2)));
          lineodd += 2;
          for(var checklistOptions of val.checkListOptionsDetails){
              doc.text("Question: " + checklistOptions.question,left,top+(line * (lineodd +2)));
              lineodd +=2;
              if(checklistOptions.finalAnswer == ''){
                  doc.text("Answer: " + "NA ", left, top + (line * (lineodd+1)));
              }
              else{
                   doc.text("Answer: " + checklistOptions.finalAnswer, left, top + (line * (lineodd+1)));
              }
              lineodd += 2;
          }
          // doc.addPage();
        }
        doc.save(`card_${this.inspectionTaskDetails.taskName.replace(/ /g, '_')}.pdf`);
    }

    saveTask(){
        this.loading = true;
         var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
         let formdata = new FormData();
         formdata.append('ClientId', id+'');
         formdata.append('EmployeeId', this.ObjEmp.employeeId+'');
         formdata.append('TaskStatus', this.ObjEmp.taskStatus);
         formdata.append('Notes', this.ObjEmp.notes + '');
         formdata.append("TaskId", this.ObjEmp.taskId +'');
         if(this.ObjEmp.taskId != 0){
             this.api.PostImageData(urls.UrlModel.FileRequest.AddTaskAssignment, formdata).subscribe(res => {
                 this.loading = false;
                 this.toast.success('Task Updated Successfully!', 'Done');
                 document.getElementById('UpdateTask').click();
               this.getFileOpeningTask(id)
                   this.employeeId = 0;
              }, eror => {
                 this.loading = false;
                  this.toast.error('Unable To Update Task!', 'Error');
             });
         }
         else{
             this.api.PostImageData(urls.UrlModel.FileRequest.AddTaskAssignment, formdata).subscribe(res => {
                 this.loading = false;
                 this.toast.success('Task Added Successfully!', 'Done');
                 document.getElementById('AddTask').click();
                 this.getFileOpeningTask(id);
                   this.employeeId = 0;
              }, eror => {
                 this.loading = false;
                  this.toast.error('Unable To Add Task!', 'Error');
              });
         } 
     }

     change(data){
         console.log(data);
        this.belowImageData = JSON.parse(JSON.stringify(this.data));
        this.belowImageData.splice(data.current, 1);
      }

      ModalClose(){
        $('#entityDocument').on('hidden.bs.modal', function () {
            // $('.carousel-item').RemoveClass("active");
            $(this).data('bs.modal', null);
        })
      }
      
      previewImages(names : string){
        this.data = [];
        console.log(this.data);
        var str = names;
        var str_array = str.split(',');
        var mimeType;
        for(var i = 0; i < str_array.length; i++) {
            if(str_array[i].substr(str_array[i].lastIndexOf('.') + 1) == 'pdf'){
                mimeType = "pdf"
            }
            else{
                mimeType = "img"
            }
            let jsonData = {
                image: str_array[i],
                name: mimeType
                
            };
            this.data.push(jsonData);
        }
    }
}

export enum FileRequestType
{
    ChangeLiquorManager = 1,
    Renewal = 2,
    Other = 3,
    UploadReceipt = 4
}

export enum PaymentVoucherStatus
{
    VoucherUploaded = 1,
    ReceiptUploaded = 2,
    ReceiptApproved = 3
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

export interface IAddFileOpeaningDetailsTask{
    taskId: number;
    status: string;
    employeeId: number,
    taskStatus: string,
    notes: string,
}