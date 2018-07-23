namespace Business.Queries.Users
{
    using MediatR;
    using Infrastructure;
    public class HasUser 
    {
        public class Query : IRequest<bool>
        {
            public Query(string email)
            {
                Email = email;
            }
            public string Email { get; set; }
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
                return _userSvc.HasUser(message.Email);
            }
        }
    }
}
