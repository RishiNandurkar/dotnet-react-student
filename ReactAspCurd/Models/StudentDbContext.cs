using Microsoft.EntityFrameworkCore;

namespace ReactAspCurd.Models
{
    public class StudentDbContext :DbContext

    {
        public StudentDbContext(DbContextOptions <StudentDbContext>options) : base(options) 
        {   
        
        }
        public DbSet<Student> Students { get; set; }
        
    }
}
