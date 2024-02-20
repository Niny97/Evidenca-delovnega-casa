import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
//import { error } from 'console';

@Component({
  selector: 'add-absence',
  templateUrl: './add-absence.component.html',
  styleUrl: './add-absence.component.css'
})
export class AddAbsenceComponent {
  @Input() selectedUser: any;
  @Output() close2 = new EventEmitter<void>();

  @ViewChild('nameInput') nameInput!: ElementRef;

  absenceData: any = {};
  from: string = "";
  selectedDate: string = "";
  absenceDef: any[] = [];
  selectedAbsenceId: string = "";
  today: Date = new Date();
  todaystring: string = this.today.toISOString().slice(0, 10);

  inputFields: ElementRef[] = [];

  neki: any;

  constructor(private http: HttpClient) {
    this.absenceData.PartialTimeFrom = this.todaystring;
    this.absenceData.PartialTimeTo = this.todaystring;
    
  }

  placeholderText = 'Required field.';
  addNewAbsence() {
    
    if (!this.selectedAbsenceId) {
      return;
    }
    
    this.absenceData.UserId = this.selectedUser.id;
    this.absenceData.FirstName = this.selectedUser.firstName;
    this.absenceData.LastName = this.selectedUser.lastName;
    this.absenceData.AbsenceDefinitionId = this.selectedAbsenceId;
    this.absenceData.Timestamp = this.todaystring += "T00:00:00";

    console.log(this.absenceData);

    const accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
     'accept' : 'application/json'});

    this.http.post<any>('https://api4.allhours.com/api/v1/Absences', this.absenceData, { headers }).subscribe(
      (response) => {
        console.log('New absence added:', response);
      }
    );
    
  }

  onClose() {
    this.close2.emit();
  }

  ngOnInit(): void {
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.getAbsenceData(accesToken);
    }
    //console.log(this.absenceDef);
  }

  getAbsenceData(accessToken: string): void {
    
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'});
    this.http.get<any[]>('https://api4.allhours.com/api/v1/AbsenceDefinitions', { headers }).subscribe(

      (data) => {
        this.absenceDef = data;

        
        this.absenceDef = data.map(absence => ({

          id: absence.Id,
          name: absence.Name

        }));
        
      }
    )
  }

}
