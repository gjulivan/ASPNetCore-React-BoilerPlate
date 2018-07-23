

namespace Domain
{
    public class UserSettings : BaseEntity<int>
    {
        public int UserId { get; set; }
        public int CurrencyId { get; set; }
    }
}
