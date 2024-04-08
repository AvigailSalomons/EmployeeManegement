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
import { RoleEmployee } from '../../models/roleEmployee.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-employee-role',
  standalone: true,
  imports: [MatSelectModule,MatDatepickerModule,MatNativeDateModule
    ,CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-employee-role.component.html',
  styleUrl: './add-employee-role.component.scss'
})

export class AddEmployeeRoleComponent implements OnInit{
  PositionEmployeeForm: FormGroup;
  positionlist:Role[]
  employeeId:number
  employee:Employee
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
    private _employeeService:EmployeeService,
    private router:Router,
    private _positionService:RoleService,
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
  ) {

    this.employeeId = data.employeeId;
    this.PositionEmployeeForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      isManagement:['', Validators.required],
      entryDate: ['', [ Validators.required,this.validateEntryDate.bind(this)]],
    });
  }
 
  ngOnInit(): void {
  
    this._employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
      this.employee = employee;
    });
    this._positionService.getEmployeeRolesNotAssigned(this.employeeId).subscribe(positions => {
      this.positionlist = positions;
    });
    // קריאה לפונקציית האימות בזמן שינוי בתאריך
  
  }


  save(): void {
  
    if (this.PositionEmployeeForm.valid) {
      const role = this.positionlist.find(role => role.roleName === this.PositionEmployeeForm.value.roleName,);
       
      const newPositionEmployee: RoleEmployee = {
        roleName: this.PositionEmployeeForm.value.roleName,
        roleId: role.roleId,
        isManagement:  this.PositionEmployeeForm.value.isManagement,
        entryDate: this.PositionEmployeeForm.value.entryDate,
      };
     
      this._employeeService.addNewRoleToEmployee(this.employeeId,newPositionEmployee).subscribe(()=>{
        // this.router.navigate(['/editRoleEmployee',this.employeeId])
      this.dialogRef.close(this.PositionEmployeeForm.value);}

    )

      
  }

  }


  close(): void {
    this.dialogRef.close();
  }
  
}