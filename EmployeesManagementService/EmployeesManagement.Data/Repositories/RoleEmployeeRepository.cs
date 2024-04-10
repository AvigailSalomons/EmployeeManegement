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
    public class RoleEmployeeRepository : IRoleEmployeeRepository
    {
        private readonly DataContext _context;
        public RoleEmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<RoleEmployee> AddRoleToEmployeeAsync(int employeeId, RoleEmployee roleEmployee)
        {
            var role = await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.RoleId == roleEmployee.RoleId);
            if (role != null)
            {
                role.EntryDate = roleEmployee.EntryDate;
                role.IsManagement = roleEmployee.IsManagement;
                role.Employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
                role.Role = await _context.Roles.FirstOrDefaultAsync(e => e.RoleId == roleEmployee.RoleId);

                role.StatusActive = true; // נראה שאתה משנה גם את הסטטוס ל־true כאן
                await _context.SaveChangesAsync();
                return role;

            };
            await _context.RolesEmployee.AddAsync(roleEmployee);
            _context.SaveChanges();
            return roleEmployee;
        }
        public async Task<RoleEmployee> UpdateRoleToEmployeeAsync(int employeeId, int roleId, RoleEmployee roleEmployee)
        {
            var position = await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId
            && e.RoleId == roleId);
            if (roleEmployee == null)
            {
                return null;
            }

            position.EntryDate = roleEmployee.EntryDate;
            position.IsManagement = roleEmployee.IsManagement;
            await _context.SaveChangesAsync();
            return roleEmployee;
        }



        public async Task<bool> DeleteRoleOfEmployeeAsync(int employeeId, int roleId)
        {
            var roleEmployee = await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.RoleId == roleId);

            if (roleEmployee != null)
            {
                roleEmployee.StatusActive = false;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
      
        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRolesAsync(int employeeId)
        {
            return await _context.RolesEmployee.Where(e => e.EmployeeId == employeeId && e.StatusActive ).ToListAsync();
        }

        public async Task<RoleEmployee> GetEmployeeRoleByIdAsync(int employeeId, int roleId)
        {
            return await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.RoleId == roleId);
                
        }

    }
}
