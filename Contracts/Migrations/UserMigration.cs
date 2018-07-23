namespace Infrastructure.Migrations
{
    using FluentMigrator;
    [Migration(201712152350, "InitialTables")]
    public class UserMigration : Migration
    {
        public override void Up()
        {
            Create.Table("Users")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("UserName").AsString().Nullable()
                .WithColumn("Email").AsString().NotNullable()
                .WithColumn("EmailConfirmed").AsBoolean().NotNullable().WithDefaultValue(false)
                .WithColumn("PasswordHash").AsString().NotNullable()
                .WithColumn("PasswordSalt").AsString().NotNullable()
                .WithColumn("Created").AsDateTime().NotNullable()
                .WithColumn("Modified").AsDateTime().NotNullable()
                .WithColumn("Deleted").AsDateTime().Nullable();
        }

        public override void Down()
        {
            Delete.Table("Users");
        }
    }
}
