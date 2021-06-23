import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../_services/api.service';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'ls-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  siteLabel: any;

  constructor(public apiservice: APIService, public aciveRoute: ActivatedRoute, private authenticationService: AuthenticationService) 
  {
  }

  ngOnInit(): void {
      this.aciveRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }

  public isFullAdmin() {
      return this.authenticationService.isAdminOrEmployees();
  }
}