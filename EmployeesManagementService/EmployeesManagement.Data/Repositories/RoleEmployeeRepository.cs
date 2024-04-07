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
    public class RoleEmployeeRepository: IRoleEmployeeRepository
    {
        private readonly DataContext _context;
        public RoleEmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<RoleEmployee> AddRoleToEmployeeAsync(RoleEmployee positionEmployee)
        {
            await _context.RolesEmployee.AddAsync(positionEmployee);
            _context.SaveChanges();
            return positionEmployee;
        }
        public async Task<RoleEmployee> UpdateRoleToEmployeeAsync(int empoyeeId,int roleId, RoleEmployee roleEmployee)
        {
            //var position = await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == empoyeeId
            //&&e.RoleId==roleId);
            if (roleEmployee == null)
            {
                return null;
            }
            this.DeleteRoleOfEmployeeAsync(empoyeeId, roleId);
            this.AddRoleToEmployeeAsync(roleEmployee);
            //_context.RolesEmployee.Remove(position);
            //await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == empoyeeId);
            //await _context.RolesEmployee.AddAsync(roleEmployee);

           //position.Role = roleEmployee.Role;
           // position.EntryDate = roleEmployee.EntryDate;
           // position.IsManagement = roleEmployee.IsManagement;
           // position.RoleId = roleEmployee.RoleId;
            await _context.SaveChangesAsync();
            return roleEmployee;
        }

        public async Task<bool> DeleteRoleOfEmployeeAsync(int employeeId, int positionId)
        {
            var positionEmployee = await _context.RolesEmployee.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.RoleId == positionId);

            if (positionEmployee != null)
            {
                positionEmployee.StatusActive = false;
                await _context.SaveChangesAsync();
                return true; // המחיקה והעדכון בוצעו בהצלחה
            }

            return false; // העובד לא נמצא במסד הנתונים
        }
        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRolesAsync(int employeeId)
        {
            return await _context.RolesEmployee.Where(e => e.EmployeeId == employeeId && e.StatusActive).ToListAsync();
        }

        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRoleByIdAsync(int employeeId,int roleId)
        {
            return await _context.RolesEmployee.Where(e => e.EmployeeId == employeeId && e.RoleId==roleId).ToListAsync();
        }
    }
}
