import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'http://192.168.1.111:3000'
  constructor(private httpClient:HttpClient) { }

  /**
   * getTutors
   */
  public getTutors() {
    return this.httpClient.get(this.BASE_URL + '/tutors')
  }

  /**
   * getSessions
   */
   public getSessions() {
    return this.httpClient.get(this.BASE_URL + '/sessions')
  }

  /**
   * getTutSessions
   */
   public getTutSessions(id:string) {
    return this.httpClient.get(this.BASE_URL + '/tut_session/' + id)
  }

  public bookSession(id:string, client:any) {
    return this.httpClient.put(this.BASE_URL + '/book_session' , {id:id , client:client})
  }
  public  addSession(session:any) {
    return this.httpClient.post(this.BASE_URL + '/session',session)
  }
}
