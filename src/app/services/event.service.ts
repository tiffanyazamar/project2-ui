import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url:string = "http://localhost:8080/chatelaine/event/"
  weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=39&lon=-104&units=imperial&appid=b2a76d4a4cecf0114e9e756042fe8a0b";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http:HttpClient) { 
  }

  getAllEvents() :Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  getEventsByGuest(id:number) :Observable<Event[]> {
    return this.http.get<Event[]>(this.url+"guest/"+id);
  }

  getAllUsers() :Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/chatelaine/user/")
  }

  getUserByID(id:number) :Observable<User>{
    return this.http.get<User>("http://localhost:8080/chatelaine/user/id/"+id)
  }

  // getEventsByParticipant(user:User):Observable<Event[]> {
  //   return this.http.get<Event[]>(this.url+"user/"+user);
  // }

  getEventsByDate(date:Date):Observable<Event[]> {
    return this.http.get<Event[]>(this.url+date);
  }

  addEvent(e): Observable<Event[]> {
    console.log(e);
    return this.http.post<Event[]>(this.url, e, this.httpOptions);
  }

  getWeather() {
    return this.http.get<any>(this.weatherUrl);
  }
}
