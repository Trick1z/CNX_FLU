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


        //insert word 

        [HttpPost("wordAdding/{userId}")]
        public async Task<IActionResult> AddWordScore(int userId, [FromBody] InsertWordScore request)
        {
            if (string.IsNullOrEmpty(request.Word))
                return BadRequest("Word is required");

            var wordScore = new WordScore
            {
                Word = request.Word,
                Score = request.Score,
                 UserId = userId,
                CreateTime = DateTime.Now
            };

            _context.WordScore.Add(wordScore);
            await _context.SaveChangesAsync();

            return Ok(wordScore);
        }


        [HttpDelete("DeleteWordAdding/{userId}")]
        public async Task<IActionResult> DeleteWordScore(int userId, [FromBody] InsertWordScore request)
        {
            var wordScore = await _context.WordScore
                .FirstOrDefaultAsync(ws => ws.UserId == userId && ws.Word == request.Word && ws.Score == request.Score);

            if (wordScore == null)
                return NotFound("WordScore not found");

            _context.WordScore.Remove(wordScore);
            await _context.SaveChangesAsync();

            //return Ok($"Deleted Word '{request.Word}' for user {userId}");
            return Ok(wordScore);
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


