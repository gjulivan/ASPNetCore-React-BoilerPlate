namespace Infrastructure
{
    using Domain;
    public interface IUserRepository : IRepository<User, int>
    {
        User GetByEmail(string email);
        bool HasUser(string email);
    }
}
