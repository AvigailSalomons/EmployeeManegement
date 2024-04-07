import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-add-position-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})

export class AddRoleComponent implements OnInit {
  RolrForm: FormGroup;
  positionlist: Role[]
  roleId: number
  employee: Employee
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private router: Router,
    private _roleService: RoleService,
  ) {

    this.RolrForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    this._roleService.getAllRoles().subscribe(positions => {
      this.positionlist = positions;
    });

  }

  save(): void {
   
    if (this.RolrForm.valid) {

      const newRole: Role = {
        roleName: this.RolrForm.get('roleName').value,
      };
      this._roleService.addNewRole(newRole).subscribe({
        next: (res) => {
          console.log(res)
        },
      })
    }
    this._roleService.getAllRoles().subscribe();
    // this.router.navigate(['/employees-table'])
    this.dialogRef.close(this.RolrForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
