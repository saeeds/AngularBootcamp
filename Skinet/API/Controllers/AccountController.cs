using System.Security.Claims;
using System.Linq;
using System.Net;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using API.Dtos;
using API.Errors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;
using AutoMapper;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {

      var user = await _userManager.FindEmailFromClaimsPrincipal(HttpContext.User);

      return new UserDto
      {
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        DsiplayName = user.DisplayName
      };
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
      return await _userManager.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
      var user = await _userManager.FindByUserByClaimsPrincipalWithAddressAsync(HttpContext.User);

      return _mapper.Map<Address, AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
    {
      var user = await _userManager.FindByUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
      user.Address = _mapper.Map<AddressDto, Address>(address);

      var result = await _userManager.UpdateAsync(user);

      if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

      return BadRequest("Proplem updating the user");
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByEmailAsync(loginDto.Email);

      if (user == null) return Unauthorized(new ApiResponse(401));

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

      return new UserDto
      {
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        DsiplayName = user.DisplayName
      };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
      {
        return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
      }

      var user = new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.Email
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded) return BadRequest(new ApiResponse(400));

      return new UserDto
      {
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        DsiplayName = user.DisplayName
      };
    }
  }
}