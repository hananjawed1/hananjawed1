import {Component, OnInit} from '@angular/core';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {jsPDF} from 'jspdf';
import autoTable from "jspdf-autotable";

 //declare var jsPDF: any;

@Component({
  selector: 'ls-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  searchPurchasesVM: IPurchaseSearchAdVM =
      {
          page: 0,
          pageSize: 10,
          agentId: 0,
          fromAmount: 0,
          invoiceNumber: '',
          locationId: 0,
          membershipNumber: '',
          salesPointUserId: 0,
          toAmount: 0
      };

  purchases: any;
  exportedData: RootObject[]=[];
  agents: any;
  locations: any;
  salesPoint: any;

  siteLabel: any;
  loading = false;
  page: number = 0;
  pagesCount: number = 0;

  constructor(public api: APIService,
      private route: ActivatedRoute,
      public router: Router)
  {
      this.getAllAgents();
      this.getAllLocations();
      this.getAllSalesPoint();

      this.searchPurchases(0);
  }

  resetSearch() {
     this.searchPurchasesVM =
          {
              page: 0,
              pageSize: 10,
              agentId: 0,
              fromAmount: 0,
              invoiceNumber: '',
              locationId: 0,
              membershipNumber: '',
              salesPointUserId: 0,
              toAmount: 0
          };
      this.searchPurchases(0);
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

  changeDate() {
      if (this.searchPurchasesVM.fromDate + '' == '') {
          this.searchPurchasesVM.fromDate = null;
      }

      if (this.searchPurchasesVM.toDate + '' == '') {
          this.searchPurchasesVM.toDate = null;
      }
      this.searchPurchases(0);
  }

  exportPDF() {
      console.log("EXPORT PDF");
      this.searchPurchasesVM.fromAmount = Number(this.searchPurchasesVM.fromAmount);
      this.searchPurchasesVM.toAmount = Number(this.searchPurchasesVM.toAmount);
      this.searchPurchasesVM.agentId = Number(this.searchPurchasesVM.agentId);
      this.searchPurchasesVM.locationId = Number(this.searchPurchasesVM.locationId);
      this.searchPurchasesVM.salesPointUserId = Number(this.searchPurchasesVM.salesPointUserId);

    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.api.PostData(urls.UrlModel.ManageMemberships.ExportPurchases,
          this.searchPurchasesVM).subscribe(res => {
              //prcess html
              this.exportedData = res as RootObject[];
              this.processPDF();
          });
  }

  processPDF() {
    const doc = new jsPDF();
    const columns = [["Invoice Number", "Membership Number", "Amount", "Date", "Agent", "Locations", "Sales Point", "Notes"]];

    var rows = [];
    let rowCountModNew = [];
    this.exportedData.forEach(element =>
    {
        var myData = element as RootObject;
        rowCountModNew.push(
        [
            myData.invoiceNumber,
            myData.memberships.membershipNumber,
            myData.totalAmount + 'DHS',
            myData.creationDateString,
            myData.salesPointUser.agent.user.name,
            myData.salesPointUser.locations.name,
            myData.salesPointUser.user.name,
            myData.notes
        ]);
    });

    rowCountModNew.forEach(element => {
        rows.push(element);
    });

    const totalPagesExp = '{total_pages_count_string}';
    const footer = function (data) {
        let str = 'Page ' + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp;
        }
        doc.text(str, 90, doc.internal.pageSize.height -2);
    };

    const options = {
        afterPageContent: footer,
        margin: { top: 5 }
    };

    autoTable(doc, {
        head: columns,
        body: rows,
        didDrawPage: dataArg => {
            // doc.setFontSize(20);
            // doc.setTextColor(40);
            // doc.setFont("normal");
            // doc.text("PAGE", dataArg.settings.margin.left, 10);
            options
        }
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }

    doc.save("table.pdf");
    // this.loading = false;
    $('#global-loader').fadeOut('slow'); 
  }

  public exportToExcel() {
    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 

      this.searchPurchasesVM.fromAmount = Number(this.searchPurchasesVM.fromAmount);
      this.searchPurchasesVM.toAmount = Number(this.searchPurchasesVM.toAmount);
      this.searchPurchasesVM.agentId = Number(this.searchPurchasesVM.agentId);
      this.searchPurchasesVM.locationId = Number(this.searchPurchasesVM.locationId);
      this.searchPurchasesVM.salesPointUserId = Number(this.searchPurchasesVM.salesPointUserId);

      this.api.PostData(urls.UrlModel.Export.ExportExcelForPurchase, this.searchPurchasesVM).subscribe(res => {
          window.location.href = environment.domainURl + res;
        //   this.loading = false;
        $('#global-loader').fadeOut('slow'); 
      });
  }

  getAgent(salesPoint)
  {
      if (salesPoint != null && salesPoint.agent != null &&
          salesPoint.agent.user != null) {
          return salesPoint.agent.user.name+'';
      } else return "";
  }

  getLocation(salesPoint) {
      if (salesPoint != null && salesPoint.locations != null  ) {
          return salesPoint.locations.name+'';
      } else return "";
  }

  getUser(salesPoint) {
      if (salesPoint != null && salesPoint.user != null) {
          return salesPoint.user.name+'';
      } else return "";
  }

  searchPurchases(page)
  {
      page = page || 0;
      this.searchPurchasesVM.page = page;
      this.searchPurchasesVM.fromAmount = Number(this.searchPurchasesVM.fromAmount);
      this.searchPurchasesVM.toAmount = Number(this.searchPurchasesVM.toAmount);
      this.searchPurchasesVM.agentId = Number(this.searchPurchasesVM.agentId);
      this.searchPurchasesVM.locationId = Number(this.searchPurchasesVM.locationId);
      this.searchPurchasesVM.salesPointUserId = Number(this.searchPurchasesVM.salesPointUserId);

    //   this.loading = true;
    $('#global-loader').fadeIn('fast'); 
      this.api.subscriptions = this.api.PostData(urls.UrlModel.ManageMemberships.SearchPurchases,
          this.searchPurchasesVM).subscribe(res => {
              this.purchases = res.items;
              this.page = res.page;
              this.pagesCount = res.totalPages;
            //   this.loading = false;
            $('#global-loader').fadeOut('slow'); 

          });
  }

  getAllLocations() {
      this.api.getData(urls.UrlModel.ManageLocations.AllLocations).subscribe(res => {
          this.locations = res;
      })
  }

  getAllAgents() {
      this.api.getData(urls.UrlModel.ManageAgent.AllAgents).subscribe(res => {
          this.agents = res;
      })
  }

  getAllSalesPoint() {
      this.api.getData(urls.UrlModel.ManageSalePointUser.AllSalesPoint).subscribe(res => {
          this.salesPoint = res;
      });
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.api.getAppLabel(IsActive);
          }
      )
  }
  
  ngOnDestroy() {
      this.api.subscriptions.unsubscribe();
  }

}


