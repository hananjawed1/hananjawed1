import { Component, OnInit } from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  groups: any;
  loading = false;
  siteLabel: any;
  formAgent: FormGroup;
  groupVM: IGroups;
  page: number = 0;
  pagesCount: number = 0;


  searchGroupVM: ISearchGroup =
      {
      name: '', page: 0,
      pageSize: 10
  }

  constructor(public fb: FormBuilder, private router: Router,
      private route: ActivatedRoute,
      public apiservice: APIService, public toast: ToastService) {
      this.groupVM = { name: '',groupId:0 };
      this.createIPForm();
      this.searchIPS(0);
  }

  createIPForm() {
      this.formAgent = this.fb.group({
          name: new FormControl('', Validators.required),
      });
  }

  addNew() {
      this.groupVM={ name: '', groupId: 0 };
  }

  saveIP() {
      this.loading = true;
      this.apiservice.subscriptions = this.apiservice
          .PostData(urls.UrlModel.ManageGroups.AddUpdateGroups,
          this.groupVM).subscribe(res => {
          this.loading = false;
         this.toast.success('Record has been saved successfully!', 'Done');

          document.getElementById('close-modal').click();
          this.searchIPS(0);
      }, eror => {
          this.loading = false;
           
      });
  }

  removeIP(a: IGroups)
  { 
      this.groupVM.groupId = a.groupId;
      this.groupVM.name = a.name;
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

  searchIPS(page) {
      page = page || 0;
      this.searchGroupVM.page = page;
      $('#global-loader').fadeIn('fast');
      // this.loading = true;
      this.apiservice.subscriptions =
          this.apiservice.PostData
          (urls.UrlModel.ManageGroups.SearchGroups,
              this.searchGroupVM).subscribe(res =>
              { 
          this.groups = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          // this.loading = false;
          $('#global-loader').fadeOut('slow');
      });
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.apiservice.getAppLabel(IsActive);
          }
      )
  }
}



export interface IGroups {
  name: string;
  groupId: number;
}


export interface ISearchGroup {
  name: string,
  page: number,
  pageSize: number
}

