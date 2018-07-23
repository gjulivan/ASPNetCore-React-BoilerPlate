using SimpleMigrations;

namespace Migrations.Sql.Migrations
{
    [Migration(201712232219, "Insert Test User")]
    public class InsertTestUser : Migration
    {
        protected override void Up()
        {
            Execute(@"
                INSERT INTO [dbo].[Users]
                           ([UserName]
                           ,[Email]
                           ,[EmailConfirmed]
                           ,[PasswordHash]
                           ,[Created]
                           ,[Modified])
                     VALUES
                           ('Grand Julivan'
                           ,'grandjulivan@gmail.com'
                           ,1
                           ,N'$2b$10$uqYyigYCD6xTbupsUu0dMO.GFYy9XEYa2iYgPt2yRBw0gN/jDgrdS'
                           ,GETDATE()
                           ,GETDATE())
            ");
        }
        
        protected override void Down()
        {
            Execute(@"delete from [dbo].[Users] where Email = 'grandjulivan@gmail.com'");
        }
    }
}
