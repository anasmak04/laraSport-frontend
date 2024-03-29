import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "src/app/services/alert/alert.service";
import { CityServiceService } from "src/app/services/city/city-service.service";
import { ClubTagsService } from "src/app/services/club-tags/club-tags.service";
import { ClubServiceService } from "src/app/services/club/club-service.service";
@Component({
  selector: "app-add-club",
  templateUrl: "./add-club.component.html",
  styleUrls: ["./add-club.component.css"],
})
export class AddClubComponent implements OnInit {
  clubs: any = [];
  cities: any = [];
  tags: any[] = [];

  FormClub: FormGroup;
  constructor(
    private clubservice: ClubServiceService,
    private cityservice: CityServiceService,
    private fb: FormBuilder,
    private clubtagsservice: ClubTagsService,
    private sweet: AlertService
  ) {
    this.FormClub = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      city_id: ["", Validators.required],
      tags: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.findAllClubs();
    this.FindAllCities();
    this.findAllClubTags();
  }

  findAllClubTags() {
    return this.clubtagsservice.getTags().subscribe({
      next: (response) => {
        this.tags = response.clubtag;
        console.log(this.tags);
      },
      error: (err) => console.log(err),
    });
  }

  findAllClubs() {
    return this.clubservice.FindAllClubs().subscribe({
      next: (response) => {
        this.clubs = response.clubs;
      },
      error: (err) => console.log(err),
    });
  }

  FindAllCities() {
    return this.cityservice.findAll().subscribe({
      next: (response) => {
        this.cities = response.city;
      },
      error: (err) => console.log(err),
    });
  }

  findAllTags() {}

  add() {
    if (this.FormClub.valid) {
      const formData = new FormData();
      formData.append("name", this.FormClub.get("name")?.value);
      formData.append("description", this.FormClub.get("description")?.value);
      formData.append("city_id", this.FormClub.get("city_id")?.value);

      const tags = this.FormClub.get("tags")?.value;
      if (Array.isArray(tags)) {
        tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      } else {
        console.warn("Tags are not in an array format.");
      }

      const fileInput: HTMLInputElement =
        document.querySelector('input[type="file"]')!;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      this.clubservice.save(formData).subscribe({
        next: (response) => {
          console.log("Upload successful", response);
          this.sweet.showSuccess("Club", "Club created successfully");
          this.findAllClubs();
        },
        error: (err) => {
          this.sweet.showError("Club", "Club not created");
        },
      });
    }
  }
}
