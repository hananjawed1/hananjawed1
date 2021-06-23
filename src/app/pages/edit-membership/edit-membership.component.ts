import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.scss']
})
export class EditMembershipComponent implements OnInit {

  religions: any;
    nationality: any;
    membershipTypes: any;
    errors: any;
    requestCategory: any;
    objAgent: IMembershipAddVM;
    formAgent: FormGroup;
    passportAttachment: File;
    visaAttachment: File;
    profilePic: string;

    attachment1: File;
    attachment2: File;
    attachment3: File;

    GenderEnums = GenderEnum;
    loading = false;
    siteLabel: any;

    imagePath: string;
    membershipRequestBy: number; // // Added static 1 for manage the membership created by Sales Point User. and 2 created by Online.

    UserAccess = 0;
    IsDisableExpireDate = true;

    constructor(public fb: FormBuilder, public apiservice: APIService,
        public router: Router, public aciveRoute: ActivatedRoute,
        private datePipe: DatePipe, public toast: ToastService) {
        this.objAgent = {
            fullName: '', membershipTypeId: 0, gender: 1, notes: '', address: '', phoneNumber: '', email: '', birthDate: '',
            expirationDate: '', registrationDate: '', salary: 0, limit: 0, emiratesIDNumber: '', passportNumber: '', 
            membershipId: 0, attachment1: '', attachment2: '', attachment3: '', passportAttachment: '', profilePic: '', 
            visaAttachment: '', requestCategory: 0, religionName: '', nationName: '', occupation: '', visaResidency: ''
        };

        this.createAgentForm();
        this.objAgent.membershipId = parseInt(this.aciveRoute.snapshot.paramMap.get('id'), 0);
        if (this.objAgent.membershipId > 0) {
            this.getMembershipDetails(this.objAgent.membershipId);
        }

        this.getReligions();
        this.getNationality();
        this.getMembershipTypes();
        this.getRequestCategory();

        this.UserAccess = Number(JSON.parse(localStorage.getItem('adminUser')).userAccess);

        if(this.UserAccess == 1){
            this.IsDisableExpireDate = false;
        }
    }


    getRequestCategory() {
        this.apiservice.getData(urls.UrlModel.Common.RequestCategory).subscribe(res => {
            this.requestCategory = res;
        })
    }

    getMembershipDetails(id: number) {
        this.loading = true;
        $('#global-loader').fadeIn('fast');
        this.apiservice.getData(urls.UrlModel.ManageMemberships.GetMembershipDetails + '?membershipId=' + id)
            .subscribe(res => {
                this.objAgent = res as IMembershipAddVM;
                this.loading = false;
                var bDate = this.apiservice.returnJsonDate(this.objAgent.birthDate);
                var birthDate = this.apiservice.dateJsonTodashed(bDate);
                this.objAgent.birthDate = this.datePipe.transform(birthDate, 'yyyy-MM-dd');

                var rDate = this.apiservice.returnJsonDate(this.objAgent.registrationDate);
                var regDate = this.apiservice.dateJsonTodashed(rDate);
                this.objAgent.registrationDate = this.datePipe.transform(regDate, 'yyyy-MM-dd');

                var eDate = this.apiservice.returnJsonDate(this.objAgent.expirationDate);
                var expDate = this.apiservice.dateJsonTodashed(eDate);
                this.objAgent.expirationDate = this.datePipe.transform(expDate, 'yyyy-MM-dd');
                this.membershipRequestBy = Number(res.membershipRequestType);
                $('#global-loader').fadeOut('slow');
            });
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.formAgent.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        //return invalid;
    }

    createAgentForm() {
        this.formAgent = this.fb.group({
            membershipTypeId: new FormControl('', Validators.required),
            fullName: new FormControl('', Validators.required),
            gender: new FormControl(''),
            address: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            birthDate: new FormControl('', Validators.required),
            registrationDate: new FormControl('', Validators.required),
            expirationDate: new FormControl('', Validators.required),
            // religionId: new FormControl('', Validators.required),
            // nationalityId: new FormControl('', Validators.required),
            religionName: new FormControl('', Validators.required),
            nationName: new FormControl('', Validators.required),
            salary: new FormControl(''),
            limit: new FormControl('', Validators.required),
            emiratesIDNumber: new FormControl(''),
            passportNumber: new FormControl(''),
            notes: new FormControl(''),
            filepassport: new FormControl(''),
            filevisa: new FormControl(''),
            fileprofilePic: new FormControl(''),
            fileAttachment1: new FormControl(''),
            fileAttachment2: new FormControl(''),
            fileAttachment3: new FormControl(''),
            requestCategory: new FormControl('0', Validators.required),
            membershipNumber: new FormControl('', Validators.required),
            occupation: new FormControl(''),
            visaResidency: new FormControl(''),
        });
    }


