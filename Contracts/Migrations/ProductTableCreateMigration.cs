using FluentMigrator;
using System;

namespace Infrastructure.Migrations
{
    //https://github.com/fluentmigrator/fluentmigrator/wiki/Migration

    [Migration(201712051017, "InitialTables")]
    public class ProductTableCreateMigration : Migration
    {
        public override void Down()
        {
            Delete.Table("Products");
        }

        public override void Up()
        {
            Create.Table("Products")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Description").AsString().Nullable()
                .WithColumn("Longtitude").AsDecimal(18, 6).Nullable()
                .WithColumn("Latitude").AsDecimal(18, 6).Nullable()
                .WithColumn("CategoryId").AsInt32().NotNullable()
                .WithColumn("CurrencyId").AsInt32().NotNullable()
                .WithColumn("Price").AsDecimal(16, 8).NotNullable()
                .WithColumn("SellerId").AsInt32().NotNullable()
                .WithColumn("ProductTypeId").AsInt32().NotNullable()
                .WithColumn("Params").AsString().Nullable()
                .WithColumn("Created").AsDateTime().NotNullable()
                .WithColumn("Modified").AsDateTime().NotNullable()
                .WithColumn("Deleted").AsDateTime().Nullable();

            Create.Table("Categories")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("ParentId").AsInt32().Nullable()
                .WithColumn("Name").AsString().Nullable()
                .WithColumn("Created").AsDateTime().NotNullable()
                .WithColumn("Modified").AsDateTime().NotNullable()
                .WithColumn("Deleted").AsDateTime().Nullable();

            Create.Table("ProductTypes")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("Name").AsString().Nullable()
                .WithColumn("Created").AsDateTime().NotNullable()
                .WithColumn("Modified").AsDateTime().NotNullable()
                .WithColumn("Deleted").AsDateTime().Nullable();

            Create.Table("Currencies")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("Name").AsString().Nullable()
                .WithColumn("Ticker").AsString().Nullable()
                .WithColumn("Created").AsDateTime().NotNullable()
                .WithColumn("Modified").AsDateTime().NotNullable()
                .WithColumn("Deleted").AsDateTime().Nullable();

            Create.ForeignKey("fk_Products_CategoryId_Categories_Id")
                .FromTable("Products").ForeignColumn("CategoryId")
                .ToTable("Categories").PrimaryColumn("Id");

            Create.ForeignKey("fk_Products_CurrencyId_Currencies_Id")
                .FromTable("Products").ForeignColumn("CurrencyId")
                .ToTable("Currencies").PrimaryColumn("Id");

            Create.ForeignKey("fk_Products_ProductTypeId_ProductTypes_Id")
                .FromTable("Products").ForeignColumn("ProductTypeId")
                .ToTable("ProductTypes").PrimaryColumn("Id");

            Insert.IntoTable("ProductTypes")
                .Row(new { Name = new ExplicitUnicodeString("Товар"), Created = DateTime.Now, Modified = DateTime.Now });

            Insert.IntoTable("Currencies")
                .Row(new { Name = "Bitcoin", Ticker = "BTC", Created = DateTime.Now, Modified = DateTime.Now })
                .Row(new { Name = "Ethereum", Ticker = "ETH", Created = DateTime.Now, Modified = DateTime.Now });

            Insert.IntoTable("Categories")
                .Row(new { Name = new ExplicitUnicodeString("Электроника"), Created = DateTime.Now, Modified = DateTime.Now })
                .Row(new { Name = new ExplicitUnicodeString("Одежда"), Created = DateTime.Now, Modified = DateTime.Now })
                .Row(new { Name = new ExplicitUnicodeString("Еда"), Created = DateTime.Now, Modified = DateTime.Now })
                .Row(new { Name = new ExplicitUnicodeString("Мобильные телефоны"), Created = DateTime.Now, Modified = DateTime.Now });

            Insert.IntoTable("Products")
                .Row(new
                {
                    Name = new ExplicitUnicodeString("Холодильник INDESIT 400C"),
                    Description = new ExplicitUnicodeString("Вместительная морозильная камера, есть функция deepfreze. Цвет айвори"),
                    Longtitude = 40.7143528,
                    Latitude = -74.0059731,
                    CategoryId = 1,
                    CurrencyId = 1,
                    Price = 0.033451,
                    SellerId = 1,
                    ProductTypeId = 1,
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                });

            //https://github.com/fluentmigrator/fluentmigrator/wiki/Fluent-Interface
        }
    }
}