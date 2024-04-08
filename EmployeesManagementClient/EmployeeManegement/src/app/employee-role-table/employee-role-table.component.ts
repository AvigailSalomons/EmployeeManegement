import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employees.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { RoleEmployee } from '../../models/roleEmployee.model';
import { Role } from '../../models/role.model';
import { RoleService } from '../role.service';
import { EmployeeRoleFormComponent } from '../employee-role-form/employee-role-form.component';

@Component({
  selector: 'app-employee-role-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    //  AddEmployeeComponent
  ],
  templateUrl: './employee-role-table.component.html',
  styleUrl: './employee-role-table.component.scss'
})
export class EmployeeRoleTableComponent implements OnInit {
  @Input() employeeId: number
  displayedColumns: string[] = ['roleName', 'entryDate', 'isManagement', 'actions'];
  rolesOfEmployees: MatTableDataSource<RoleEmployee>;
  roles: Role[];
  filter!: string;

  constructor(
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
    private _roleService: RoleService
  ) {  }

  ngOnInit(): void {
    this.getRolesOfEmployee();
  }

  getRolesOfEmployee(): void {
    this._roleService.getAllRoles().subscribe({
      next: (result) => {
        this.roles = result;
      },
    });
   
    this._employeeService.getRolesOfEmployeeList(this.employeeId).subscribe({
      next: (result) => {
        const roleDataWithNames = result.map((roleEmployee) => {
          const role = this.roles.find((role) => role.roleId === roleEmployee.roleId);
          return { ...roleEmployee, roleName: role.roleName || 'Role Not Found' };
        });
        this.rolesOfEmployees = new MatTableDataSource<RoleEmployee>(roleDataWithNames);
      },
    });
  }


  deleteRoleOfEmployee(roleEmployee: RoleEmployee): void {
    this._employeeService.deleteRoleOfEmployee(this.employeeId, roleEmployee.roleId).subscribe({
      next: (response) => {
        
        this._employeeService.getRolesOfEmployeeList(this.employeeId).subscribe({
          next: (result) => {
            const roleDataWithNames = result.map((roleEmployee) => {
              const role = this.roles.find((role) => role.roleId === roleEmployee.roleId);
              return { ...roleEmployee, roleName: role.roleName || 'Role Not Found' };
            });
            this.rolesOfEmployees = new MatTableDataSource<RoleEmployee>(roleDataWithNames);
          },
        });
      }
    });
    // this._employeeService.deleteRoleOfEmployee(this.employeeId, roleEmployee.roleId).subscribe(
    //   (response) => {
    //     console.log('התשובה מהשרת:', response);
    //     this.getRolesOfEmployee();
    //     // עבודה נוספת עם התשובה...
    //   },
    //   (error) => {
    //     console.error('שגיאה בביצוע בקשת DELETE:', error);
    //   }
    // );
    
  }

  openEditRoleOfEmployeeDialog(roleEmployee: RoleEmployee): void {
    const dialogRef = this.dialog.open(EmployeeRoleFormComponent, {
      width: '50%',
      height: '70%',
      data: { employeeId: this.employeeId, roleId: roleEmployee.roleId }

    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
      this.getRolesOfEmployee()
    });
  }


  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeRoleFormComponent, {
      width: '50%',
      height: '70%',
      data: { employeeId: this.employeeId }
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
      this.getRolesOfEmployee()
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.rolesOfEmployees.filter = filterValue;

  }
}
