import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientRoutingRoutingModule } from "./client-routing-routing.module";
import { ClubComponent } from "./club/club.component";
import { CityComponent } from "./city/city.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventComponent } from "./event/event.component";
import { ContactComponent } from "./contact/contact.component";
import { ClubDetailsComponent } from "./club-details/club-details.component";
import { PostComponent } from "./post/post.component";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "../shared/interceptors/loader/loader.interceptor";
// import { AuthCheck } from "../shared/interceptors/authcheck/authcheck.interceptor";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { BlogHomeComponent } from "./blog-home/blog-home.component";
import { SportHomeComponent } from "./sport-home/sport-home.component";
import { HomeComponent } from "./home/home.component";
import { ClubResultComponent } from "./club-result/club-result.component";
import { CalendarModule } from "primeng/calendar";
import { SportClubComponent } from "./sport-club/sport-club.component";
import { NgxPaginationModule } from "ngx-pagination";
import { EventCityComponent } from "./event-city/event-city.component";
import { ClubHomeComponent } from "./club-home/club-home.component";
@NgModule({
  declarations: [
    ClubComponent,
    CityComponent,
    EventDetailsComponent,
    ContactComponent,
    ClubDetailsComponent,
    PostComponent,
    EventComponent,
    SportHomeComponent,
    BlogHomeComponent,
    HomeComponent,
    ClubResultComponent,
    SportClubComponent,
    EventCityComponent,
    ClubHomeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CalendarModule,
    NgxPaginationModule,
  ],

  exports: [
    ClientRoutingRoutingModule,
    ClubComponent,
    CityComponent,
    EventDetailsComponent,
    ContactComponent,
    ClubDetailsComponent,
    PostComponent,
    EventComponent,
    SportHomeComponent,
    BlogHomeComponent,
    HomeComponent,
    ClubResultComponent,
    CalendarModule,
    SportClubComponent,
    NgxPaginationModule,
    EventCityComponent,
    ClubHomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthCheck, multi: true },
  ],
})
export class ClientModuleModule {}
