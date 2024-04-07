import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleFormComponent } from './employee-role-form.component';

describe('EmployeeRoleFormComponent', () => {
  let component: EmployeeRoleFormComponent;
  let fixture: ComponentFixture<EmployeeRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRoleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
