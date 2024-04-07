using AutoMapper;
using Employeesmanagement.Service.Services;
using EmployeesManagement.API.Models;
using EmployeesManagement.Core.DTOs;
using EmployeesManagement.Core.Models;
using EmployeesManagement.Core.Services;

using Microsoft.AspNetCore.Mvc;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesManagementServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _RoleService;
        private readonly IMapper _mapper;

        public RolesController(IRoleService positionService, IMapper mapper)
        {
            _RoleService = positionService;
            _mapper = mapper;
        }
        // GET: api/<PositionsController>
        [HttpGet]
        public async Task<IEnumerable<Role>> Get()
        {
            return await _RoleService.GetRolesAsync();
        }

        // GET api/<PositionsController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //POST api/<PositionsController>
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Post([FromBody] RolePostModel role)
        {

            var newEmployee = await _RoleService.AddRoleAsync(_mapper.Map<Role>(role));
            return Ok(newEmployee);
           
            //var newPosition = await _RoleService.AddRoleAsync(_mapper.Map<Role>(role));
            //return Ok(_mapper.Map<RolePostModel>(newPosition));



        }

        // PUT api/<PositionsController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<PositionsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}