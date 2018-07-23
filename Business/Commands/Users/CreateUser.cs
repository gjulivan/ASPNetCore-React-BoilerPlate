using Infrastructure;
using MediatR;
using Domain;

namespace Business.Commands.Users
{
    public class CreateUser
    {
        public class Command : IRequest
        {
            public Command(string email, string password)
            {
                Email = email;
                Password = password;
            }

            public string Password { get; set; }
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            protected IUserRepository _userSvc { get; set; }
            public Handler(IUserRepository userSvc)
            {
                _userSvc = userSvc;
            }
            public void Handle(Command message)
            {
                var user = new User();
                user.Email = message.Email;
                user.UserName = @"NoName";
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(message.Password);

                _userSvc.Create(user);
            }
        }
    }
}
