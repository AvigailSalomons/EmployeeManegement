import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef ,MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Employee } from '../../models/employee.model';
import { Role } from '../../models/role.model';
import { RoleEmployee } from '../../models/roleEmployee.model';
import { EmployeeService } from '../employees.service';
import { RoleService } from '../role.service';
import { EmployeeRoleTableComponent } from '../employee-role-table/employee-role-table.component';


@Component({
  selector: 'app-edit-employee-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,MatDialogModule
  ],
  templateUrl: './edit-employee-role.component.html',
  styleUrl: './edit-employee-role.component.scss'
})
export class EditEmployeeRoleComponent implements OnInit {
  EditPositionEmployeeForm: FormGroup;
  positionlist: Role[]
  employeeId: number
  positionId: number
  employee: Employee
  positionEmployee: RoleEmployee
  roles: Role[];

  constructor(
    private formBuilder: FormBuilder,
   
    private _employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private _positionService: RoleService,
    private _roleService: RoleService,
    @Optional()  public dialogRef: MatDialogRef<EditEmployeeRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, roleId: number },
  ) {
    this.employeeId = data.employeeId;
    this.positionId = data.roleId;    
   
  }
  validateEntryDate(control: FormControl) {
    const entryDate = new Date(control.value);
    if (this.employee && new Date(entryDate) < new Date(this.employee.entryDate)) {
      return { invalidateEntryDate: true };
    }
    return null;
  }
  
  ngOnInit(): void {
    this._roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  
    this._employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
    this._employeeService.getRoleOfEmployeeById(this.employeeId, this.positionId).subscribe(pe => {
      this.positionEmployee = pe;
      this.EditPositionEmployeeForm = this.formBuilder.group({
        isManagement: [this.positionEmployee.isManagement, Validators.required],
        entryDate: [this.positionEmployee.entryDate, [this.validateEntryDate.bind(this)]],
        // roleName: [this.positionEmployee.roleName, Validators.required],
      });
    });
   
   
    this._positionService.getEmployeeRolesNotAssigned(this.employeeId).subscribe(positions => {
      this.positionlist = positions;
    });
  }


  save(): void {
    console.log(this.EditPositionEmployeeForm.get('isManagement').value,this.EditPositionEmployeeForm.get('entryDate').value)
    const role = this.roles.find(role => role.roleId === this.data.roleId);
    const updatePositionEmployee: RoleEmployee = {
      roleId: this.positionId,
      roleName:  role.roleName,
      isManagement: this.EditPositionEmployeeForm.get('isManagement').value,
      entryDate: this.EditPositionEmployeeForm.get('entryDate').value,
    };

    this._employeeService.updateRoleOfEmployee(this.employeeId, this.positionId, updatePositionEmployee).subscribe({
      next: (res) => {
        this.router.navigate(['/editEmployee', this.employeeId])
        this.dialogRef.close(this.EditPositionEmployeeForm.value);
      },
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}

