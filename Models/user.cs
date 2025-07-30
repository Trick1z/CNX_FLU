using System.ComponentModel.DataAnnotations.Schema;

namespace JwtSqlDemo.Models
{
    [Table("UserData")] // map ไปยังตาราง [User]
    public class User
    {
        public int UserId { get; set; }   // primary key
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool IsVip { get; set; } = false;

    }

    // สำหรับรับ Request Login
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
