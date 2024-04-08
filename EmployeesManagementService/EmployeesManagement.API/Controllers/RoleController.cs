using AutoMapper;
using Employeesmanagement.Service.Services;
using EmployeesManagement.API.Models;
using EmployeesManagement.Core.DTOs;
using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeesManagementServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Role>> Get()
        {
            return await _roleService.GetRolesAsync();
        }

        [HttpPost]
        public async Task<ActionResult<RoleDto>> Post([FromBody] RolePostModel role)
        {
            var newRole = await _roleService.AddRoleAsync(_mapper.Map<Role>(role));
            return Ok(newRole);
        }

    }
}
