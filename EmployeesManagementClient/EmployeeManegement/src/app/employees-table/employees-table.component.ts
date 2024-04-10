import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Role } from '../../models/role.model';
import { RoleService } from '../role.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { exportToExcel } from '../ExportEmployeeTableToExcelComponent';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employees.service';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'] 
})
export class EmployeesTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'identity', 'entryDate', 'actions'];
  employees: MatTableDataSource<Employee>;
  filter!: string;
  roles: MatTableDataSource<Role>;
  constructor(private _employeeService: EmployeeService, private router: Router,
    private dialog: MatDialog,
    private _roleService: RoleService) { this.getEmployees() }

  ngOnInit(): void {
    this.getEmployees();
    this.getRoles();

  }

  getEmployees(): void {
    this._employeeService.getEmployeeList().subscribe({
      next: (result) => {
        this.employees = new MatTableDataSource<Employee>(result);

      },
    });
  }
  downloadExcel() {
    const filename = window.prompt("Please enter file name:");
    if (filename) {
      exportToExcel(this.employees, filename);
    }
  };
  deleteEmployee(employee: Employee): void {
    this._employeeService.deleteEmployee(employee.employeeId!).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/editEmployee', employee.employeeId]);
  }
  addEmployee(): void {
    this.router.navigate(['/addEmployee']);
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees()
      }
    });
  }


  getRoles(): void {
    this._roleService.getAllRoles().subscribe({
      next: (result) => {
        this.roles = new MatTableDataSource<Role>(result);
      },
    });
  }

  openAddRoleDialog(): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRoles()
      }
    });
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.employees.filter = filterValue;
  }
}


