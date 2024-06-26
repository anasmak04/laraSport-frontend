import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryComponent } from "./category.component";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CategoryServiceService } from "src/app/services/admin/category/category-service.service";

describe("CategoryComponent", () => {
  let component: CategoryComponent;
  let service: CategoryServiceService;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoryComponent],
      providers: [CategoryServiceService],
    });

    service = TestBed.inject(CategoryServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("it should get all categories", () => {
    const mockCategories = {
      categories: [{ id: 1, name: "sd" }],
    };

    service.findAll().subscribe((response) => {
      expect(response.categories).toBeTruthy();
      expect(response.categories.length).toBe(1);
      let category = response.categories.find((c) => c.id === 1);
      expect(category?.name).toBe("Forrest");
    });

    const req = httpTestingController.expectOne(service.UrlApi); 
    expect(req.request.method).toEqual('GET');
    req.flush(mockCategories);
  });
});
