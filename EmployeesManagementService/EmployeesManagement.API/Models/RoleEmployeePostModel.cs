namespace EmployeesManagement.API.Models
{
    public class RoleEmployeePostModel
    {
        public int RoleId { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
    }
}

