import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRoleTableComponent } from '../employee-role-table/employee-role-table.component';



@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, EmployeeRoleTableComponent
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: FormGroup;
  updateEmployee: Employee
  employeeId: number
  constructor(
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    public route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this._employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (result) => {
        this.updateEmployee = result;
        this.editEmployeeForm = this.formBuilder.group({
          firstName: [this.updateEmployee.firstName, Validators.required],
          lastName: [this.updateEmployee.lastName, Validators.required],
          identity: [this.updateEmployee.identity, Validators.required],
          birthDate: [this.updateEmployee.birthDate, Validators.required],
          gender: [this.updateEmployee.gender, Validators.required],
          entryDate: [this.updateEmployee.entryDate, Validators.required],
        });
      },
    });
  }




  save(): void {
    if (this.editEmployeeForm.valid) {
      const updateEmployee: Employee = {
        firstName: this.editEmployeeForm.get('firstName').value,
        lastName: this.editEmployeeForm.get('lastName').value,
        identity: this.editEmployeeForm.get('identity').value,
        birthDate: this.editEmployeeForm.get('birthDate').value,
        entryDate: this.editEmployeeForm.get('entryDate').value,
        gender: this.editEmployeeForm.get('gender').value
      };
      this._employeeService.updateEmployee(this.employeeId, updateEmployee).subscribe({
        next: (res) => {
          console.log(res)
        },
      })
    }
    this.router.navigate(['/employeesTable'])
  }
  close(): void {
    this.router.navigate(['/employeesTable'])
  }
}
