import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { AuthenticationService } from '../../_services';
import { jsPDF } from 'jspdf';
import { formatDate } from '@angular/common';
//import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../_services/toast.service';

@Component({
  selector: 'ls-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  historySearchVM: HistorySearchVM = { status: 0, membershipId: 0, page: 0, pageSize: 10 };
    purchaseSearchVM: PurchaseSearchVM = {
        amount: 0, date: null, invoiceNumber: '', membershipId: 0,
        salesPoint: '',
        page: 0, pageSize: 10
    };

    history: any;
    purchases: any;
    objMembershipDetails: any;

    StatusEnums: any;
    selectedStatus: string;
    limit: number = 0;
    msg: string;
    imagePath: string;
    imageType: string;
    siteLabel: any;
    loading = false;
    loading1 = false;
    loading2 = false;
    expireDateLoading = false;
    emiratesIdNumberLoading = false;
    page: number = 0;
    pagesCount: number = 0;
    isEditEmiratesIdNumber = null;
    updatedEmiratesIdNumber : string;

    isEditExpireDate = null;
    updatedExpireDate : Date;

    page1: number = 0;
    pagesCount1: number = 0;
    UserAccess = 0;
    IsDisableExpireDate = true;
    editMemberShipId = 0;

    resetPurchaseSearch() {
        this.purchaseSearchVM =
        {
            amount: 0, date: null, invoiceNumber: '',
            membershipId: 0, salesPoint: '',
            page: 0,
            pageSize: 10
        };
    }

    constructor(public api: APIService, public activeRoute: ActivatedRoute, private authenticationService: AuthenticationService,public toast: ToastService) {
        this.getMembershipDetails();
        this.getAllStatus();
        this.editMemberShipId = Number(this.activeRoute.snapshot.paramMap.get('id'));
        this.historySearchVM.membershipId = this.editMemberShipId;
        this.purchaseSearchVM.membershipId = this.editMemberShipId;
        this.getHistory(0);
        this.getPurchases(0);

        this.UserAccess = Number(JSON.parse(localStorage.getItem('adminUser')).userAccess);

        if(this.UserAccess == 1){
            this.IsDisableExpireDate = false;
        }
    }

    ngOnInit(): void {
        this.activeRoute.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.api.getAppLabel(IsActive);
            }
        )
    }

    editEmiratesIdNumber(){
        this.isEditEmiratesIdNumber = true;
        this.updatedEmiratesIdNumber = this.objMembershipDetails.emiratesIDNumber;
    }

    resetEmiratesIdNumber(){
        this.isEditEmiratesIdNumber = null;
        this.updatedEmiratesIdNumber = "";
    }

    updateEmiratesIdNumber(){
        this.emiratesIdNumberLoading = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('MembershipId', id + '');
        formdata.append('UpdatedEmiratesIdNumber', this.updatedEmiratesIdNumber);

        this.api.PostImageData(urls.UrlModel.ManageMemberships.UpdateEmiratesIdNumber, formdata).subscribe(res =>
        {
            this.emiratesIdNumberLoading = false;
            this.toast.show('Emirates Id Number updated successfully!','Done');
            //this.api.toastrservice.success('Emirates Id Number updated successfully!', 'Done');
            this.isEditEmiratesIdNumber = null;

            this.getMembershipDetails();
        }, error => {
             this.emiratesIdNumberLoading = false;
        });
    }

    editEpireDate(){
        this.isEditExpireDate = true;
        this.updatedExpireDate = null;
    }

    resetEpireDate(){
        this.isEditExpireDate = null;
        this.updatedExpireDate = null;
    }

    updateEpireDate(){
        if(this.updatedExpireDate == null){
            this.api.toastrservice.error('Please select the correct expire date!', 'Rrror');
            return false;
        }
        
        this.expireDateLoading = true;
        var id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        let formdata = new FormData();        

        formdata.append('MembershipId', id + '');
        formdata.append('UpdatedExpirationDate', this.updatedExpireDate + '');

        this.api.PostImageData(urls.UrlModel.ManageMemberships.UpdateExpireDate, formdata).subscribe(res =>
        {
            this.expireDateLoading = false;
            this.toast.success('Expire Date Updated Successfully!', 'Done');
            // this.api.toastrservice.success('Expire Date Updated Successfully!', 'Done');
            this.isEditExpireDate = null;

            this.getMembershipDetails();
        }, error => {
             this.expireDateLoading = false;
        });
    }

    getAllStatus() {
        this.api.getData(urls.UrlModel.Common.AllMembershipStatus).subscribe(res => {
            this.StatusEnums = res;
        })
    }

    getHistory(page) {
        page = page || 0;
        this.historySearchVM.page = page;
        this.loading1 = true;
        this.historySearchVM.status = Number(this.historySearchVM.status);
        this.api.PostData(urls.UrlModel.ManageMemberships.GetMembershipHistory,
            this.historySearchVM).subscribe(res => {
                this.history = res.items;
                this.page = res.page;
                this.pagesCount = res.totalPages;
                this.loading1 = false;
            });
    }


    range2() {

        var step = 2;
        var doubleStep = step * 2;
        var start = Math.max(0, this.page1 - step);
        var end = start + 1 + doubleStep;
        if (end > this.pagesCount1) { end = this.pagesCount1; }
        var ret = [];
        for (var i = start; i != end; ++i) {
            ret.push(i);
        }
        return ret;
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

    getPurchases(page) {
        page = page || 0;
        this.purchaseSearchVM.page = page;
        let amt = Number(this.purchaseSearchVM.amount);
        if (amt == NaN) {
            this.purchaseSearchVM.amount = 0;
        }
        else {
            this.purchaseSearchVM.amount = amt;
        }
        this.loading2 = true;
        this.api.PostData(urls.UrlModel.ManageMemberships.PurchaseHistory, this.purchaseSearchVM).
            subscribe(res => {
                this.purchases = res.items;
                this.page1 = res.page;
                this.pagesCount1 = res.totalPages;
                this.loading2 = false;
            });
    }

    getMembershipDetails() {
        this.loading = true;
        $('#global-loader').fadeIn('fast');
        this.api.getData(urls.UrlModel.ManageMemberships.GetMembershipDetails + '?membershipId=' + this.activeRoute.snapshot.paramMap.get('id'))
            .subscribe(res => {
                this.objMembershipDetails = res;
                this.limit = this.objMembershipDetails.limit;
                this.selectedStatus = this.objMembershipDetails.status;
                this.loading = false;
                $('#global-loader').fadeOut('slow');
            })
    }

    updateLimit() {
        this.loading = true;
        this.api.PostData(urls.UrlModel.ManageMemberships.UpdateLimit, {
            membershipId: this.objMembershipDetails.membershipId,
            limit: Number(this.limit)
        }).subscribe(res => {
            this.loading = false;
            this.toast.success('Limit has been updated!', 'Done');
            // this.api.toastrservice.success('Limit has been updated!', 'Done');
            this.msg = '';
            this.getMembershipDetails();
        }, error => {
            // this.api.toastrservice.success('Status Could not Updated!','Error');
        })
    }

    updateMembershipStatus() {
        this.loading = true;
        this.api.PostData(urls.UrlModel.ManageMemberships.UpdateStatus, {
            membershipId: this.objMembershipDetails.membershipId,
            status: parseInt(this.selectedStatus, 0),
            message: this.msg
        }).subscribe(res => {
            this.loading = false;
            this.toast.success('Status Updated Successfully!','Done');
            //this.api.toastrservice.success('Status Updated Successfully!', 'Done');
            this.msg = '';
            // $("#status").removeClass("active");
            // $("#Info").addClass("active");
            // $("#tab1").show();
            // this.getMembershipDetails();
            window.location.reload();
        }, error => {
            // this.api.toastrservice.success('Status Could not Updated!','Error');
        })
    }

    showPassport(img: any) {

        this.imageType = img;

        if (img === 'pass') {
            this.imagePath = this.objMembershipDetails.passportAttachment;
        } else if (img === 'visa') {
            this.imagePath = this.objMembershipDetails.visaAttachment;
        }
        else if (img === 'profile') {
            this.imagePath = this.objMembershipDetails.profilePic;
        }
        else if (img === 'attachment1') {
            this.imagePath = this.objMembershipDetails.attachment1;
            console.log("imagePath>>>> ", this.imagePath);
        }
        else if (img === 'attachment2') {
            this.imagePath = this.objMembershipDetails.attachment2;
        }
        else if (img === 'attachment3') {
            this.imagePath = this.objMembershipDetails.attachment3;
        }
    }

    isImageBased64() {
        return this.imageType === 'profile';
    }

    public canExportToPDF() {
        return this.authenticationService.isSuperAdmin() === true;
    }

    public exportToPdf() {

        const format = 'dd/MM/yyyy';
        const locale = 'en-US';

        const rate = 1;
        const extend = 5;
        const doc = new jsPDF({
            orientation: 'landscape',
            format: [(159 * rate) + extend, (243 * rate) + extend]
        });
        const wrongNumber = 5;
        const top = (35 * rate) + wrongNumber;
        const line = 4 * rate;
        const left = (10 * rate) + wrongNumber;
        const imageTop = (32 * rate) + wrongNumber;
        const imageLeft = (57 * rate) + wrongNumber;


        doc.setFontSize(10 * rate);
        doc.text(this.objMembershipDetails.fullName, left, top + line);
        doc.text(this.objMembershipDetails.membershipNumber ? this.objMembershipDetails.membershipNumber : 'NULL', left, top + (line * 2));
        // tslint:disable-next-line: max-line-length
        doc.text('Exp: ' + (this.objMembershipDetails.expirationDate ? formatDate(this.objMembershipDetails.expirationDate, format, locale) : 'NULL'), left, top + (line * 3));
        // addImage(imageData, format, x, y, width, height, alias, compression, rotation)
        // tslint:disable-next-line: max-line-length
        if (this.objMembershipDetails.profilePic && this.objMembershipDetails.profilePic !== '') {
            doc.addImage(this.objMembershipDetails.profilePic,
                'jpg', imageLeft, imageTop, 20 * rate, 24 * rate, this.objMembershipDetails.fullName, 'NONE', 0);
        }
        // 'NONE', 'FAST', 'MEDIUM' and 'SLOW'
        // image: 130X154
        // 650 x 770

        doc.save(`card_${this.objMembershipDetails.fullName.replace(/ /g, '_')}.pdf`);
    }
}

export class HistorySearchVM {
    membershipId: number;
    status: number;
    page: number;
    pageSize: number;
}

export class PurchaseSearchVM {
    membershipId: number;
    invoiceNumber: string;
    amount: number;
    salesPoint: string;
    date?: Date;
    page: number;
    pageSize: number;
}
