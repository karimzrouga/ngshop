import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class userservice {

    private userUrl = "http://151.80.155.85:8080/Findpharma-0.0.1-SNAPSHOT/api/";

    constructor(
      private http: HttpClient
    ) { }
    updateuser(user :User): Observable<User>
    {
        return this.http.put<User>(this.userUrl+"Userupdate/"+user.id,user);
    }
    deleteuser(id : number): Observable<User>
    {
        return this.http.delete<User>(this.userUrl+"Userdelete"+id);
    }
    adduser(user :User): Observable<User>
    {
        return this.http.post<User>(this.userUrl+"Useradd",user);
    }
    getuserbyid(id : number): Observable<User> {
      return this.http.get<User>(this.userUrl+"User"+id);
      } 

    getalluser(): Observable<User[]> {
      return this.http.get<User[]>(this.userUrl+"Userall");
      } 
      getuserbyemail(email :String ): Observable<User> {
        return this.http.get<User>(this.userUrl+"User/"+email.toLowerCase());
        } 
     
}
