import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Club, ClubResponsee } from "src/app/shared/model/club/club";
import { ClubResponse } from "src/app/shared/model/club/club-response";
import { tap } from "rxjs/operators";
import { CommentServiceService } from "../comment/comment-service.service";
import { ClubdetailsResponse } from "src/app/shared/model/clubdetails/clubdetails-response";
import { ClubSearchResponse } from "src/app/shared/model/club-search-response";

@Injectable({
  providedIn: "root",
})
export class ClubServiceService {
  private ApiUrl = "http://127.0.0.1:8000/api/admin";
  private ApiClubSearch = "http://127.0.0.1:8000/api/search/club";

  constructor(private http: HttpClient) {}

  getClubsByCity(cityid: number): Observable<ClubResponse> {
    return this.http.get<ClubResponse>(`${this.ApiUrl}/city/${cityid}/clubs`);
  }

  getClubById(id: number): Observable<ClubResponsee> {
    return this.http.get<ClubResponsee>(`${this.ApiUrl}/clubs/${id}`);
  }

  update(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.ApiUrl}/clubs/${id}`, club);
  }

  FindAllClubs(): Observable<ClubResponse> {
    return this.http.get<ClubResponse>(`${this.ApiUrl}/clubs`);
  }

  save(formdata: FormData): Observable<any> {
    return this.http.post(`${this.ApiUrl}/clubs`, formdata);
  }

  search(searchTerm: String): Observable<ClubSearchResponse> {
    return this.http.get<ClubSearchResponse>(
      `${this.ApiClubSearch}/${searchTerm}`
    );
  }

  searchClubs(tagId: string, cityId: string): Observable<ClubResponse> {
    let params = new HttpParams();
    if (cityId) {
      params = params.append("city_id", cityId);
    }
    if (tagId) {
      params = params.append("tag_id", tagId);
    }

    return this.http.get<ClubResponse>(`${this.ApiUrl}/search/clubs`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + "/" + id);
  }





}
