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
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;

        }
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            return await _roleRepository.AddEmployeeAsync(role);
        }
       
    }
}
