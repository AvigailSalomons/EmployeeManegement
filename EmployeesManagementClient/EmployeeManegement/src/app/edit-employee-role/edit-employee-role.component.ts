import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../../models/employee.model';
import { Role } from '../../models/role.model';
import { EmployeeService } from '../employees.service';
import { RoleService } from '../role.service';
import { EmployeeRolePostModel } from '../../models/EmployeeRoleOstModel';


@Component({
  selector: 'app-edit-employee-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],

  templateUrl: './edit-employee-role.component.html',
  styleUrl: './edit-employee-role.component.scss'
})
export class EditEmployeeRoleComponent implements OnInit {
  EditemployeeRoleForm: FormGroup;
  roleList: Role[]
  employeeId: number
  roleId: number
  employee: Employee
  employeeRole: EmployeeRolePostModel
  roles: Role[];

  constructor(
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private _roleservice: RoleService,
    private _roleService: RoleService,
    @Optional() public dialogRef: MatDialogRef<EditEmployeeRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, roleId: number },
  ) {
    this.employeeId = data.employeeId;
    this.roleId = data.roleId;
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
    this._roleservice.getEmployeeRolesNotAssigned(this.employeeId).subscribe(roles => {
      this.roleList = roles;
    });

    this._employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
    this._employeeService.getRoleOfEmployeeById(this.employeeId, this.roleId).subscribe(pe => {
      this.employeeRole = pe;
      this.EditemployeeRoleForm = this.formBuilder.group({
        isManagement: [this.employeeRole.isManagement, Validators.required],
        entryDate: [this.employeeRole.entryDate, Validators.required]
      });
      
    });
    
  }


  save(): void {
    const role = this.roles.find(role => role.roleId === this.data.roleId);
    const updateemployeeRole: EmployeeRolePostModel = this.employeeRole;
    updateemployeeRole.entryDate = this.EditemployeeRoleForm.value.entryDate,
        updateemployeeRole.isManagement=this.EditemployeeRoleForm.value.isManagement,
      this._employeeService.updateRoleOfEmployee(this.employeeId, this.roleId, updateemployeeRole).subscribe({
        next: (res) => {
          this.router.navigate(['/editEmployee', this.employeeId])
          this.dialogRef.close(this.EditemployeeRoleForm.value);
        },
      })
  }
  close(): void {
    this.dialogRef.close();
  }
}
