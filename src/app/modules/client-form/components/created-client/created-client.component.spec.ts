import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedClientComponent } from './created-client.component';

describe('CreatedClientComponent', () => {
  let component: CreatedClientComponent;
  let fixture: ComponentFixture<CreatedClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
