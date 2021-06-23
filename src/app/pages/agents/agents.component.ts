import {Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
// import { Status } from '../add-agents/add-agents.component';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit,OnDestroy
{
    @ViewChild('closebutton') closebutton;
    @ViewChild('attachments') attachment: any;

    objSearchAgent: IsearchAgent = {
        email: '', name: '', status: 0, phone: '', page: 0, pageSize: 10
    }

    agents:any;
    StatusEnums=Status;
    AgentDetails:any;
    siteLabel: any;
    loading = false;
    page: number = 0;
    pagesCount: number = 0;
    logo:File;
    preview:any;
    editAgentId: number = 0;
    loadingLogo = false;

    constructor(public apiservice: APIService, private route: ActivatedRoute, public router: Router,public toast: ToastService) {
      this.getAgents(0);
    }

    ngOnInit(): void {
      this.route.queryParamMap.subscribe(
            (params: any) => {
                let IsActive = params.get('rtl');
                this.siteLabel = this.apiservice.getAppLabel(IsActive);
            }
        )
    }

    ngOnDestroy(){
      this.apiservice.subscriptions.unsubscribe();
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

    resetSearch() {
      this. objSearchAgent= { email: '', name: '', status: 0, phone: '', page: 0, pageSize: 10 };
      this.getAgents(0);
    }

    getAgents(page) {
        page = page || 0;
        this.objSearchAgent.page = page;
        $('#global-loader').fadeIn('fast');
        // this.loading = true;
        this.apiservice.subscriptions = this.apiservice.PostData(urls.UrlModel.ManageAgent.SearchAgent, this.objSearchAgent).subscribe(res => {
            this.agents = res.items;
            this.page = res.page;
            this.pagesCount = res.totalPages;
            // this.loading = false;
            $('#global-loader').fadeOut('slow');
        });
    }

    viewAgentDetails(agent){
      this.AgentDetails=agent;
    }
    
    editAgent(a){
      this.router.navigate(['add-agents',a.agentId])
    }

    onChange($event){
      this.logo=$event.target.files[0];
        if ($event.target.files && $event.target.files[0]) {
          let reader = new FileReader();
          reader.readAsDataURL(this.logo);
          reader.onload = (e)=> {
          this.preview=reader.result;
        };
        reader.onerror = function (error) {};
      }
    }

    InActivateAgent(data){
        this.apiservice.getData(urls.UrlModel.Common.ActorStatusUpdate + '?id=' + data.user.id).subscribe(res => {
           this.toast.success('Status has been updated!', 'Status Updated');
            this.getAgents(0);
        }, error => {
            //this.toast.error('Unable to update the status!', 'Status Updated');
        });
    }

    uploadLogoAgentId(agnetId : number){
      this.editAgentId = agnetId;
    }

    uploadLogo(){
      if(this.logo == null){
        this.toast.error('Select the Logo', 'Error');
        return false;
      }

      this.loadingLogo = true;
      let formdata = new FormData();
      formdata.append('AgentId', this.editAgentId+'');
      formdata.append('Logo', this.logo);
      
      this.apiservice.PostImageData(urls.UrlModel.ManageAgent.UpdateAgentLogo, formdata).subscribe(res => {
         this.toast.success('Update logo successfully!', 'Done');
          this.closebutton.nativeElement.click();
          this.editAgentId = 0;
          this.logo = null;
          this.attachment.nativeElement.value = '';
          this.preview = "";
          this.loadingLogo = false;
      }, eror => {
        this.loadingLogo = false;
          this.toast.error('Unable to update logo!', 'Error');
      });
    }

    removedLastAttachment(){
      this.attachment.nativeElement.value = '';
      this.preview = "";
    }
}

export interface IsearchAgent{
  name: string,
  phone: string,
  email: string,
    status: number,
    page: number,
    pageSize: number
}

export enum Status {
  Active = 1,
  InActive = 2
}
