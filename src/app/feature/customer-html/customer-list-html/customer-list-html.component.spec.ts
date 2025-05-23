import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListHtmlComponent } from './customer-list-html.component';

describe('CustomerListHtmlComponent', () => {
  let component: CustomerListHtmlComponent;
  let fixture: ComponentFixture<CustomerListHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
