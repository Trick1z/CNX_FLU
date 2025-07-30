using JwtSqlDemo.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // อนุญาต Angular dev
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();  // เปิดใช้งาน Endpoint API explorer
builder.Services.AddSwaggerGen();            // เพิ่ม Swagger generator




var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();            // เปิดใช้งาน Swagger middleware
    app.UseSwaggerUI();          // เปิดใช้งาน Swagger UI
//}


app.UseCors("AllowAngular");

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
