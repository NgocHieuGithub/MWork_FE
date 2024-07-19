import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGroupDialogComponent } from './cgroup-dialog.component';

describe('CGroupDialogComponent', () => {
  let component: CGroupDialogComponent;
  let fixture: ComponentFixture<CGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
