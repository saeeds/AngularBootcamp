using System.ComponentModel.DataAnnotations;

namespace DataingApp.API.Dtos
{
  public class UserForRegisterDto
  {
    [Required]
    public string UserName { get; set; }

    [Required]
    [StringLength(8, MinimumLength = 4, ErrorMessage = "you must specify password bettween 4 and 8 characters")]
    public string Password { get; set; }
  }
}