using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Repositories;
using EmployeesManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employeesmanagement.Service.Services
{
    public class RoleEmployeeService : IRoleEmployeeService
    {
      
        private readonly IRoleEmployeeRepository _roleEmployeeRepository;
        public RoleEmployeeService(IRoleEmployeeRepository roleEmployeeRepository)
        {
            _roleEmployeeRepository = roleEmployeeRepository;
        }
        public async Task<RoleEmployee> AddRoleToEmployeeAsync(int EmployeeId, RoleEmployee roleEmployee)
        {
            roleEmployee.EmployeeId = EmployeeId;
            return await _roleEmployeeRepository.AddRoleToEmployeeAsync(roleEmployee);
        }
        public async Task<bool> DeleteRoleOfEmployeeAsync(int employeeId, int positionId)
        {
            return await _roleEmployeeRepository.DeleteRoleOfEmployeeAsync(employeeId, positionId);
        }
        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRolesAsync(int employeeId)
        {
            return await _roleEmployeeRepository.GetEmployeeRolesAsync(employeeId);
        }
        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRoleByIdAsync(int employeeId,int roleId)
        {
            return await _roleEmployeeRepository.GetEmployeeRoleByIdAsync(employeeId,roleId);
        }
        public async Task<RoleEmployee> UpdateRoleToEmployeeAsync(int employeeId,int roleId, RoleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.UpdateRoleToEmployeeAsync(employeeId,roleId, roleEmployee);
        }
   
    }
   
}

