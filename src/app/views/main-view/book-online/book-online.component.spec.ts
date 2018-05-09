import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOnlineComponent } from './book-online.component';

describe('BookOnlineComponent', () => {
  let component: BookOnlineComponent;
  let fixture: ComponentFixture<BookOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
