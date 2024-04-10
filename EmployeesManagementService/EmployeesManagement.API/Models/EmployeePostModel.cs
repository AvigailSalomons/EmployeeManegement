using EmployeesManagement.Core.Models;

namespace EmployeesManagement.API.Models
{
    public class EmployeePostModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