    saveAgent() {
        this.loading = true;
        //$('#global-loader').fadeIn('fast');
        let formdata = new FormData();
        formdata.append('MembershipId', this.objAgent.membershipId + '');
        formdata.append('MembershipTypeId', this.objAgent.membershipTypeId.toString());
        formdata.append('FullName', this.objAgent.fullName);
        formdata.append('Gender', this.objAgent.gender.toString());
        formdata.append('Address', this.objAgent.address);
        formdata.append('PhoneNumber', this.objAgent.phoneNumber);
        formdata.append('Email', this.objAgent.email);
        formdata.append('BirthDate', this.objAgent.birthDate.toString());
        formdata.append('RegistrationDate', this.objAgent.registrationDate.toString());
        formdata.append('ExpirationDate', this.objAgent.expirationDate.toString());

        // formdata.append('ReligionId', this.objAgent.religionId.toString());
        // formdata.append('NationalityId', this.objAgent.nationalityId.toString());

        formdata.append('NationName', this.objAgent.nationName);
        formdata.append('ReligionName', this.objAgent.religionName);
        formdata.append('Salary', this.objAgent.salary.toString());
        formdata.append('Limit', this.objAgent.limit.toString());
        formdata.append('EmiratesIDNumber', this.objAgent.emiratesIDNumber);
        formdata.append('PassportNumber', this.objAgent.passportNumber ? this.objAgent.passportNumber : '');
        formdata.append('Notes', this.objAgent.notes);
        formdata.append('PassportAttachment', this.passportAttachment);
        formdata.append('VisaAttachment', this.visaAttachment);
        formdata.append('ProfilePic', this.profilePic ? this.profilePic : '');
        formdata.append('Attachment1', this.attachment1);
        formdata.append('Attachment2', this.attachment2);
        formdata.append('Attachment3', this.attachment3);
        formdata.append('RequestCategory', this.objAgent.requestCategory.toString());
        formdata.append('MembershipNumber', this.objAgent.membershipNumber);
        formdata.append('Occupation', this.objAgent.occupation ? this.objAgent.occupation : '');
        formdata.append('VisaResidency', this.objAgent.visaResidency ? this.objAgent.visaResidency : '');
        formdata.append('MembershipRequestType', this.membershipRequestBy+'');

        this.apiservice.PostImageData(urls.UrlModel.SalesPoint.AddNewMembership, formdata).subscribe(res => {
            this.loading = false;
           this.toast.success('Record has been saved successfully!', 'Done');
            this.router.navigateByUrl('membership-request');
            //$('#global-loader').fadeOut('slow');
            //this.formAgent.reset();
        }, error => {
            //this.errors = error;
            this.loading = false;
            //$('#global-loader').fadeOut('slow');
            //this.toast.error('Unable to save records!', 'Error');
        });
    }


    onChangePassport($event) {
        this.passportAttachment = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.passportAttachment);
            reader.onload = (e) => {

            };
            reader.onerror = function (error) {

            };
        }
    }

    onChangeVisa($event) {
        this.visaAttachment = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.visaAttachment);
            reader.onload = (e) => {

            };
            reader.onerror = function (error) {

            };
        }
    }
    onChangeAttachment1($event) {
        this.attachment1 = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.attachment1);
            reader.onload = (e) => {

            };
            reader.onerror = function (error) {
            };
        }
    }

    onChangeAttachment2($event) {
        this.attachment2 = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.attachment2);
            reader.onload = (e) => {

            };
            reader.onerror = function (error) {
            };
        }
    }

    onChangeAttachment3($event) {
        this.attachment3 = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(this.attachment3);
            reader.onload = (e) => {
            };
            reader.onerror = function (error) {
            };
        }
    }

    getMembershipTypes() {
        this.apiservice.getData(urls.UrlModel.SalesPoint.MembershipTypes).subscribe(res => {
            this.membershipTypes = res;
        })
    }

    getReligions() {
        this.apiservice.getData(urls.UrlModel.SalesPoint.AllReligion).subscribe(res => {
            this.religions = res;
        })
    }

    getNationality() {
        this.apiservice.getData(urls.UrlModel.SalesPoint.AllNationality).subscribe(res => {
            this.nationality = res;
        })
    }

    ngOnInit(): void {
        this.aciveRoute.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.apiservice.getAppLabel(IsActive);
            }
        )
    }

    showDocument(path: string) {
        if (path != null) {
            this.imagePath = path;
        } else {
            this.imagePath = '';
        }
    }

    handleFileSelect($event) {

        const file = $event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = this.handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
            reader.onerror = function (error) {
            };
        }
    }

    handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.profilePic = btoa(binaryString);

    }

}

export interface IMembershipAddVM {
    membershipId: number;
    fullName: string;
    gender: number;
    address: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    registrationDate: string;
    expirationDate: string;
    membershipTypeId: number;
    // religionId: number;
    // nationalityId: number;
    salary: number;
    limit: number;
    emiratesIDNumber: string;
    passportNumber: string;
    notes: string;
    passportAttachment: string;
    visaAttachment: string;
    profilePic: string;
    attachment1: string;
    attachment2: string;
    attachment3: string;
    requestCategory: number;
    membershipNumber?: string;
    religionName: string;
    nationName: string;
    occupation: string;
    visaResidency: string;

}

export enum GenderEnum {
    Male = 1,
    Female = 2
}