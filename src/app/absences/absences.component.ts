import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})
export class AbsencesComponent {
  users: any[] = [];
  selectedDate: string = "";
  filteredUsers: any[] = [];

  constructor(private http: HttpClient) {
    const today: Date = new Date();
    this.selectedDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  }

  ngOnInit(): void {
    console.log(this.selectedDate);
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.getAbsenceData(accesToken);
      console.log(this.users);
    }
  }

  getAbsenceData(accessToken: string): void {
    console.log('Access Token:', accessToken);
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'});
    this.http.get<any[]>('https://api4.allhours.com/api/v1/Absences', { headers }).subscribe(

      (data) => {
        this.users = data;

        this.users = data.map(user => ({

          userId: user.UserId,
          firstName: user.FirstName,
          lastName: user.LastName,
          timestamp: user.Timestamp.split("T")[0],
          from: user.PartialTimeFrom ? user.PartialTimeFrom.split("T")[0] : user.Timestamp.split("T")[0],
          to: user.PartialTimeTo ? user.PartialTimeTo.split("T")[0] : user.Timestamp.split("T")[0],
          comment: user.Comment,
          name: user.AbsenceDefinitionName

        })); 
        
      }
    )
  }

  getFilteredUsers(): any[] {
    const selected: Date = new Date(this.selectedDate);
    console.log(this.selectedDate);

    return this.users.filter(user =>

      
      (new Date(user.from)) <= selected &&
      selected <= new Date(user.to)

    );
  }

  refreshDate(): void {
   this.filteredUsers = this.getFilteredUsers();
  }

}
