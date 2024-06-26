﻿using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Repositories;
using EmployeesManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employeesmanagement.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            var existingEmployees = await _employeeRepository.GetEmployeesAsync();
            if (existingEmployees.Any(e => e.Identity == employee.Identity))
            {
                return null;
            }

            return await _employeeRepository.AddEmployeeAsync(employee);
        }
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await _employeeRepository.DeleteEmployeeAsync(id);
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)

        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()

        {
            var list = await _employeeRepository.GetEmployeesAsync();
            var filteredList = list.Where(e => e.StatusActive == true).ToList();
            return filteredList;
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        }
    }
}
