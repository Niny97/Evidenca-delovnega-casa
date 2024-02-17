import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  //tandalone: true,
  //imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  searchQuery: string = '';
  //filteredUsers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const accesToken = localStorage.getItem('access_token');
    if (accesToken) {
      this.getUserData(accesToken);
    }
  }

  getUserData(accessToken: string): void {
    console.log('Access Token:', accessToken);
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'});
    this.http.get<any[]>('https://api4.allhours.com/api/v1/Users', { headers }).subscribe(

      (data) => {
        this.users = data;
        
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
