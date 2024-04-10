import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'
import { EmployeeService } from '../employees.service';
import { RoleService } from '../role.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeRolePostModel } from '../../models/EmployeeRoleOstModel';

@Component({
  selector: 'app-add-employee-role',
  standalone: true,
  imports: [MatSelectModule, MatDatepickerModule, MatNativeDateModule
    , CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-employee-role.component.html',
  styleUrl: './add-employee-role.component.scss'
})

export class AddEmployeeRoleComponent implements OnInit {
  RoleEmployeeForm: FormGroup;
  roleList: Role[]
  employeeId: number
  employee: Employee
  validateEntryDate(control: FormControl) {
    const entryDate = new Date(control.value);
    if (this.employee && new Date(entryDate) < new Date(this.employee.entryDate)) {
      return { invalidateEntryDate: true };
    }
    return null;
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeRoleComponent>,
    private _employeeService: EmployeeService,
    private _roleservice: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
  ) {

    this.employeeId = data.employeeId;
  }

  ngOnInit(): void {

    this._employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
    this._roleservice.getEmployeeRolesNotAssigned(this.employeeId).subscribe(roles => {
      this.roleList = roles;
    });
    // קריאה לפונקציית האימות בזמן שינוי בתאריך
    this.RoleEmployeeForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      isManagement: ['', Validators.required],
      entryDate: ['', [Validators.required, this.validateEntryDate.bind(this)]],
    });
  }


  save(): void {

    if (this.RoleEmployeeForm.valid) {
      const role = this.roleList.find(role => role.roleName === this.RoleEmployeeForm.value.roleName,);

      const newRoleEmployee: EmployeeRolePostModel = {
        roleId: role.roleId,
        isManagement: this.RoleEmployeeForm.value.isManagement,
        employeeId: this.employeeId,
        entryDate: this.RoleEmployeeForm.value.entryDate,
      };

      this._employeeService.addNewRoleToEmployee(this.employeeId, newRoleEmployee).subscribe(() => {
        this.dialogRef.close(this.RoleEmployeeForm.value);
      }

      )
    }
  }


  close(): void {
    this.dialogRef.close();
  }

}