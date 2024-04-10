import { Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditEmployeeRoleComponent } from './edit-employee-role/edit-employee-role.component';
import { AddEmployeeRoleComponent } from './add-employee-role/add-employee-role.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
export const routes: Routes = [
    { path: '', redirectTo: 'employeesTable', pathMatch: 'full' },
    { path: 'employeesTable', component:EmployeesTableComponent },
    { path: 'addEmployee', component:EmployeesTableComponent },
    { path: 'editEmployee/:id', component:EditEmployeeComponent },
    { path: 'addemployeeRole/:id', component:AddEmployeeRoleComponent },
    { path: 'editemployeeRole/:id', component:EditEmployeeRoleComponent },
    { path: '**', component:NotFoundComponent },

];