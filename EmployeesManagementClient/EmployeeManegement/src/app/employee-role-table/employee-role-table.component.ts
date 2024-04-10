import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { employeeRole } from '../../models/roleEmployee.model';
import { Role } from '../../models/role.model';
import { RoleService } from '../role.service';
import { EmployeeService } from '../employees.service';
import { EditEmployeeRoleComponent } from '../edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from '../add-employee-role/add-employee-role.component';


@Component({
  selector: 'app-employee-role-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
  rolesOfEmployees: MatTableDataSource<employeeRole>;
  roles: Role[];
  filter!: string;

  constructor(
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
    private _roleService: RoleService
  ) { }

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
        const roleDataWithNames = result.map((employeeRole) => {
          const role = this.roles.find((role) => role.roleId === employeeRole.roleId);
          return { ...employeeRole, roleName: role.roleName || 'Role Not Found' };
        });
        this.rolesOfEmployees = new MatTableDataSource<employeeRole>(roleDataWithNames);
      },
    });
  }


  deleteRoleOfEmployee(employeeRole: employeeRole): void {
    this._employeeService.deleteRoleOfEmployee(this.employeeId, employeeRole.roleId).subscribe({
      next: (response) => {

        this._employeeService.getRolesOfEmployeeList(this.employeeId).subscribe({
          next: (result) => {
            const roleDataWithNames = result.map((employeeRole) => {
              const role = this.roles.find((role) => role.roleId === employeeRole.roleId);
              return { ...employeeRole, roleName: role.roleName || 'Role Not Found' };
            });
            this.rolesOfEmployees = new MatTableDataSource<employeeRole>(roleDataWithNames);
          },
        });
      }
    });
  }

  openEditRoleOfEmployeeDialog(employeeRole: employeeRole): void {
    console.log(this.employeeId, employeeRole.roleId, "openEditRoleOfEmployeeDialog")
    const dialogRef = this.dialog.open(EditEmployeeRoleComponent, {
      width: '50%',
      height: '70%',
      data: { employeeId: this.employeeId, roleId: employeeRole.roleId }

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
    const dialogRef = this.dialog.open(AddEmployeeRoleComponent, {
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
