import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouttaskComponent } from './youttask.component';

describe('YouttaskComponent', () => {
  let component: YouttaskComponent;
  let fixture: ComponentFixture<YouttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouttaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
