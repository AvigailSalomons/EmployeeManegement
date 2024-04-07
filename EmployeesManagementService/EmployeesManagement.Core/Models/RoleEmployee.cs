using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagement.Core.Models
{
    public class RoleEmployee
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
        public bool StatusActive { get; set; }
        public RoleEmployee()
        {
            StatusActive = true;
        }
    }
}
