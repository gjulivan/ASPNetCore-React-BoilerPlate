using Domain;
using Infrastructure.Repositories;

namespace Infrastructure
{
    public class UserRepository : SqlRepository<User>, IUserRepository
    {
        public UserRepository() : base("Users") { }
    }
}
