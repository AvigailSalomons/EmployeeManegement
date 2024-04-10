import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RoleService } from '../role.service';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-add-role-employee',
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
  addRoleForm: FormGroup;
  roleList: Role[]
  roleId: number
  employee: Employee
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private _roleService: RoleService,
  ) {

    this.addRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    this._roleService.getAllRoles().subscribe(roles => {
      this.roleList = roles;
    });

  }

  save(): void {

    if (this.addRoleForm.valid) {

      const newRole: Role = {
        roleName: this.addRoleForm.value.roleName
      };
      this._roleService.addNewRole(newRole).subscribe({
        next: (res) => {
          console.log(res)
        },
      })
    }
    this._roleService.getAllRoles().subscribe();
    this.dialogRef.close(this.addRoleForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
