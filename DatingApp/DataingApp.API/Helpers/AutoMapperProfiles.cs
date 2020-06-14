using System.Linq;
using AutoMapper;
using DataingApp.API.Dtos;
using DataingApp.API.Models;

namespace DataingApp.API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserForListDto>()
      .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
      .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
      CreateMap<User, UserForDetailedDto>()
       .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
       .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
      CreateMap<Photo, PhotosForDetailedDto>();
      CreateMap<UserForUpdateDto, User>();
    }
  }
}