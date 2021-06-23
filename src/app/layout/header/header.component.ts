import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as scripts from './scripts.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import * as urls from '../../_services/ServiceUrls'
import { APIService } from '../../_services/api.service';
import { AuthenticationService } from '../../_services';
import { Console } from 'console';
import { ToastService } from 'src/app/_services/toast.service.js';

@Component({
  selector: 'ls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('closebutton') closebutton;
  @ViewChild('attachments') attachment: any;

  mySubscription: Subscription;
  notifications: any;
  showMeNotify = false;
  showMeChat = false;
  notifyLength = 0;
  chatLength = 0;
  currentUser: any;
  private updateMessageSubscription: Subscription;
  profilepic: string;
  updatedProfilePic:File;
  preview:any;
  oldPwd : any;
  newPwd : any;
  confirmPwd : any;
  loadingPrifilePic = false;

  constructor(private router: Router, private route: ActivatedRoute, public apiservice: APIService,
    private authenticationService: AuthenticationService, public toast: ToastService) 
  {
    this.mySubscription = interval(30000).subscribe((x => {
      this.doStuff();
    }));

    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser.role == "Employee" && this.currentUser.profilepic != ""){
      this.profilepic = this.currentUser.profilepic;
    }else{
      this.profilepic = "";
    }
  }

  ngAfterViewInit(): void {
    scripts();
    $('#global-loader').fadeOut('slow');
    this.initDropdowns();
  }

  private initDropdowns(): void {
    if (window.matchMedia('(min-width: 992px)').matches) {
      $('.main-navbar .active').removeClass('show');
      $('.main-header-menu .active').removeClass('show');
    }

    // Shows header dropdown while hiding others
    $('.main-header .dropdown > a').on('click', function(e): void {
      e.preventDefault();
      $(this).parent().toggleClass('show');
      $(this).parent().siblings().removeClass('show');
      $(this).find('.drop-flag').removeClass('show');
    });

    $('.country-flag1').on('click', e => {
      $('.main-header .dropdown > a').parent().siblings().removeClass('show');
    });
  }


  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    if (this.updateMessageSubscription) {
      this.updateMessageSubscription.unsubscribe();
    }
  }

  doStuff() {
    //doing stuff with unsubscribe at end to only run once
    //this.failedRequestSub.unsubscribe();
    this.apiservice.getData(urls.UrlModel.ManageNotifications.TopNotifications)
      .subscribe(res => {

        this.showMeNotify = res.filter(x => x.routerLink !== '/chat').length > 0 ? true : false;
        this.showMeChat = res.filter(x => x.routerLink === '/chat').length > 0 ? true : false;
        this.notifyLength = res.filter(x => x.routerLink !== '/chat').length;
        this.chatLength = res.filter(x => x.routerLink === '/chat').length;
        this.notifications = res;

      }, error => {
        this.toast.warning('Coonection Refused', 'warning')
      })
  }

  ngOnInit() {
  }

  onChange($event){
    this.updatedProfilePic = $event.target.files[0];
      if ($event.target.files && $event.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(this.updatedProfilePic);
        reader.onload = (e)=> {
        this.preview=reader.result;
      };
      reader.onerror = function (error) {};
    }
  }

  toggleRTL() {
    $("#global-loader").fadeIn("slow");
    setTimeout(() => this.handleRtl(), 1000);
  }

  private handleRtl() {
    console.log(">>>>>>> ", localStorage.getItem('rtl'));
    if (!localStorage.getItem('rtl')) {
      localStorage.setItem('rtl', 'enabled');
      document.body.classList.replace('normal', 'rtl');
      const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.rtl-switch');
      for (let i = 0; i < links.length; i++) {
        const link: HTMLLinkElement = links[i];
        link.href = link.href.replace('/css/', '/css-rtl/');
      }
    } else {
      localStorage.removeItem('rtl');
      document.body.classList.replace('rtl', 'normal');
      const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.rtl-switch');
      for (let i = 0; i < links.length; i++) {
        const link: HTMLLinkElement = links[i];
        link.href = link.href.replace('/css-rtl/', '/css/');
      }
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      $("#global-loader").fadeOut("slow");
    }, 1000);
  }

  public switchRtl(): void {
    let queryParams = {};
    if (document.body.classList.contains('rtl')) {
      document.body.classList.remove('rtl');
      queryParams = {};
      localStorage.setItem('rtl', 'false');
    } else {
      document.body.classList.add('rtl');
      queryParams = { rtl: true };
      localStorage.setItem('rtl', 'true');
    }

    ////console.log(queryParams);
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      });
  }
  
  uploadProfilePicture(){
    //oldPwd : any;
    if(this.oldPwd == null || this.oldPwd == ''){
      this.toast.error('Please enter the old password', 'Error');
      return false;
    }

    if(this.newPwd != this.confirmPwd){
      this.toast.error('New & Confirm Password does not match', 'Error');
      return false;
    }

    this.loadingPrifilePic = true;
    let formdata = new FormData();
    formdata.append('OldPwd', this.oldPwd+'');
    formdata.append('NewPwd', this.newPwd);
    formdata.append('ConfirmPwd', this.confirmPwd + '');

    this.apiservice.PostImageData(urls.UrlModel.Auth.ChangePassword, formdata).subscribe(res => {
      this.toast.success('Password has been change successfully!', 'Done');        
        this.closebutton.nativeElement.click();
        
        this.oldPwd = '';
        this.newPwd = '';
        this.confirmPwd = '';
        
        this.loadingPrifilePic = false;
    }, eror => {
        this.loadingPrifilePic = false;
        //this.toast.error('Unable To Change Password!', 'Error');
    });
  }

  removedLastAttachment(){
    this.attachment.nativeElement.value = '';
    this.preview = "";
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  

  private updateReadMessagesAll(receiver: string) {
    return this.apiservice.PostData(urls.UrlModel.Messages.UpdateReadMessagesAll, { receiver: this.currentUser.email });
  }

  public markAsRead() {
    this.updateMessageSubscription = this.updateReadMessagesAll(this.currentUser.userName).subscribe(() => {
      this.chatLength = 0;
      this.showMeChat = false;
    });
  }

  public canChat() {
    return this.authenticationService.canCommunicate() === true;
  }

}
