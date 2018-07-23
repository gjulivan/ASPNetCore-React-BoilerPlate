using AutoMapper;
using Contracts.Application;
using Infrastructure;
using MediatR;

namespace Business.Queries.Users
{
    public class GetUserByEmail
    {
        public class Query : IRequest<ApplicationUser>
        {
            public Query(string email)
            {
                Email = email;
            }
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApplicationUser>
        {
            protected IUserRepository _userSvc { get; set; }
            public Handler(IUserRepository userSvc)
            {
                _userSvc = userSvc;
            }
            public ApplicationUser Handle(Query message)
            {
                var user = _userSvc.GetByEmail(message.Email);

                if (user == null)
                    return null;

                return Mapper.Map<ApplicationUser>(user);
            }
        }
    }
}
