import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterContainerComponent } from './master-container.component';

describe('MasterContainerComponent', () => {
  let component: MasterContainerComponent;
  let fixture: ComponentFixture<MasterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
