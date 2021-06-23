import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../../app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('adminUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    login(username: string, password: string, token: string) {
        let isWeb = 1
        return this.http.post<any>(`${environment.apiUrl}Auth/login`, { username,  password, token, isWeb})
            .pipe(map(user => {
                localStorage.setItem('adminUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('adminUser');
        this.currentUserSubject.next(null);
    }

    public isAdminOrEmployees() {
        const role = this.getRole();
        if (role && (role === 'Admin' || role === 'Employee')) {
            return true;
        }

        return false;
    }

    private getRole() {
        const adminUser = localStorage.getItem('adminUser');
        if (!adminUser) {
            return null;
        }

        const role = JSON.parse(adminUser).role;
        return role;

    }

    public canCommunicate() {
        const role = this.getRole();
        if (role && (role === 'Admin' || role === 'Agents' || role === 'Employee' || role === 'Supervisor')) {
            return true;
        }

        return false;
    }

    public isSuperAdmin() {
        const role = this.getRole();
        if (role && (role === 'Admin')) {
            return true;
        }

        return false;
    }
}
