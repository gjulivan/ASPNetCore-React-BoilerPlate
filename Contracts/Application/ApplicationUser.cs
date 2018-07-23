using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts.Application
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
