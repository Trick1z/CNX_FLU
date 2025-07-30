using Microsoft.AspNetCore.Mvc;
using JwtSqlDemo.Data;
using JwtSqlDemo.Models; // ✅ เพิ่ม using นี้

using Microsoft.EntityFrameworkCore;


namespace JwtSqlDemo.Controllers
{
    [ApiController]
    [Route("data/[controller]")]
    public class UserDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserDataController(AppDbContext context)
        {
            _context = context;
        }

        // GET: data/userdata
        //[HttpGet]
        //public async Task<IActionResult> GetAllUsers()
        //{
        //    var users = await _context.UserData.ToListAsync();
        //    return Ok(users);
        //}

        //GET: data/userdata/{id}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTodayWordScores(int userId)
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);

            var wordScores = await _context.WordScore
                .Where(ws => ws.UserId == userId
                          && ws.CreateTime >= today
                          && ws.CreateTime < tomorrow)
                .Select(ws => new 
        {
            ws.Word,
            ws.Score,
            Date = ws.CreateTime   // ✅ จะ return แค่ 3 field
        })
        .ToListAsync();

           

            return Ok(wordScores);


        }




        // ตัวอย่าง: GET data/userdata/{userId}/wordscores?date=2025-07-30
        //[HttpGet("{userId}/wordscores")]
        //public async Task<IActionResult> GetUserWordScores(int userId, [FromQuery] DateTime? date)
        //{
        //    var query = _context.WordScore.Where(ws => ws.UserId == userId);

        //    if (date.HasValue)
        //    {
        //        var startDate = date.Value.Date;
        //        var endDate = startDate.AddDays(1);

        //        query = query.Where(ws => ws.CreateTime >= startDate && ws.CreateTime < endDate);
        //    }

        //    var results = await query.ToListAsync();

        //    return Ok(results);
        //}
    }

}


