using EmployeesManagement.Data;
using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagement.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }
        public async Task<Role> AddEmployeeAsync(Role role)
        {
            _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
            return role;
        }

    }
}