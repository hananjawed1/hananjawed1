import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class MembershipService {
    constructor(private http: HttpClient) { }


    SearchMemberships(name: string, phone: string, membershipId: number, agentId: number, status: number)
    {
        return this.http.post<any>(`${environment.apiUrl}/SalesPoint​/SearchMembership`, {
            name, phone,
            membershipId, agentId, status
        })
            .pipe(map(user => {
                return user;
            }));
    }


}
