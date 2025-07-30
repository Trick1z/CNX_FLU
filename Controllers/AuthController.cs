using JwtSqlDemo.Data;
using JwtSqlDemo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtSqlDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequest request)
        //{
        //    var user = await _context.Users
        //        .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

        //    if (user == null)
        //        return Unauthorized("Invalid credentials");

        //    var token = GenerateJwtToken(user);
        //    return Ok(new { token });
        //}

        //private string GenerateJwtToken(User user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //        new Claim(JwtRegisteredClaimNames.Sub, user.Username),
        //        new Claim("UserId", user.UserId.ToString())
        //    };

        //    var token = new JwtSecurityToken(
        //        issuer: _config["Jwt:Issuer"],
        //        audience: _config["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddHours(1),
        //        signingCredentials: credentials);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // Login ผ่าน
            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    user.UserId,
                    user.Username,
                    user.IsVip  // สมมติมีคอลัมน์นี้
                }
            });
        }

        //add user 
        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] RegisterRequest request)
        {
            // ตรวจสอบว่ามี Username นี้ใน DB หรือยัง
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (existingUser != null)
                return Conflict(new { message = "Username already exists" });

            var newUser = new User
            {
                Username = request.Username,
                Password = request.Password,
                IsVip = request.IsVip
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User added successfully",
                user = new
                {
                    newUser.UserId,
                    newUser.Username,
                    newUser.IsVip
                }
            });

        }
    }
}
