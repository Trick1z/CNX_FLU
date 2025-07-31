using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace JwtSqlDemo.Models

{
	[Table("WordScore")] 
	public class WordScore
	{
		[Key]   // ✅ บอก EF Core ว่านี่คือ Primary Key
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)] // auto increment
		public int WordId { get; set; } = 0;


		public int UserId { get; set; } = 0;
		public string Word { get; set; } = string.Empty;
		public int Score { get; set; }  = 0 ;


		[Column("Create_time")]
		public DateTime CreateTime { get; set; }
		[Column("Update_time")]
		public DateTime UpdateTime { get; set; }
	}

	public class InsertWordScore
	{
		public required  string Word { get; set; }     // คำศัพท์
		public required  int Score { get; set; }


	}

    public class EditWordRequest
    {
        public string Word { get; set; } = string.Empty;
        public int Score { get; set; } = 0;
    }


}
