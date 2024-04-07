using EmployeesManagement.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagement.Core.Repositories
{
    public interface IRoleEmployeeRepository
    {
        Task<RoleEmployee> AddRoleToEmployeeAsync(RoleEmployee roleEmployee);
        Task<RoleEmployee> UpdateRoleToEmployeeAsync(int employeeId, int roleId,RoleEmployee roleEmployee);
        Task<bool> DeleteRoleOfEmployeeAsync(int employeeId, int roleId);
        Task<IEnumerable<RoleEmployee>> GetEmployeeRolesAsync(int employeeId);
        Task<IEnumerable<RoleEmployee>> GetEmployeeRoleByIdAsync(int employeeId,int roleId);

    }
}
