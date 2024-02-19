import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  labelHidden: boolean = true;
  clientId: string = '';
  clientSecret: string = '';
  accessToken$: Observable<string> = of('');

  constructor(private http: HttpClient) {}

  getToken(): void {
    const payload = new URLSearchParams();
    payload.set('grant_type', 'client_credentials');
    payload.set('client_id', this.clientId);
    payload.set('client_secret', this.clientSecret);
    payload.set('scope', 'api');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post<any>('https://login.allhours.com/connect/token', payload.toString(), { headers }).subscribe(
      (response) => {
        const accessToken = response.access_token;
        
        localStorage.setItem('access_token', accessToken);
        this.labelHidden = false;
      }
    );
  } 
}
