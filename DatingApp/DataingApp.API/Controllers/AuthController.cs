using System;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using DataingApp.API.Data;
using DataingApp.API.Dtos;
using DataingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace DataingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;
    public AuthController(IAuthRepository repo, IConfiguration config)
    {
      _config = config;
      _repo = repo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

      if (await _repo.UserExists(userForRegisterDto.UserName))
        return BadRequest("username already exisits");

      var userToCreate = new User
      {
        Username = userForRegisterDto.UserName
      };

      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

      return StatusCode(201);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
      var userFromRepo = await _repo.Login(userForLoginDto.UserName.ToLower(),
                                            userForLoginDto.Password);

      if (userFromRepo == null)
        return Unauthorized();

      var claims = new[] {
        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        new Claim(ClaimTypes.Name, userFromRepo.Username),
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8
         .GetBytes(_config.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

      var tokenDescripter = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1),
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.CreateToken(tokenDescripter);

      return Ok(new
      {
        token = tokenHandler.WriteToken(token)
      });

    }
  }
}