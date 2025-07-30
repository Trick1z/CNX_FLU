using System.ComponentModel.DataAnnotations.Schema;

namespace JwtSqlDemo.Models
{
    [Table("vw_getUser")] // ให้ตรงกับชื่อ View ใน DB
    public class Test
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool IsVIP { get; set; }
    }
}
