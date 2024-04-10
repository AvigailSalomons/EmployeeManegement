import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../employees.service';
import { RoleService } from '../role.service';
import { EmployeeRolePostModel } from '../../models/EmployeeRoleOstModel';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';
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
  employeeRoleForm: FormGroup;
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
    this.employeeRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      isManagement: ['', Validators.required],
      entryDate: ['', [Validators.required, this.validateEntryDate.bind(this)]],
    });
  }


  save(): void {

    if (this.employeeRoleForm.valid) {
      const role = this.roleList.find(role => role.roleName === this.employeeRoleForm.value.roleName,);

      const newemployeeRole: EmployeeRolePostModel = {
        roleId: role.roleId,
        isManagement: this.employeeRoleForm.value.isManagement,
        employeeId: this.employeeId,
        entryDate: this.employeeRoleForm.value.entryDate,
      };

      this._employeeService.addNewRoleToEmployee(this.employeeId, newemployeeRole).subscribe(() => {
        this.dialogRef.close(this.employeeRoleForm.value);
      }

      )
    }
  }


  close(): void {
    this.dialogRef.close();
  }

}