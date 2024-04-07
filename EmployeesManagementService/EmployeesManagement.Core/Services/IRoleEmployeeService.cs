﻿using EmployeesManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagement.Core.Services
{
    public interface IRoleEmployeeService
    {
        Task<RoleEmployee> AddRoleToEmployeeAsync(int EmployeeId, RoleEmployee RoleEmployee);
        Task<RoleEmployee> UpdateRoleToEmployeeAsync(int employeeId,int roleId, RoleEmployee roleEmployee);
        Task<bool> DeleteRoleOfEmployeeAsync(int employeeId, int roleId);
        Task<IEnumerable<RoleEmployee>> GetEmployeeRolesAsync(int employeeId);
        Task<IEnumerable<RoleEmployee>> GetEmployeeRoleByIdAsync(int employeeId,int roleId);

    }
}