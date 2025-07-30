//using Microsoft.AspNetCore.Mvc;
//using JwtSqlDemo.Data;
//using JwtSqlDemo.Models; // ✅ เพิ่ม using นี้



//namespace JwtSqlDemo.Controllers
//{
//    [ApiController]
//    [Route("views/test")]
//    //[Route("api/[controller]")]
//    public class TestController : ControllerBase
//    {
//        [HttpGet]
//        public IActionResult Get() => Ok("Test endpoint is working!");
//    }



//    [ApiController]
//    [Route("views/getUsers")]  // กำหนด route เป็น views/get_User (ถ้าคลาสชื่อ UserController)
//    public class UserController : ControllerBase
//    {
//        // ตัวแปรสำหรับเก็บ instance ของ DbContext เพื่อเข้าถึงฐานข้อมูล
//        private readonly AppDbContext _context;

//        // Constructor รับ AppDbContext ผ่าน dependency injection
//        public UserController(AppDbContext context)
//        {
//            _context = context; // เก็บ context ไว้ใช้งานภายใน controller
//        }

//        // กำหนด HTTP GET request ที่ path: api/user
//        [HttpGet]
//        public ActionResult<List<Test>> GetAllUsers()
//        {
//            // ดึงข้อมูลทั้งหมดจาก View ที่แม็ปใน DbContext เป็น List<UserViewModel>
//            var users = _context.vw_getUser.ToList();

//            // ส่งข้อมูล users กลับไปในรูปแบบ JSON พร้อม status 200 OK
//            return Ok(users);
//        }
//    }



//}
