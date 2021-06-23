import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { AuthenticationService } from '../../_services';
import {jsPDF} from 'jspdf';
import { formatDate } from '@angular/common';
import { PriorityLevel, InspectionType, ManageTaskStatus } from '../add-task-management/add-task-management.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { element } from 'protractor';
import 'jspdf-autotable'
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'ls-task-management-details',
  templateUrl: './task-management-details.component.html',
  styleUrls: ['./task-management-details.component.scss']
})
export class TaskManagementDetailsComponent implements OnInit {

  historyGroup: FormGroup;
  taskHistoryVM: TaskHistoryVM = { status: 0, message: '', taskId : 0 };    
  historySearchVM: HistorySearchVM = { status: 0, date: null, page: 0, pageSize: 10, taskId : 0};

  history: any;
  objTaskDetails: any;

  StatusEnums: any;
  assignCheckListDetails: any;
  imageDetails = [];
  videoDetails = [];
  notesDetails: any;
  StatusForTask = ManageTaskStatus;
  
  selectedStatus: string;
  limit: number = 0;
  msg: string;
  imagePath: string;
  videoPath: string;
  imageType: string;
  siteLabel: any;
  loading = false;
  loading1 = false;
  loading2 = false;
  page: number = 0;
  pagesCount: number = 0;

  page1: number = 0;
  pagesCount1: number = 0;

  employeeList : any;
  employeeGroup : any;
  assignCheckListGroup : any;
  employeeGroupNameList : any;
  employeeNameList : any;
  assignCheckListNameList : any;

  constructor(public fb: FormBuilder, public api: APIService, public activeRoute: ActivatedRoute, private authenticationService: AuthenticationService,public toast: ToastService) {
      this.taskHistoryVM.taskId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.historySearchVM.taskId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.createAgentForm();
      this.getTaskDetails();
      this.getHistory(0);
  }

  ngOnInit(): void {
      this.activeRoute.queryParamMap.subscribe(
          (params: any) => {
              let IsActive = params.get('rtl');
              this.siteLabel = this.api.getAppLabel(IsActive);
          }
      )
  }

  createAgentForm() {
      this.historyGroup = this.fb.group({
          status: new FormControl(0),
          message: new FormControl(''),
      });
  }

  getHistory(page) {
      page = page || 0;
      this.historySearchVM.page = page;
      this.loading1 = true;
      this.historySearchVM.status = Number(this.historySearchVM.status);
      this.api.PostData(urls.UrlModel.TaskManagement.GetTaskManagementHistory, this.historySearchVM).subscribe(res => {
          this.history = res.items;
          this.page = res.page;
          this.pagesCount = res.totalPages;
          this.loading1 = false;
      });
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

  getTaskDetails() {
      this.loading = true;
      this.api.getData(urls.UrlModel.TaskManagement.getTaskManagementDetailsByID + '?taskId=' + this.taskHistoryVM.taskId)
      .subscribe(res => {
          this.objTaskDetails = res[0];   

          this.assignCheckListDetails = this.objTaskDetails.assignCheckListGroupDetails;
          if(this.objTaskDetails.assignCheckListDetails == undefined){
              this.objTaskDetails.assignCheckListDetails = "";
          }

          if(this.objTaskDetails.taskImageOrVideo != null){
            this.objTaskDetails.taskImageOrVideo.forEach(element => {
             
              if(element == undefined){
                this.imageDetails = null;
                this.videoDetails = null;
              }else{
                if(this.isImage(element.taskImageOrVideo.split("/")[7])){
                  this.imageDetails.push(element);
                }
                if(this.isVideo(element.taskImageOrVideo.split("/")[7])){
                  this.videoDetails.push(element);
                }
              }
            });
          }
          
          this.notesDetails = this.objTaskDetails.taskNotes;
          if(this.objTaskDetails.taskNotes == undefined){
            this.notesDetails = "";
          }

          if(this.objTaskDetails.employeeNames != null && this.objTaskDetails.employeeNames != ""){
              this.employeeNameList = this.objTaskDetails.employeeNames;
          }else{
              this.employeeNameList = 'NA';
          }

          if(this.objTaskDetails.employeeGroupNames != null && this.objTaskDetails.employeeGroupNames != ""){
              this.employeeGroupNameList = this.objTaskDetails.employeeGroupNames;
          }else{
              this.employeeGroupNameList = 'NA';
          }

          this.loading = false;
      })
  }


updateTaskStatus() {
   this.loading = true;
    this.api.PostData(urls.UrlModel.TaskManagement.UpdateStatus, this.taskHistoryVM).subscribe(res => {
        this.loading = false;
        this.toast.success('Status Updated Successfully!', 'Done');
        // this.api.toastrservice.success('Status Updated Successfully!', 'Done');
        this.getTaskDetails();
        this.getHistory(0);
        this.taskHistoryVM.status = 0;
        this.taskHistoryVM.message = '';
    }, error => {
        // this.api.toastrservice.success('Status Could not Updated!','Error');
    })
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
        format: [(900 * rate) + extend, (1000 * rate) + extend]
    });
    
    
    const wrongNumber = 5;
    const top = (5 * rate) + wrongNumber;
    const line = 4 * rate;
    const left = (10 * rate) + wrongNumber;
    const imageTop = (32 * rate) + wrongNumber;
    const imageLeft = (57 * rate) + wrongNumber;

