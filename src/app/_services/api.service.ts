import { Injectable } from '@angular/core';
import { Observable ,Subscription} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as urls from '../_services/ServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class APIService {
    public deviceInfo = { ismobile: false };
    httpOptions: {};
    mobileView = '(max-width: 599px)';
    userDetails: Observable<any>;
    englishJSON: any;
    arabicJSON: any;

    public subscriptions: Subscription;

    constructor(private client: HttpClient, public toastrservice: ToastrService) {
        let token = '';
        if (localStorage.getItem('adminUser')) {
            token = JSON.parse(localStorage.getItem('adminUser')).auth_token;
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }),
        };
        this.englishJSON = require('../../assets/resources/english.json');
        this.arabicJSON = require('../../assets/resources/ar.json');
    }

    getAppLabel(IsActive: boolean): any
    {
        if (IsActive == null) {
            return this.englishJSON;
        } else {
            return this.arabicJSON;
        }
    }

    getData(url): Observable<any> {
        return this.client.get(environment.apiUrl + url, this.httpOptions);
    }
    PostData(url, body): Observable<any>
    {
        return this.client.post(environment.apiUrl + url,
            body, this.httpOptions);
    }
    PostImageData(url, body): Observable<any> {
        let token = '';
        if (localStorage.getItem('adminUser')) {
            token = JSON.parse(localStorage.getItem('adminUser')).auth_token;
        }

        this.httpOptions =
            {
                headers: new HttpHeaders({
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }),
            };
        return this.client.post(environment.apiUrl+ url,
            body, this.httpOptions);
    }
    DeleteData(url, obj): Observable<any> {
        return this.client.delete(environment.apiUrl + url, obj);
    }
    PutData(url, body): Observable<any> {
        return this.client.put(environment.apiUrl+ url, body);
    }
    returnJsonDate(DashedDate) {
        const date = {
            // tslint:disable-next-line: radix
            year: parseInt(DashedDate.split('-')[0]),
            // tslint:disable-next-line: radix
            month: parseInt(DashedDate.split('-')[1]),
            // tslint:disable-next-line: radix
            day: parseInt(DashedDate.split('-')[2]),
        };
        return date;
    }

    dateTFormatToJson(TformatedDate) {
        const date = {
            // tslint:disable-next-line: radix
            year: parseInt(TformatedDate.split('-')[0]),
            // tslint:disable-next-line: radix
            month: parseInt(TformatedDate.split('-')[1]),
            // tslint:disable-next-line: radix
            day: parseInt(TformatedDate.split('-')[2]),
        };
        return date;
    }
    dateJsonTodashed(format) {
        const date = format.year + '-' + format.month + '-' + format.day;
        return date;
    }
    am_pm_to_hours(time) {
        let hours = Number(time.match(/^(\d+)/)[1]);
        const minutes = Number(time.match(/:(\d+)/)[1]);
        const AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM === 'pm' && hours < 12) {
            hours = hours + 12;
        }
        if (AMPM === 'am' && hours === 12) {
            hours = hours - 12;
        }
        let sHours = hours.toString();
        let sMinutes = minutes.toString();
        if (hours < 10) {
            sHours = '0' + sHours;
        }
        if (minutes < 10) {
            sMinutes = '0' + sMinutes;
        }
        return sHours + ':' + sMinutes;
    }


    deleteAction(url, data): Observable<any> {
        const authToken = localStorage.getItem('userToken');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + authToken,
            }),
        };
        return this.client.delete(url, data);
    }

    deleteAction_usingquerystr(url): Observable<any> {
        const authToken = localStorage.getItem('userToken');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + authToken,
            }),
        };

        return this.client.delete(url, httpOptions);
    }
    removeWhiteSpace(value): number {
        if (value === 'undefined' || value === null || value === undefined) {
            return 0;
        }
        return value.replace(/\s/g, '');
    }

    deleteAction2(url, data) {
        const authToken = localStorage.getItem('userToken');
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authToken,
            }),
            body: data,
        };
        return this.client.delete(url, options);
    }

    deleteActionPath(url, body: any): Observable<any> {
        const authToken = localStorage.getItem('userToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + authToken,
            }),
        };
        return this.client.delete(url + body, httpOptions);
    }

    isValidNumber(value) {
        const regex = /^[0-9]+$/;
        return value.match(regex);
    }
    clearSession() {
        sessionStorage.clear();
        localStorage.clear();
    }
    countLinesInString(str) {
        return str.split(/\r\n|\r|\n/).length;
    }
    getCsvOptions(columnsArray: Array<string>, title: string): any {
        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title,
            useBom: true,
            noDownload: false,
            headers: columnsArray,
        };
        return csvOptions;
    }
    getLast_N_Years(Value): Array<any> {
        const yearsList = [];
        const curYear = new Date().getFullYear() - Value;
        for (let i = curYear + 1; i <= curYear + Value; i++) {
            yearsList.push(i);
        }
        return yearsList;
    }
    noDataHTML(data): string {
        if (data === undefined || data.length === 0) {
            return '<span class="noData"><i class="material-icons">close</i>No Data Found</span>';
        }
        return '';
    }
    isValidUrl(StringValue) {
        const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
        return matcher.test(StringValue);
    }
}
export enum DbActions {
    Create = 1,
    Read = 2,
    Update = 3,
    Delete = 4,
}
export enum UserType {
    Vendor = 1,
    User = 2,
}