export interface IPurchaseSearchAdVM
{
  invoiceNumber: string;
  membershipNumber: string;
  fromAmount?: number;
  toAmount?: number;
  fromDate?: Date,
  toDate?: Date,
  agentId?: number,
  locationId?: number,
  salesPointUserId?: number,
  page: number,
  pageSize:number
}




export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  employeeNumber: string;
  status: number;
  imageLogo: string;
  statusStrings: string;
}

export interface Agent {
  agentId: number;
  userId: string;
  user: User;
  notes: string;
}


export interface Locations {
  locationId: number;
  name: string;
  email: string;
  phoneNumber: string;
  agentId: number;
  status: number;
  agent: Agent;
  statusString: string;
}

export interface SalesPointUser {
  salesPointUserId: number;
  userId: string;
  user: User;
  notes: string;
  agentId: number;
  agent: Agent;
  locationId: number;
  locations: Locations;
}

export interface MembershipType {
  membershipTypeId: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  creationDateString: string;
  updatedOnString: string;
}

export interface Religion {
  religionId: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  creationDateString: string;
  updatedOnString: string;
}

export interface Nationality {
  nationalityId: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  creationDateString: string;
  updatedOnString: string;
}


export interface SalesPointUser2 {
  salesPointUserId: number;
  userId: string;
  user: User;
  notes: string;
  agentId: number;
  agent: Agent;
  locationId: number;
  locations: Locations;
}

export interface Memberships {
  membershipId: number;
  membershipTypeId: number;
  membershipNumber: string;
  membershipType: MembershipType;
  fullName: string;
  gender: number;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  religionId: number;
  nationalityId: number;
  religion: Religion;
  nationality: Nationality;
  salary: number;
  limit: number;
  emiratesIDNumber: string;
  passportNumber: string;
  passportAttachment: string;
  visaAttachment: string;
  profilePic: string;
  salesPointUserId: number;
  salesPointUser: SalesPointUser2;
  notes: string;
  status: number;
  statusString: string;
  statusColor: string;
  birthDateString: string;
  registrationDate: Date;
  expirationDate: Date;
  registrationDateString: string;
  expirationDateString: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  creationDateString: string;
  updatedOnString: string;
}

export interface RootObject {
  purchaseId: number;
  salesPointUserId: number;
  salesPointUser: SalesPointUser;
  membershipId: number;
  memberships: Memberships;
  totalAmount: number;
  invoiceNumber: string;
  notes: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  creationDateString: string;
  updatedOnString: string;
}

