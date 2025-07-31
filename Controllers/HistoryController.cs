using Microsoft.AspNetCore.Mvc;
using JwtSqlDemo.Data;
using JwtSqlDemo.Models; // ✅ เพิ่ม using นี้

using Microsoft.EntityFrameworkCore;


namespace JwtSqlDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistoryController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("top-players")]
        public async Task<IActionResult> GetTopPlayers()
        {
            var topPlayers = await _context.WordScore
                .GroupBy(ws => ws.UserId)
                .Select(g => new
                {
                    UserId = g.Key,
                    TotalScore = g.Sum(x => x.Score)
                })
                .OrderByDescending(x => x.TotalScore)
                .Take(5)
                .Join(_context.Users,
                    ws => ws.UserId,
                    u => u.UserId,
                    (ws, u) => new
                    {
                        Username = u.Username,
                        IsVip = u.IsVip,
                        Score = ws.TotalScore
                    })
                .ToListAsync();

            return Ok(topPlayers);
        }

        [HttpGet("playerHistory/{playerId}")]
        public async Task<IActionResult> GetTopPlayers(int playerId)
        {
            var playHistory = await _context.WordScore
        .Where(ws => ws.UserId == playerId)
        .OrderByDescending(ws => ws.UpdateTime)  // เรียงล่าสุดก่อน
        .Select(ws => new
        {

            ws.Word,
            ws.Score,
            ws.UpdateTime
        })
        .ToListAsync();

            if (playHistory == null || !playHistory.Any())
                return NotFound("No play history found for this user.");

            return Ok(playHistory);
        }




    }

}


