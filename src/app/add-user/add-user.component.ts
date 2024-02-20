import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('firstNameInput') firstNameInput!: ElementRef;
  @ViewChild('lastNameInput') lastNameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  userData: any = {};
  inputFields: ElementRef[] = [];

  labelHidden: boolean = true;

  today: Date = new Date();
  todaystring: string = this.today.toISOString().slice(0, 10);

  ngAfterViewInit(): void {
    this.inputFields.push(this.firstNameInput, this.lastNameInput, this.emailInput);
  }
  constructor(private http: HttpClient) {}

  onClose() {
    this.close.emit();
  }

  placeholderText = 'Required field.';
  addNewUser() {
    const userDataKeys = ['FirstName', 'LastName', 'Email'];
    let i = 0;
    let emptyField: boolean = false;

    userDataKeys.forEach(key => {
      if (!this.userData[key]) {
        this.inputFields[i].nativeElement.placeholder = this.placeholderText;
        emptyField = true;
      } 
      i++;
    });

    if (emptyField) {
      return;
    }

    const uuidString = uuidv4();
    console.log(uuidString);
    this.userData.Id = uuidString;
    this.userData.CalculationStartDate = this.todaystring;
    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
     'accept' : 'application/json'});

    this.http.post<any>('https://api4.allhours.com/api/v1/Users', this.userData, { headers }).subscribe(
      (response) => {
        console.log('New user added:', response);
        this.labelHidden = false;
      }
    );
  }
}
