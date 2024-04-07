import { Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeRoleFormComponent } from './employee-role-form/employee-role-form.component';
export const routes: Routes = [
    { path: '', redirectTo: 'employeesTable', pathMatch: 'full' },
    { path: 'employeesTable', component:EmployeesTableComponent },
    { path: 'addEmployee', component:EmployeesTableComponent },
    { path: 'editEmployee/:id', component:EditEmployeeComponent },
    { path: 'addRoleEmployee/:id', component:EmployeeRoleFormComponent },
    { path: 'editRoleEmployee/:id', component:EmployeeRoleFormComponent },
    { path: '**', component:NotFoundComponent },

];