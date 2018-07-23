using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using Contracts.Application;
using Infrastructure;
using AutoMapper;

namespace Business.Queries.Users
{
    public class GetUserById
    {
        public class Query : IRequest<ApplicationUser>
        {
            public int Id { get; set; }
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
                var user = _userSvc.Get(message.Id);

                if (user == null)
                    return null;

                return Mapper.Map<ApplicationUser>(user);
            }
        }
    }
}
