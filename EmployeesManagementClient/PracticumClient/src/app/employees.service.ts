import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RoleEmployee } from '../models/roleEmployee.model';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = 'https://localhost:7000/api/Employees';
  
  private _roleService: RoleService;

  constructor(private http: HttpClient) {}
  
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`); 
  }

  getEmployeeById(id:number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`); 
  }

  addNewEmployee(employee: Employee): Observable<Employee> { 
    return this.http.post<Employee>(`${this.baseUrl}`, employee); 
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee); 
  }

  deleteEmployee(id: number): Observable<Employee> {
    console.log("deleteEmployee-3")
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`); 
  }
  
  // getRolesOfEmployeeList(id:number): Observable<RoleEmployee[]> {
  //   console.log("getRolesOfEmployeeList-service")
  //   console.log(`${this.baseUrl}/${id}/roles`)

  //   // console.log(this.http.get<RoleEmployee[]>(`${this.baseUrl}/${id}/roles`).forEach(x->x.toString()))
  //   return this.http.get<RoleEmployee[]>(`${this.baseUrl}/${id}/roles`); 
  // }
  getRolesOfEmployeeList(id: number): Observable<RoleEmployee[]> {
    console.info(`getRolesOfEmployeeList-service: id=${id}`);
  
    const url = `${this.baseUrl}/${id}/role`;
  
    return this.http.get<RoleEmployee[]>(url).pipe(
      map((roles) => {
        console.info(`getRolesOfEmployeeList-success: ${roles.length} roles found`);
        return roles;
      }),
      catchError((error) => {
        console.error(`getRolesOfEmployeeList-error: ${error.message}`);
        throw error;
      })
    );
  }
  

  getRoleOfEmployeeById(employeeId:number, roleId:number): Observable<RoleEmployee> {
    console.log("getRoleOfEmployeeById")
    return this.http.get<RoleEmployee>(`${this.baseUrl}/${employeeId}/role/${roleId}`); 
  }

  addNewRoleToEmployee(employeeId:number, roleEmp: RoleEmployee): Observable<RoleEmployee> { 
    console.log("onsave -service")
    console.log(roleEmp,employeeId,roleEmp.entryDate,roleEmp.isManagement,roleEmp.roleName,"addNewRoleToEmployee")

    return this.http.post<RoleEmployee>(`${this.baseUrl}/${employeeId}/role`, roleEmp);
  }

  updateRoleOfEmployee(employeeId: number, roleId:number, roleEmp: RoleEmployee): Observable<Employee> {
    console.log("updateRoleOfEmployee")
    return this.http.put<Employee>(`${this.baseUrl}/${employeeId}/role/${roleId}`, roleEmp); 
  }

    deleteRoleOfEmployee(employeeId: number, roleId:number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${employeeId}/role/${roleId}`); 
  }
}
