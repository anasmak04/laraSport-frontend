import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityResponse } from "src/app/shared/model/city/city-response";
import { Event, EventResponsee } from "src/app/shared/model/event/event";
import { EventResponse } from "src/app/shared/model/event/event-response";

@Injectable({
  providedIn: "root",
})
export class EventclientService {
  private apiUrl = "http://127.0.0.1:8000/api/user/event";
  private apiUrlCities = "http://127.0.0.1:8000/api/user/cities/events";

  constructor(private http: HttpClient) {}

  save(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  findById(id: number): Observable<EventResponsee> {
    return this.http.get<EventResponsee>(`${this.apiUrl}/${id}`);
  }

  FindAllEvents(): Observable<EventResponse> {
    return this.http.get<EventResponse>(this.apiUrl);
  }

  // FindEventById(id: number): Observable<EventResponse> {
  //   return this.http.get<EventResponse>(this.apiUrl + "/" + id);
  // }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }

  update(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  getEventsByCity(cityId: number): Observable<EventResponse> {
    return this.http.get<EventResponse>(
      `http://127.0.0.1:8000/api/user/events/${cityId}`
    );
  }

  getcitiesByEvents(): Observable<CityResponse> {
    return this.http.get<CityResponse>(this.apiUrlCities);
  }

}
