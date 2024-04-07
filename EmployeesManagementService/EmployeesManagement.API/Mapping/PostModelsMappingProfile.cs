namespace EmployeesManagement.API.Mapping
{
    using AutoMapper;
    using EmployeesManagement.API.Models;
    using EmployeesManagement.Core.Models;
   

   
        public class PostModelsMappingProfile : Profile
        {
            public PostModelsMappingProfile()
            {
                CreateMap<RolePostModel, Role>().ReverseMap();
                CreateMap<EmployeePostModel, Employee>().ReverseMap();
                CreateMap<RoleEmployeePostModel, RoleEmployee>().ReverseMap();

            }

        }
    
}
