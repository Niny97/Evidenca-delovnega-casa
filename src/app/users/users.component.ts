import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;

  searchQuery: string = '';
  showModal = false;
  showAbsenceModal = false;
  showTooltip = false;

  constructor(private http: HttpClient) {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openAbsenceModal(user: any) {
    this.selectedUser = user;
    this.showAbsenceModal = true;
    //console.log(user);
  }

  closeAbsenceModal() {
    this.showAbsenceModal = false;
  }

  ngOnInit(): void {
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.getUserData(accesToken);
    }
  }

  getUserData(accessToken: string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'});
    this.http.get<any[]>('https://api4.allhours.com/api/v1/Users', { headers }).subscribe(

      (data) => {
        //this.users = data;
        
        this.users = data.map(user => ({
          
          id: user.Id,
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email 
        }));
      }
    )
  }

  get filteredUsers(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    const query1 = query.split(" ", 2);
    
    if (!query) {
      return this.users;
    }
    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query)  ||
      user.firstName.toLowerCase().includes(query1[0]) && 
      user.lastName.toLowerCase().includes(query1[1])
    );
  }

}
