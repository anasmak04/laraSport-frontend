import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit, inject } from "@angular/core";
import { Observable } from "rxjs";
import { CitySearchResponse } from "src/app/shared/model/city-search-response";
import { City, CityResponsee } from "src/app/shared/model/city/city";
import { CityResponse } from "src/app/shared/model/city/city-response";

@Injectable({
  providedIn: "root",
})
export class CityServiceService {
  
  private ApiCity = "http://127.0.0.1:8000/api/admin/city";
  private ApiCitySearch = "http://127.0.0.1:8000/api/search/city";

  constructor(private http: HttpClient) {}

  findbyid(id: number): Observable<CityResponsee> {
    return this.http.get<CityResponsee>(this.ApiCity + "/" + id);
  }

  update(formdata: City, id: number): Observable<City> {
    return this.http.put<City>(this.ApiCity + "/" + id, formdata);
  }


  findAll(): Observable<CityResponse> {
    return this.http.get<CityResponse>(this.ApiCity);
  }

  
  save(formdata: FormData): Observable<any> {
    return this.http.post(this.ApiCity, formdata);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.ApiCity + "/" + id);
  }

  search(searchTerm: String): Observable<CitySearchResponse> {
    return this.http.get<CitySearchResponse>(
      this.ApiCitySearch + "/" + searchTerm
    );
  }


}
