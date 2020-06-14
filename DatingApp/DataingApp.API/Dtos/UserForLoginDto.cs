using System.ComponentModel.DataAnnotations;

namespace DataingApp.API.Dtos
{
  public class UserForLoginDto
  {
    public string UserName { get; set; }
    public string Password { get; set; }
  }
}