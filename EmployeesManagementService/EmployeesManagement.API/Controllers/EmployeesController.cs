using AutoMapper;
using EmployeesManagement.API.Models;
using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Employeesmanagement.Service.Services;
using EmployeesManagement.Core.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using EmployeesManagement.Core.DTOs;

namespace EmployeesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IRoleEmployeeService _roleEmployeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeService employeeService, IRoleEmployeeService roleEmployeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _roleEmployeeService = roleEmployeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _employeeService.GetEmployeesAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>Get(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(employee));
            return Ok(newEmployee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var updateEmployee = await _employeeService.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
            return Ok(updateEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _employeeService.DeleteEmployeeAsync(id);
        }

        // Role related endpoints

        [HttpGet("{id}/role")]
        public async Task<ActionResult<RoleEmployee>> GetEmployeeRoles(int id)
        {
            var roleEmployee = await _roleEmployeeService.GetEmployeeRolesAsync(id);
            if (roleEmployee == null)
            {
                return NotFound();
            }
            return Ok(roleEmployee);
        }

        [HttpPost("{employeeId}/role")]
        public async Task<ActionResult<RoleEmployee>> AddRole(int employeeId, [FromBody] RoleEmployeePostModel roleEmployee)
        {
            var newEmployeeRole = await _roleEmployeeService.AddRoleToEmployeeAsync(employeeId, _mapper.Map<RoleEmployee>(roleEmployee));
            if (newEmployeeRole == null)
            {
                return NotFound();
            }
            return Ok(newEmployeeRole);
        }

        [HttpGet("{employeeId}/role/{roleId}")]
        public async Task<IActionResult> GetEmployeeRoleById(int employeeId, int roleId)
        {
            var roleEmployee= await _roleEmployeeService.GetEmployeeRoleByIdAsync(employeeId, roleId);
            return Ok(_mapper.Map<RoleEmployeeDto>(roleEmployee));
        }

        [HttpPut("{employeeId}/role/{roleId}")]
        public async Task<ActionResult> Put(int employeeId, int roleId, [FromBody] RoleEmployeePostModel roleEmployee)
        {
            var updateEmployeeRole = await _roleEmployeeService.UpdateRoleToEmployeeAsync(employeeId, roleId, _mapper.Map<RoleEmployee>(roleEmployee));
            if (updateEmployeeRole == null)
            {
                return NotFound();
            }
            return Ok(updateEmployeeRole);
        }

        [HttpDelete("{employeeId}/role/{roleId}")]
        public async Task<IActionResult> DeleteRole(int employeeId, int roleId)
        {
            var result = await _roleEmployeeService.DeleteRoleOfEmployeeAsync(employeeId, roleId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }


    }
}
