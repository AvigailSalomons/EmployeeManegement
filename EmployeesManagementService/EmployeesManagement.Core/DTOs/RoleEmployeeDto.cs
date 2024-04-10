using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagement.Core.DTOs
{
    public class RoleEmployeeDto
    {
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
