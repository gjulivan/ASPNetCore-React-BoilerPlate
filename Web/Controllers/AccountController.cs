namespace Web.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using MediatR;
    using Models;
    using Web.Helpers;
    using System.IdentityModel.Tokens.Jwt;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;
    using System.Security.Claims;
    using System.Linq;
    using Microsoft.Extensions.Options;
    using System.Text.RegularExpressions;
    using Business.Commands.Users;
    using Business.Queries.Users;

    public class AccountController : Controller
    {
        protected IMediator _mediatr;
        private readonly AppSettings _appSettings;

        public AccountController(IMediator mediatr, IOptions<AppSettings> appSettings)
        {
            _mediatr = mediatr;
            _appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginDataModel model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new
                {
                    ErrorMessage = string.Join(',', ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList())
                });
            }

            var result = await _mediatr.Send(new AuthenticateUser.Query(model.Email, model.Password));

            if (!result)
            {
                return Unauthorized();
            }

            var user = await _mediatr.Send(new GetUserByEmail.Query(model.Email));
            string tokenString = CreateToken(user.Email, user.UserName, model.RememberMe);

            return Ok(new
            {
                UserId = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterDataModel model)
        {
            var hasUser = await _mediatr.Send(new HasUser.Query(model.Email));

            if (!hasUser)
            {
                string errorMessage = string.Empty;
                if (ModelState.IsValid)
                {
                    if (ValidatePassword(model.Password, ref errorMessage))
                    {
                        await _mediatr.Send(new CreateUser.Command(model.Email, model.Password));
                        string tokenString = CreateToken(model.Email, model.Email);

                        return Ok(new
                        {
                            Username = model.Email,
                            Email = model.Email,
                            Token = tokenString
                        });
                    }
                }
                else
                {
                    return Ok(new
                    {
                        ErrorMessage = string.Join(',', ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList())
                    });
                }

                return Ok(new { ErrorMessage = errorMessage });
            }
            else
            {
                return Ok(new { ErrorMessage = string.Format("User with email {0} has already registered", model.Email) });
            }

        }

        private string CreateToken(string email,string name, bool rememberMe = false)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var now = DateTime.Now;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Sid, Guid.NewGuid().ToString())
                }),

                Audience = JwtOptions.AUDIENCE,
                Issuer = JwtOptions.ISSUER,
                NotBefore = now,
                Expires = rememberMe ? now.Add(TimeSpan.FromMinutes(JwtOptions.REMEMBERMETIME)) : DateTime.Now.Add(TimeSpan.FromMinutes(JwtOptions.LIFETIME)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }
        
        private bool ValidatePassword(string password, ref string errorMessage)
        {
            var input = password;

            if (string.IsNullOrWhiteSpace(input))
            {
                throw new Exception("Password should not be empty");
            }

            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMiniMaxChars = new Regex(@".{6,20}");
            var hasLowerChar = new Regex(@"[a-z]+");
            var hasSymbols = new Regex(@"[!@#$%^&*()_+=\[{\]};:<>|./?,-]");

            if (!hasLowerChar.IsMatch(input))
            {
                errorMessage = "Password should contain At least one lower case letter";
                return false;
            }
            else if (!hasUpperChar.IsMatch(input))
            {
                errorMessage = "Password should contain At least one upper case letter";
                return false;
            }
            else if (!hasMiniMaxChars.IsMatch(input))
            {
                errorMessage = "Password should not be less than 6 or greater than 20 characters";
                return false;
            }
            else if (!hasNumber.IsMatch(input))
            {
                errorMessage = "Password should contain At least one numeric value";
                return false;
            }

            else if (!hasSymbols.IsMatch(input))
            {
                errorMessage = "Password should contain At least one special case characters";
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}