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
  
employeeRole:RoleEmployee;

  constructor(
    private formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number, roleId?: number }
  ) {

    // בדיקה אם קיים מזהה עובד
    this.employeeRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      isManagement: ['', Validators.required],
      entryDate: ['', Validators.required],
    });
    

  }
  ngOnInit(): void {
    this._roleService.getAllRoles().subscribe(roles => {
      this.roleList = roles;
    });
   
    if (this.data.roleId) {
     
    
  
      console.log(this.data.roleId,"טען נתונים קיימים עבור עריכה");
      
      // טען נתונים קיימים עבור עריכה:
      this._employeeService.getRoleOfEmployeeById(this.data.employeeId, this.data.roleId).subscribe(roleEmployee => {
        this.employeeRole=roleEmployee
        console.log(this.employeeRole.roleName,this.employeeRole.isManagement,this.employeeRole.entryDate)
     
      });

      console.log("patchValue")
    

      this.isEditing = true;
      this.employeeRoleForm.patchValue({
  
        roleName: this.employeeRole.roleName,
        
        isManagement: this.employeeRole.isManagement,
        entryDate: this.employeeRole.entryDate,
      });
    }
  }
  
  onSave(): void {
    // ... שאר הלוגיקה
  
      if (this.isEditing) {
        const formData = this.employeeRoleForm.value;
        formData.roleId=this.roleList.find(role=>role.roleName==formData.roleName).roleId
        console.log(this.data.employeeId,"em",this.data.roleId,"ro", formData,"QQQ")
        this._employeeService.updateRoleOfEmployee(this.data.employeeId,this.data.roleId, formData).subscribe(() => {
          // הצג הודעת הצלחה
         
          this.dialogRef.close(true);
        });
      } else {
        
      const formData = this.employeeRoleForm.value;
        formData.roleId=this.roleList.find(role=>role.roleName==formData.roleName).roleId
        this._employeeService.addNewRoleToEmployee(this.data.employeeId, formData).subscribe(() => {
          // הצג הודעת הצלחה
          this.dialogRef.close(true);
        });
      
    }
  }
  
  
  onClose(): void {
    // סגירת הדיאלוג ללא שמירת נתונים
    this.dialogRef.close();
  }
    
}

