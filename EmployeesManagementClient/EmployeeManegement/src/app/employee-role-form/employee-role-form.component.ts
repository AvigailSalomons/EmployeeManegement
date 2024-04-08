import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../models/role.model';
import { RoleService } from '../role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employees.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RoleEmployee } from '../../models/roleEmployee.model';


@Component({
  selector: 'app-employee-role-form',
  standalone: true,
  imports: [CommonModule,MatDatepickerModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './employee-role-form.component.html',
  styleUrl: './employee-role-form.component.scss'
})
export class EmployeeRoleFormComponent implements OnInit {
  employeeRoleForm: FormGroup;
  roleList: Role[]; // רשימת תפקידים (שנדלה מהשירות)
  isEditing = false; // דגל המציין מצב עריכה
  updateEmployee: RoleEmployee
employeeRole:RoleEmployee;

  constructor(
    private formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, roleId?: number }
  ) {
    if(this.data.roleId){
      this.isEditing=true}
  }ngOnInit(): void {
    this._roleService.getAllRoles().subscribe(roles => {
      this.roleList = roles;
    });
  
 
      this.employeeRoleForm = this.formBuilder.group({
        roleName: [ '', Validators.required],
        isManagement: [ '', Validators.required],
        entryDate: [ '', Validators.required],
      });
      if (this.isEditing) {
      
        this._employeeService.getRoleOfEmployeeById(this.data.employeeId, this.data.roleId).subscribe(employeeRole => {
          this.updateEmployee = employeeRole;
          console.log(this.updateEmployee)
          this.employeeRoleForm = this.formBuilder.group({
            roleName: [this.updateEmployee.roleName, Validators.required],
            isManagement: [this.updateEmployee.isManagement, Validators.required],
            entryDate: [this.updateEmployee.entryDate, Validators.required],
          });
          const role = this.roleList.find(role => role.roleId === this.data.roleId);
          this.employeeRoleForm.patchValue({
            roleName: role.roleName,
            isManagement: employeeRole.isManagement,
            entryDate: employeeRole.entryDate
          });
  
        });
      }
  }
  
  
  onSave(): void {
    const role = this.roleList.find(role => role.roleName === this.employeeRoleForm.get('roleName').value);
    const formData: RoleEmployee = {
      roleId: this.data.roleId?role.roleId:this.roleList.find(role=>role.roleName==this.employeeRoleForm.get('roleName').value).roleId,
      roleName: this.employeeRoleForm.get('roleName').value,
      isManagement: this.employeeRoleForm.get('isManagement').value,
      entryDate: this.employeeRoleForm.get('entryDate').value,
    };this.isEditing?
    this._employeeService.updateRoleOfEmployee(this.data.employeeId, this.data.roleId, formData).subscribe(() => {
      this.dialogRef.close(true);
    }):
  
        this._employeeService.addNewRoleToEmployee(this.data.employeeId, formData).subscribe(() => {
          this.dialogRef.close(true);
        })
   
  }
  
  
  onClose(): void {
    // סגירת הדיאלוג ללא שמירת נתונים
    this.dialogRef.close();
  }
    
}

