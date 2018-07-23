

namespace Domain
{
    public class User : BaseEntity<int>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
    }
}                