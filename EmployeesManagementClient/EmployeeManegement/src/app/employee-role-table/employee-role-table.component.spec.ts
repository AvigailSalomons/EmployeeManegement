import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeRoleTableComponent } from './employee-role-table.component';


describe('RoleEmployeeTableComponent', () => {
  let component: EmployeeRoleTableComponent;
  let fixture: ComponentFixture<EmployeeRoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRoleTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeRoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
