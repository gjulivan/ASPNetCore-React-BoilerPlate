namespace MIgrations.Sql.Migrations
{
    using SimpleMigrations;
    [Migration(201712232218, "Create Users table")]
    public class CreateUsers : Migration
    {
        protected override void Up()
        {
            Execute(@"
                CREATE TABLE [dbo].[Users](
	                [Id] [int] IDENTITY(1,1) NOT NULL,
	                [UserName] [nvarchar](255) NULL,
	                [Email] [nvarchar](255) NOT NULL,
	                [EmailConfirmed] [bit] NOT NULL,
	                [PasswordHash] [nvarchar](255) NOT NULL,
	                [Created] [datetime] NOT NULL,
	                [Modified] [datetime] NOT NULL,
	                [Deleted] [datetime] NULL,
                CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
                (
	                [Id] ASC
                )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
                ) ON [PRIMARY]
                ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_EmailConfirmed]  DEFAULT ((0)) FOR [EmailConfirmed]
            ");
        }

        protected override void Down()
        {
            Execute(@"DROP TABLE [dbo].[Users]");
        }
    }
}
