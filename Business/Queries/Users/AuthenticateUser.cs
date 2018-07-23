using Infrastructure;
using MediatR;

namespace Business.Queries.Users
{
    public class AuthenticateUser
    {
        public class Query : IRequest<bool>
        {
            public Query(string email, string password)
            {
                Email = email;
                Password = password;
            }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        

        public class Handler : IRequestHandler<Query, bool>
        {
            protected IUserRepository _userSvc { get; set; }
            public Handler(IUserRepository userSvc)
            {
                _userSvc = userSvc;
            }
            public bool Handle(Query message)
            {
                var user = _userSvc.GetByEmail(message.Email);
                    
                if(user != null && BCrypt.Net.BCrypt.Verify(message.Password, user.PasswordHash))
                {
                    return true;
                }

                return false;
            }
        }
    }
}
