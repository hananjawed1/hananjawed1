import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as urls from '../../_services/ServiceUrls';
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-card-status',
  templateUrl: './add-card-status.component.html',
  styleUrls: ['./add-card-status.component.scss']
})
export class AddCardStatusComponent implements OnInit {

  public errors: any;
  public objCardStatus: ICardStatusAddVM;
  public formCardStatus: FormGroup;
  public statusForCards: any;
  public agents: any;
  public employees: any;
  public loading = false;
  public siteLabel: any;
  constructor(public fb: FormBuilder, public apiservice: APIService,
      // tslint:disable-next-line: align
      public router: Router, public aciveRoute: ActivatedRoute,
      // tslint:disable-next-line: align
      private route: ActivatedRoute,
      // tslint:disable-next-line: align
      private datePipe: DatePipe, public toast:ToastService) {
      this.objCardStatus = {
          id: 0,
          notes: '',
          cardStatusId: 0,
          status: 0,
          collectedBy: '',
          collectedFrom: 0,
          agentId: 0,
          numberOfCards: ''
      };

      this.createCardForm();
      this.objCardStatus.cardStatusId = parseInt(this.aciveRoute.snapshot.paramMap.get('id'), 0);
      if (this.objCardStatus.cardStatusId > 0) {
          this.getCardStatusDetails(this.objCardStatus.cardStatusId);
      }

      this.getAllStatuses();
      this.getAgents();
      this.getEmployees();

      if (this.objCardStatus.cardStatusId === 0) {
          this.getNextIdNumber();
      }
  }

  private getNextIdNumber() {
      this.apiservice.getData(urls.UrlModel.ManageCardStatuses.GetNextId).subscribe(res => {
          this.objCardStatus.id = res;
      });
  }

  private getAgents() {
      this.apiservice.getData(urls.UrlModel.Common.AllAgents).subscribe(res => {
          this.agents = res;
      });
  }

  private getEmployees() {
      this.apiservice.getData(urls.UrlModel.ManageEmployee.AllEmployees).subscribe(res => {
          this.employees = res;
      });
  }

  private getCardStatusDetails(id: number) {
      // this.loading = true;
      $('#global-loader').fadeIn('fast'); 
      this.apiservice.getData(urls.UrlModel.ManageCardStatuses.CardStatusDetails + '?id=' + id)
          .subscribe(res => {
              this.objCardStatus = res as ICardStatusAddVM;
              // this.loading = false;
              $('#global-loader').fadeOut('slow'); 
              const creationDate = this.apiservice.returnJsonDate(this.objCardStatus.creationDate);
              const creationDateDashed = this.apiservice.dateJsonTodashed(creationDate);
              this.objCardStatus.creationDate = this.datePipe.transform(creationDateDashed, 'yyyy-MM-dd');

          });
  }

  public findInvalidControls() {
      const invalid = [];
      const controls = this.formCardStatus.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
  }

  createCardForm() {
      this.formCardStatus = this.fb.group({
          id: new FormControl('', Validators.required),
          notes: new FormControl(''),
          agentId: new FormControl(0, Validators.min(1)),
          creationDate: new FormControl('', Validators.required),
          collectedFrom: new FormControl(0, Validators.min(1)),
          collectedBy: new FormControl('', Validators.required),
          status: new FormControl(0, Validators.min(1)),
          numberOfCards: new FormControl('', [Validators.required, CustomValidator.numeric])
      });
  }


  saveCardStatus() {
      const s = this.findInvalidControls();
      // this.loading = true;
      $('#global-loader').fadeIn('fast'); 
      const formdata = new FormData();
      formdata.append('CardStatusId', this.objCardStatus.cardStatusId + '');
      formdata.append('Id', this.objCardStatus.id.toString());
      formdata.append('Notes', this.objCardStatus.notes);
      formdata.append('CreationDate', this.objCardStatus.creationDate);
      formdata.append('AgentId', this.objCardStatus.agentId.toString());
      formdata.append('Status', this.objCardStatus.status.toString());
      formdata.append('CollectedBy', this.objCardStatus.collectedBy);
      formdata.append('NumberOfCards', this.objCardStatus.numberOfCards.toString());
      formdata.append('CollectedFrom', this.objCardStatus.collectedFrom.toString());

      if (this.objCardStatus.cardStatusId > 0) {
          formdata.append('Status', this.objCardStatus.status + '');
      }

      this.apiservice.PostImageData
          (urls.UrlModel.ManageCardStatuses.AddNewCardStatus, formdata).subscribe(res => {
              // this.loading = false;
              $('#global-loader').fadeOut('slow'); 
             this.toast.success('Record has been saved successfully!', 'Done');
              this.router.navigateByUrl('card-statuses');

          }
              // tslint:disable-next-line: no-shadowed-variable
              , error => {
                  // this.loading = false;
                  $('#global-loader').fadeOut('slow'); 
              }
          )
          ;
  }

  getAllStatuses() {
      this.apiservice.getData(urls.UrlModel.Common.AllCardStatusesAdmin).subscribe(res => {
          this.statusForCards = res;
      });
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              const IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      );
  }
}

export interface ICardStatusAddVM {
  cardStatusId: number;
  id: number;
  notes: string;
  status?: number;
  agentId?: number;
  creationDate?: string;
  collectedBy?: string;
  collectedFrom?: number;
  numberOfCards: string;
}

export enum GenderEnum {
  Male = 1,
  Female = 2
}

export class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
      const val = control.value;

      if (val === null || val === '') { return null; }

      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) { return { invalidNumber: true }; }

      return null;
  }
}