    doc.setFontSize(10 * rate);
    doc.text('Task Name : ' + this.objTaskDetails.taskName, left, top + line);
    doc.text('Task Description : '+ this.objTaskDetails.taskDescription, left, top + (line * 3));
    // tslint:disable-next-line: max-line-length
    doc.text('Start Date : ' + (this.objTaskDetails.startDate ? formatDate(this.objTaskDetails.startDate, format, locale) : 'NULL'), left, top + (line * 5));
    doc.text('End Date : ' + (this.objTaskDetails.endDate ? formatDate(this.objTaskDetails.endDate, format, locale) : 'NULL'), left, top + (line * 7));
    if(this.objTaskDetails.priorityLevel === 1){
      doc.text('Priority Level : ' + 'High', left, top +(line * 9));
    }
    if(this.objTaskDetails.priorityLevel === 2){
      doc.text('Priority Level : ' + 'Medium', left, top +(line * 9));
    }
    if(this.objTaskDetails.priorityLevel === 3){
      doc.text('Priority Level : ' + 'Low', left, top +(line * 9));
    }
    if(this.objTaskDetails.inspection  === 1){
      doc.text('Type of Inspection : ' + 'Normal Inspection', left, top +(line * 11));
    }
    if(this.objTaskDetails.inspection  === 2){
      doc.text('Type of Inspection : ' + ' Surprise Inspection', left, top +(line * 11));
    }
    if(this.objTaskDetails.status === 1){
      doc.text('Task Status : ' + 'New', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 2){
      doc.text('Task Status : ' + 'In Progress', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 3){
      doc.text('Task Status : ' + 'Accepted', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 4){
      doc.text('Task Status : ' + 'At Location', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 5){
      doc.text('Task Status : ' + 'Completed', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 6){
      doc.text('Task Status : ' + 'Cancelled', left, top +(line * 13));
    }
    if(this.objTaskDetails.status === 7){
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
    doc.save(`card_${this.objTaskDetails.taskName.replace(/ /g, '_')}.pdf`);
}

showTaskImage(imgs: any) {
  this.imageType = imgs.taskImageOrVideo;
  this.imagePath =   imgs.taskImageOrVideo;
}

playTaskVideo(video: any) {
  this.videoPath = video.taskImageOrVideo;
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

isImageBased64() {
  return this.imageType === 'Task Image';
}

isTaskVideo() {
  return this.imageType === 'Task Video';
}
}

export class TaskHistoryVM {
  status: number;
  message: string;
  taskId: number;
}

export class HistorySearchVM {
status: number;
page: number;
pageSize: number;
date?: Date;
taskId : number;
}

