namespace Infrastructure
{
    using Domain;
    using Repositories;
    public class ProductRepository : SqlRepository<Product>, IProductRepository
    {
        //TODO: Get tableName from settingsClass or some config
        public ProductRepository() : base("Products") { }
    }
}