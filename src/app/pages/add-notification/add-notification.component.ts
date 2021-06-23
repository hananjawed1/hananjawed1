import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  allAgents: any;
  formLocation: FormGroup;
  newNotification: INewNotificationVM= { agentId: 0, message: '', subject: '' }
  loading = false;
  siteLabel: any;

  constructor(public apiservice: APIService, public fb: FormBuilder,
      public router: Router, public activeRoute: ActivatedRoute,public toast: ToastService)
  {
    this.getAllAgents();
      this.createLocationForm();
  }

  createLocationForm()
  {
      this.formLocation = this.fb.group
      ({
        agentId: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
      });
  }

  SaveLocation()
  {
      this.newNotification.agentId = Number(this.newNotification.agentId);
      this.loading = true;
      this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageNotifications.AddNotifications,
          this.newNotification).subscribe(res =>
          {
         this.toast.success('Notification has been sent!', 'Done');
          this.router.navigateByUrl('notification');
          }, error => {
                  this.loading = false;
            //this.apiservice.toastrservice.success('Notification sent failed! Please try again!', 'Error');
      })
  }


  getAllAgents()
  {
      this.apiservice.subscriptions = this.apiservice.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.allAgents = res;
      })
  }

  ngOnInit(): void {
      
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )

  }

}


export interface INewNotificationVM
{
  agentId: number,
  subject: string,
  message: string
}

