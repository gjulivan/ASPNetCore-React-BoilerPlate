using Domain;

namespace Infrastructure
{
    public interface IProductRepository : IRepository<Product,int>
    {
        //Speciefic methods for product here
    }
}
