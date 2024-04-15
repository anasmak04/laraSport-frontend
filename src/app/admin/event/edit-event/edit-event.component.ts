import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CityServiceService } from 'src/app/services/city/city-service.service';
import { ClubTagsService } from 'src/app/services/club-tags/club-tags.service';
import { EventServiceService } from 'src/app/services/event/event-service.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit{

  EventForm: FormGroup;
  postId: number = 0;
  cities: any[] = [];
  tags: any[] = [];

  constructor(
    private eventservice: EventServiceService,
    private cityservice : CityServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clubtag : ClubTagsService ,
    private router : Router,
    private sweet : AlertService
  ) {
    this.EventForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      content: ["", Validators.required],
      event_date: ["", Validators.required],
      city_id: ["", Validators.required],
      clubTags: [[], Validators.required]
      });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params["id"];
    this.loadPostData(this.postId);
    this.findallCities();
    this.findallclubtags();
  }



  findallclubtags(){
    this.clubtag.getTags().subscribe({
      next: (response) => {
        this.tags = response.clubtag;
      },
      error: (err) => console.log(err),
    })
  }

  loadPostData(id: number) {
    this.eventservice.findById(id).subscribe({
      next: (response) => {
        this.EventForm.setValue({
          title: response.event.title,
          description: response.event.description,
          content: response.event.content,
          event_date: response.event.event_date,
          city_id: response.event.city_id,
          clubTags: response.event.clubTags ? response.event.clubTags.map(tag => tag.id) : [], 
        });
      },
      error: (err) => console.log(err),
    });
  }

  findallCities() {
    this.cityservice.findAll().subscribe({
      next: (response) => {
        this.cities = response.city;
      },
      error: (err) => console.log(err),
    });
  }


  updatePost() {
    console.log("Form Value: ", this.EventForm.value);
    console.log("Form Validity: ", this.EventForm.valid);

    if (this.EventForm.valid) {
      this.eventservice.update(this.postId, this.EventForm.value).subscribe({
        next: (event) => {
          this.sweet.showSuccess("Event Updated Successfully", "Success");
          this.router.navigate(["/admin/event"]);
          console.log("Post updated successfully:", event);
          
        },
        error: (err) => {
          this.sweet.showError("Error Updating Event", "Error");
          console.log("Error updating post:", err)
        }
      });
    } else {
      console.log("Validation failed");
    }
  }


}