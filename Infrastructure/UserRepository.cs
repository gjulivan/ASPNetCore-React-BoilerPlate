using Dapper;
using Domain;
using Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Data;

namespace Infrastructure
{
    public class UserRepository : SqlRepository<User>, IUserRepository
    {
        private static readonly string tableName = "Users";
        public UserRepository(IConfiguration config) : base(tableName) => Config = config;
        public override IConfiguration Config { get; set; }
        public User GetByEmail(string email)
        {
            User user = null;
            using (IDbConnection cn = Connection)
            {
                var paramerters = (object)new { Email = email.ToLower() };
                cn.Open();
                user = cn.QuerySingle<User>(@"SELECT * FROM " + tableName + " where Email = @Email and Deleted IS NULL", param: paramerters);
            }

            return user;
        }

        public bool HasUser(string email)
        {
            bool result = false;
            using (IDbConnection cn = Connection)
            {
                var paramerters = (object)new { Email = email.ToLower() };
                cn.Open();
                result = cn.ExecuteScalar<bool>("select count(1) from " + tableName + " where Email=@Email", paramerters);
            }

            return result;
        }

        public override int Create(User entity)
        {
            int id = 0;
            using(IDbConnection cn = Connection)
            {
                var parameters = (object)
                    new {
                        UserName = entity.UserName,
                        Email = entity.Email.ToLower(),
                        PasswordHash = entity.PasswordHash
                    };

                cn.Open();

                string sql = @"INSERT INTO "+ tableName + @" (UserName,Email,PasswordHash,Created,Modified)
                VALUES (@UserName,@Email,@PasswordHash,GETDATE(),GETDATE());
                SELECT CAST(SCOPE_IDENTITY() as int)";

                id = cn.Query<int>(sql, parameters).Single();
                cn.Close();
            }

            return id;
        }

        public override void Update(User entity)
        {
            using (IDbConnection cn = Connection)
            {
                var parameters = (object)
                    new
                    {
                        Id = entity.Id,
                        userName = entity.UserName,
                        email = entity.Email.ToLower(),
                    };

                cn.Open();

                string sql = @"UPDATE " + tableName + @" SET UserName=@userName, Email=@email,
                Modified=GETDATE() WHERE Id=@Id";

                cn.Execute(sql, parameters);
                cn.Close();
            }
        }
    }
}
