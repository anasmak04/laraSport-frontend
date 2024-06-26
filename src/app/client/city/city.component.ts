import { Component, OnInit, inject } from "@angular/core";
import { CityServiceService } from "src/app/services/admin/city/city-service.service";
import { CityclientService } from "src/app/services/client/city/cityclient.service";
import { LoaderServiceService } from "src/app/services/loader/loader-service.service";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"],
})
export class CityComponent implements OnInit {
  cities: any[] = [];
  cititessearch: any[] = [];
  searchTerm: String = "";

  constructor(private cityService: CityclientService) {}
  loader = inject(LoaderServiceService);

  ngOnInit(): void {
    this.findAllCities();
  }

  

  findAllCities() {
    this.cityService.findAll().subscribe({
      next: (response) => {
        this.cities = response.city;
        console.log(this.cities);
      },
      error: (err) => console.error("Failed to load cities:", err),
    });
  }




  delete(id: number) {
    this.cityService.delete(id).subscribe({
      next: (response) => {
        this.findAllCities();
      },
      error: (err) => console.error("Failed to delete city:", err),
    });
  }

  search(searchTerm: String) {
    this.cityService.search(searchTerm).subscribe({
      next: (response) => {
        this.cititessearch = response.search;
      },
      error: (err) => console.error("Failed to search city:", err),
    });
  }

  
}
