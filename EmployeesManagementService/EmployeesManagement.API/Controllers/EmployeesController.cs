using AutoMapper;
using EmployeesManagement.API.Models;
using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Employeesmanagement.Service.Services;
using EmployeesManagement.Core.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _employeeService.GetEmployeesAsync();
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<Employee> Get(int id)
        {
            return await _employeeService.GetEmployeeByIdAsync(id);
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(employee));
            return Ok(newEmployee);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var updateEmployee = await _employeeService.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
            return Ok(updateEmployee);
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _employeeService.DeleteEmployeeAsync(id);
        }
        //role
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

        // POST api/<EmployeesController>
        [HttpPost("{id}/role")]

        public async Task<ActionResult<RoleEmployee>> AddRole(int id, [FromBody] RoleEmployeePostModel employeeRole)
        {
            
            var newEmployeeRole = await _roleEmployeeService.AddRoleToEmployeeAsync(id, _mapper.Map<RoleEmployee>(employeeRole));
            if (newEmployeeRole == null)
            {
                return NotFound();
            }
            return Ok(newEmployeeRole);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}/role/{roleId}")]
        public async Task<ActionResult> Put(int employeeId, int roleId,[FromBody] RoleEmployeePostModel RoleEmployee)
        {
            var updateEmployeeRole = await _roleEmployeeService.UpdateRoleToEmployeeAsync(employeeId,roleId, _mapper.Map<RoleEmployee>(RoleEmployee));
            if (updateEmployeeRole == null)
            {
                return NotFound();
            }
            return Ok(updateEmployeeRole);
        }
        [HttpDelete("{id}/role/{roleId}")]

        public async Task<IActionResult> DeleteRole(int employeeId, int roleId)
        {
            var result = await _roleEmployeeService.DeleteRoleOfEmployeeAsync(employeeId, roleId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("{id}/role/{roleId}")]
        public async Task<IEnumerable<RoleEmployee>> GetEmployeeRoleById(int employeeId, int roleId)
        {
          
            return await _roleEmployeeService.GetEmployeeRoleByIdAsync(employeeId, roleId);
        }

    }
}