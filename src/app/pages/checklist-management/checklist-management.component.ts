import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Status } from '../../pages/add-agent/add-agent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-checklist-management',
  templateUrl: './checklist-management.component.html',
  styleUrls: ['./checklist-management.component.scss']
})
export class ChecklistManagementComponent implements OnInit {

  assignCheckListOption: any;
  StatusEnums = Status;
  siteLabel: any;
  loading = false;

  constructor(public apiservice: APIService, private route: ActivatedRoute,public router:Router, public toast:ToastService) {
    this.getAllAssignCheckListGroupList();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
        (params: any) => {
            let IsActive = params.get('rtl');
            this.siteLabel = this.apiservice.getAppLabel(IsActive);
        }
    )
  }

  getAllAssignCheckListGroupList() {
    //this.loading = true;
    $('#global-loader').fadeIn('fast'); 
    this.apiservice.getData(urls.UrlModel.ManageEmployee.GetAllAssignCheckListGroup)
        .subscribe(res => {
            this.assignCheckListOption = res; 
            // this.loading = false;
            $('#global-loader').fadeOut('slow');
        }, error => {
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
    });
  }
  

  EditAssignCheckListGroup(checkList){
    this.router.navigate(['assign-check-list-group',checkList.assignCheckListId]);    
  }

  InactivateAssignCheckListGroup(checkList) {
      this.apiservice.getData(urls.UrlModel.ManageEmployee.AssignCheckListStatusUpdate + '?id=' + checkList.assignCheckListId)
        .subscribe(res => {
           this.toast.success('Status has been updated!', 'Status Updated');
            this.getAllAssignCheckListGroupList();
        }, error => {
                //this.apiservice.toastrservice.success('Unable to update the status!', 'Status Updated');
        });
  }
}

