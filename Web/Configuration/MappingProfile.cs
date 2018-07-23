using AutoMapper;
using Contracts.Application;
using Domain;

namespace Web.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, ApplicationUser>().ReverseMap();
        }
    }
}
