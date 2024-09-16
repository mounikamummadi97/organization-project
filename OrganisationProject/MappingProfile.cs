using AutoMapper;
using Repository.Entities;
namespace Common.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserLoginDetails, LoginDetailsDto>().ReverseMap();
            CreateMap<ApplicationMenus,ApplicationMenusModel>().ReverseMap();
        }
    }
}
