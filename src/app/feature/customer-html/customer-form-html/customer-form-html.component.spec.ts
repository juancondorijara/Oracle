import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormHtmlComponent } from './customer-form-html.component';

describe('CustomerFormHtmlComponent', () => {
  let component: CustomerFormHtmlComponent;
  let fixture: ComponentFixture<CustomerFormHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFormHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
