import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EmployeeService } from './employees.service';
import { Role } from '../models/role.model';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'https://localhost:7000/api/Roles'; // בסיס ה-URL לשירות ה-API

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }
  addNewRole(role: Role): Observable<Role> { 
    return this.http.post<Role>(`${this.baseUrl}`, role); 
  }
  getAllRoles(): Observable<Role[]> {
    console.log("getAllRoles-service");
    return this.http.get<Role[]>(this.baseUrl);

  }

  getEmployeeRolesNotAssigned(employeeId: number): Observable<Role[]> {
    return this.employeeService.getRolesOfEmployeeList(employeeId).pipe(
      switchMap(employeeRoles => {
        return this.getAllRoles().pipe(
          map(allRoles => {
            return allRoles.filter(role => !employeeRoles.some(empPos => empPos.roleId === role.roleId));
          })
        );
      })
    );
  }

}