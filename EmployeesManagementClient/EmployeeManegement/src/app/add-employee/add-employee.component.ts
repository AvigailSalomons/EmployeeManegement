import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employees.service';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})


export class AddEmployeeComponent {
  addEmployeeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private _employeeService: EmployeeService,
    private router: Router
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identity: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      entryDate: ['', Validators.required],
    });
  }



  save(): void {
    if (this.addEmployeeForm.valid) {
      const newEmployee: Employee = {
        firstName: this.addEmployeeForm.get('firstName').value,
        lastName: this.addEmployeeForm.get('lastName').value,
        identity: this.addEmployeeForm.get('identity').value,
        birthDate: this.addEmployeeForm.get('birthDate').value,
        entryDate: this.addEmployeeForm.get('entryDate').value,
        gender: this.addEmployeeForm.get('gender').value
      };

      this._employeeService.addNewEmployee(newEmployee).subscribe({
        next: (res) => {
          this.router.navigate(['/editEmployee', res.employeeId])

        },
      })
    }
    this._employeeService.getEmployeeList().subscribe();
    this.dialogRef.close(this.addEmployeeForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
