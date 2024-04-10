import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RoleEmployee } from '../models/roleEmployee.model';
import { EmployeeRolePostModel } from '../models/EmployeeRoleOstModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl: string = 'https://localhost:7000/api/Employees';
  
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
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`); 
  }
  //private roleUrl: string = `${this.baseUrl}/${id}/role`;
  getRolesOfEmployeeList(id: number): Observable<RoleEmployee[]> {
  
    const url = `${this.baseUrl}/${id}/role`;
  
    return this.http.get<RoleEmployee[]>(url).pipe(
      map((roles) => {
        return roles;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
  

  getRoleOfEmployeeById(employeeId:number, roleId:number): Observable<EmployeeRolePostModel> {
    return this.http.get<EmployeeRolePostModel>(`${this.baseUrl}/${employeeId}/role/${roleId}`); 
  }

  addNewRoleToEmployee(employeeId:number, roleEmp: EmployeeRolePostModel): Observable<EmployeeRolePostModel> { 
    return this.http.post<EmployeeRolePostModel>(`${this.baseUrl}/${employeeId}/role`, roleEmp);
  }

  updateRoleOfEmployee(employeeId: number, roleId:number, roleEmp: EmployeeRolePostModel): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employeeId}/role/${roleId}`, roleEmp); 
  }

    deleteRoleOfEmployee(employeeId: number, roleId:number): Observable<Employee> {
    
    return this.http.delete<Employee>(`${this.baseUrl}/${employeeId}/role/${roleId}`);
  }
}
